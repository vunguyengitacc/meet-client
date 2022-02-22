import * as mediasoupClient from "mediasoup-client";
import { socketClient } from "app/socketClient";
import { AppDispatch } from "app/reduxStore";
import { setMemberStream } from "feature/meet/meetSlice";
import { useDispatch } from "react-redux";
import { IDictionary } from "model/Common";

let device: mediasoupClient.types.Device;
let producerTransport: mediasoupClient.types.Transport | undefined;
let consumerTransports: any = [];
let producer: IDictionary<
  | {
      serverProducerId: string;
      data: mediasoupClient.types.Producer | undefined;
    }
  | undefined
> = {};
let params: {
  encodings: [
    {
      rid: "r0";
      maxBitrate: 100000;
      scalabilityMode: "S1T3";
    },
    {
      rid: "r1";
      maxBitrate: 300000;
      scalabilityMode: "S1T3";
    },
    {
      rid: "r2";
      maxBitrate: 900000;
      scalabilityMode: "S1T3";
    }
  ];
  codecOptions: {
    videoGoogleStartBitrate: 1000;
  };
};

const useMeeting = () => {
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

  const connectSendTransport = async (stream: MediaStreamTrack) => {
    try {
      if (producerTransport === undefined) return;
      if (producer["webcam"]) {
        producer["webcam"]?.data?.resume();
      } else {
        producer["webcam"] = {
          serverProducerId: "",
          data: undefined,
        };
        producer["webcam"].data = await producerTransport.produce({
          track: stream,
          ...params,
          stopTracks: false,
        });
      }

      if (producer["webcam"]?.data === undefined) return;

      producer["webcam"].data?.on("trackended", () => {
        console.log("track ended");
      });

      producer["webcam"].data?.on("transportclose", () => {
        console.log("transport ended");
      });
    } catch (error) {
      console.log(error);
    }
  };

  const createSendTransport = async (stream: MediaStreamTrack) => {
    socketClient.emit(
      "createWebRtcTransport",
      { consumer: false },
      async (data: any) => {
        const { transportParams } = data;
        if (transportParams.error) {
          console.log(transportParams.error);
          return;
        }
        if (device === undefined) return;
        if (
          producerTransport !== undefined &&
          producerTransport?.closed === false
        ) {
          connectSendTransport(stream);
          return;
        }
        producerTransport = device.createSendTransport(transportParams);
        producerTransport.on(
          "connect",
          async ({ dtlsParameters }, callback, errback) => {
            try {
              socketClient.emit("transport-connect", {
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
              socketClient.emit(
                "transport-produce",
                {
                  kind: parameters.kind,
                  rtpParameters: parameters.rtpParameters,
                  appData: parameters.appData,
                },
                (data: { id: string; producersExist: any }) => {
                  if (producer["webcam"] === undefined)
                    producer["webcam"] = {
                      serverProducerId: data.id,
                      data: undefined,
                    };
                  else producer["webcam"].serverProducerId = data.id;
                  callback({ id: data.id });
                }
              );
            } catch (error) {
              console.log(error);
              errback(error);
            }
          }
        );
        connectSendTransport(stream);
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
    socketClient.emit(
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
        const newConsumer = await consumerTransport.consume({
          id: data.params.id,
          producerId: data.params.producerId,
          kind: data.params.kind,
          rtpParameters: data.params.rtpParameters,
        });

        let connection;
        if (consumerTransports[consumerTransport.id] === undefined)
          connection = [];
        else connection = consumerTransports[consumerTransport.id].connection;
        consumerTransports[consumerTransport.id] = {
          consumerTransport,
          serverConsumerTransportId: data.params.id,
          connection: [
            ...connection,
            {
              producerId: remoteProducerId,
              consumer: newConsumer,
            },
          ],
          spec,
        };

        const { track } = newConsumer;

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
    socketClient.emit(
      "createWebRtcTransport",
      { consumer: true },
      async (data: any) => {
        const { transportParams } = data;

        if (transportParams.error) return;

        if (device === undefined) return;
        let consumerTransport: mediasoupClient.types.Transport;

        if (consumerTransports === undefined)
          consumerTransport = device.createRecvTransport(transportParams);
        else {
          consumerTransport = consumerTransports.filter(
            (i: any) => i.spec === spec
          )[0];
          if (consumerTransport === undefined)
            consumerTransport = device.createRecvTransport(transportParams);
        }

        consumerTransport.on(
          "connect",
          async ({ dtlsParameters }, callback, errback) => {
            try {
              socketClient.emit("transport-recv-connect", {
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
        await connectRecvTransport(args);
      }
    );
  };

  const closeProducer = (type: string) => {
    if (producer[type] === undefined) return;
    producer[type]?.data?.close();
    socketClient.emit("producer-closing", {
      producerId: producer[type]?.serverProducerId,
    });
    producer[type] = undefined;
  };

  const setConsumerTransports = (data: { id: string; payload: any }) => {
    consumerTransports[data.id] = data.payload;
  };

  const getConsumerTransport = () => {
    return consumerTransports;
  };

  const getOldProducers = () => {
    socketClient.emit(
      "getProducers",
      async (producers: { producerId: string; spec: string }[]) => {
        for (const i of producers) {
          await signalNewConsumerTransport(i.producerId, i.spec);
        }
      }
    );
  };

  return {
    createDevice,
    createSendTransport,
    closeProducer,
    signalNewConsumerTransport,
    getConsumerTransport,
    setConsumerTransports,
    getOldProducers,
    connectSendTransport,
  };
};

export default useMeeting;
