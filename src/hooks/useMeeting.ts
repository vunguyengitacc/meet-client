import React, { useEffect, useState } from "react";
import * as mediasoupClient from "mediasoup-client";
import { socketClient } from "app/socketClient";
import { AppDispatch, RootState } from "app/reduxStore";
import { setMemberStream } from "feature/meet/meetSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  setDevice,
  setProducer,
  setProducerTransport,
  seConsummerTransports,
} from "./meetMediaSlice";

const useMeeting = () => {
  const { producer, producerTransport, device, consumerTransports, params } =
    useSelector((state: RootState) => state.mediasoup);
  const dispatch = useDispatch<AppDispatch>();

  const createDevice = async (
    rtpCapabilities: mediasoupClient.types.RtpCapabilities
  ) => {
    try {
      let temp = new mediasoupClient.Device();

      await temp?.load({
        routerRtpCapabilities: rtpCapabilities,
      });
      dispatch(setDevice(temp));
      return temp;
    } catch (error: any) {
      console.log(error);
    }
  };

  const connectSendTransport = async (poducerParams: any) => {
    try {
      console.log(producerTransport);
      if (producerTransport === undefined) return;
      let temp = await producerTransport.produce({
        ...poducerParams,
        stopTracks: false,
      });

      if (temp === undefined) return;

      temp.on("trackended", () => {
        console.log("track ended");
      });

      temp.on("transportclose", () => {
        console.log("transport ended");
      });
      dispatch(setProducer(temp));
    } catch (error) {
      console.log(error);
    }
  };
  const [stream, setStream] = useState<MediaStreamTrack>();

  useEffect(() => {
    if (producerTransport === undefined || stream === undefined) return;

    connectSendTransport({ track: stream, ...params });
  }, [producerTransport, stream]);

  const createSendTransport = (stream: MediaStreamTrack) => {
    setStream(stream);
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
        let temp = device.createSendTransport(transportParams);
        temp.on("connect", async ({ dtlsParameters }, callback, errback) => {
          try {
            await socketClient.emit("transport-connect", {
              dtlsParameters,
            });
            callback();
          } catch (error) {
            errback(error);
          }
        });
        temp.on("produce", async (parameters, callback, errback) => {
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
        });

        dispatch(setProducerTransport(temp));
      }
    );
  };

  const connectRecvTransport = async (data: {
    consumerTransport: mediasoupClient.types.Transport;
    remoteProducerId: string;
    serverConsumerTransportId: any;
    spec: string;
    deviceCnt: mediasoupClient.types.Device;
  }) => {
    const {
      consumerTransport,
      remoteProducerId,
      serverConsumerTransportId,
      spec,
      deviceCnt,
    } = data;
    if (deviceCnt === undefined) return;
    await socketClient.emit(
      "consume",
      {
        rtpCapabilities: deviceCnt.rtpCapabilities,
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
        dispatch(
          seConsummerTransports([
            ...consumerTransports,
            {
              consumerTransport,
              serverConsumerTransportId: data.params.id,
              producerId: remoteProducerId,
              consumer,
            },
          ])
        );
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
    spec: string,
    deviceCnt: mediasoupClient.types.Device
  ) => {
    await socketClient.emit(
      "createWebRtcTransport",
      { consumer: true },
      (data: any) => {
        const { transportParams } = data;

        if (transportParams.error) return;
        console.log(deviceCnt);
        if (deviceCnt === undefined) return;
        let consumerTransport: mediasoupClient.types.Transport;
        try {
          consumerTransport = deviceCnt.createRecvTransport(transportParams);
        } catch (error) {
          console.log(error);
          return;
        }

        console.log(consumerTransport);

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
          deviceCnt,
        };
        connectRecvTransport(args);
      }
    );
  };

  const closeTransport = () => {
    producerTransport?.close();
  };

  return {
    createDevice,
    createSendTransport,
    closeTransport,
    signalNewConsumerTransport,
  };
};

export default useMeeting;
