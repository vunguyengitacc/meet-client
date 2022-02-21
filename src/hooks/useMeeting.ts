import * as mediasoupClient from "mediasoup-client";
import { socketClient } from "app/socketClient";
import { AppDispatch, RootState } from "app/reduxStore";
import { setMemberStream } from "feature/meet/meetSlice";
import { useDispatch, useSelector } from "react-redux";
import { setProducerTransport } from "./meetMediaSlice";
import { useEffect } from "react";

let device: mediasoupClient.types.Device;
let producerTransport: mediasoupClient.types.Transport | undefined;
let consumerTransports: any[] = [];
let producer: mediasoupClient.types.Producer | undefined;

const useMeeting = () => {
  const { params } = useSelector((state: RootState) => state.mediasoup);
  const dispatch = useDispatch<AppDispatch>();

  const createDevice = async (
    rtpCapabilities: mediasoupClient.types.RtpCapabilities
  ) => {
    try {
      device = new mediasoupClient.Device();

      await device?.load({
        routerRtpCapabilities: rtpCapabilities,
      });
      return device;
    } catch (error: any) {
      console.log(error);
    }
  };

  const connectSendTransport = async (poducerParams: any) => {
    try {
      if (producerTransport === undefined) return;
      producer = await producerTransport.produce({
        ...poducerParams,
        stopTracks: false,
      });

      if (producer === undefined) return;

      producer.on("trackended", () => {
        console.log("track ended");
      });

      producer.on("transportclose", () => {
        console.log("transport ended");
      });
    } catch (error) {
      console.log(error);
    }
  };

  const createSendTransport = (stream: MediaStreamTrack) => {
    socketClient.emit(
      "createWebRtcTransport",
      { consumer: false },
      (data: any) => {
        const { transportParams } = data;
        if (transportParams.error) {
          console.log(transportParams.error);
          return;
        }
        if (device === undefined) return;
        producerTransport = device.createSendTransport(transportParams);
        producerTransport.on(
          "connect",
          async ({ dtlsParameters }, callback, errback) => {
            try {
              await socketClient.emit("transport-connect", {
                dtlsParameters,
              });
              callback();
            } catch (error) {
              errback(error);
            }
          }
        );
        producerTransport.on(
          "produce",
          async (parameters, callback, errback) => {
            try {
              await socketClient.emit(
                "transport-produce",
                {
                  kind: parameters.kind,
                  rtpParameters: parameters.rtpParameters,
                  appData: parameters.appData,
                },
                (data: { id: string; producersExist: any }) => {
                  callback({ id: data.id });
                }
              );
            } catch (error) {
              console.log(error);
              errback(error);
            }
          }
        );
        connectSendTransport({ track: stream, ...params });
      }
    );
  };

  const connectRecvTransport = async (data: {
    consumerTransport: mediasoupClient.types.Transport;
    remoteProducerId: string;
    serverConsumerTransportId: any;
    spec: string;
  }) => {
    const {
      consumerTransport,
      remoteProducerId,
      serverConsumerTransportId,
      spec,
    } = data;
    if (device === undefined) return;
    await socketClient.emit(
      "consume",
      {
        rtpCapabilities: device.rtpCapabilities,
        remoteProducerId,
        serverConsumerTransportId,
      },
      async (data: { params: any }) => {
        if (data.params.error) {
          console.log("Cannot Consume");
          return;
        }
        const consumer = await consumerTransport.consume({
          id: data.params.id,
          producerId: data.params.producerId,
          kind: data.params.kind,
          rtpParameters: data.params.rtpParameters,
        });
        consumerTransports = [
          ...consumerTransports,
          {
            consumerTransport,
            serverConsumerTransportId: data.params.id,
            producerId: remoteProducerId,
            consumer,
          },
        ];

        const { track } = consumer;

        socketClient.emit(
          "consumer-resume",
          {
            serverConsumerId: data.params.serverConsumerId,
          },
          (data: { msg: string }) => {
            dispatch(setMemberStream({ joinCode: spec, stream: track }));
          }
        );
      }
    );
  };

  const signalNewConsumerTransport = async (
    remoteProducerId: string,
    spec: string
  ) => {
    await socketClient.emit(
      "createWebRtcTransport",
      { consumer: true },
      (data: any) => {
        const { transportParams } = data;

        if (transportParams.error) return;

        if (device === undefined) return;
        let consumerTransport: mediasoupClient.types.Transport;
        try {
          consumerTransport = device.createRecvTransport(transportParams);
        } catch (error) {
          console.log(error);
          return;
        }

        consumerTransport.on(
          "connect",
          async ({ dtlsParameters }, callback, errback) => {
            try {
              console.log("hello");
              await socketClient.emit("transport-recv-connect", {
                dtlsParameters,
                serverConsumerTransportId: transportParams.id,
              });

              callback();
            } catch (error) {
              console.log(error);
              errback(error);
            }
          }
        );
        let args = {
          consumerTransport,
          remoteProducerId,
          serverConsumerTransportId: transportParams.id,
          spec,
        };
        connectRecvTransport(args);
      }
    );
  };

  const closeTransport = () => {
    producerTransport?.close();
    producer?.close();
    producerTransport = undefined;
    producer = undefined;
  };

  const setConsumerTransports = (data: any[]) => {
    consumerTransports = data;
  };

  const getConsumerTransport = () => {
    return consumerTransports;
  };

  return {
    createDevice,
    createSendTransport,
    closeTransport,
    signalNewConsumerTransport,
    getConsumerTransport,
    setConsumerTransports,
  };
};

export default useMeeting;
