import * as mediasoupClient from "mediasoup-client";
import { socketClient } from "app/socketClient";
import { AppDispatch } from "app/reduxStore";
import {
  setMemberMicro,
  setMemberScreen,
  setMemberWebcam,
} from "feature/meet/meetSlice";
import { useDispatch } from "react-redux";
import { IDictionary } from "model/Common";
import { StreamType } from "utilities/streamTypeUtil";

interface IPropsConsumerTransports {
  consumerTransport: mediasoupClient.types.Transport;
  serverConsumerTransportId: string;
  connection: {
    producerId: string;
    consumer: mediasoupClient.types.Consumer;
  }[];
  spec: string;
}

let device: mediasoupClient.types.Device;
let producerTransport: mediasoupClient.types.Transport | undefined;
let consumerTransports: IDictionary<IPropsConsumerTransports> = {};
let producer: IDictionary<{
  serverProducerId: string;
  data: mediasoupClient.types.Producer | undefined;
}> = {};
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

  const connectSendTransport = async (
    stream: MediaStreamTrack,
    type: string
  ) => {
    try {
      if (producerTransport === undefined) return;
      if (producer[type] && producer[type].data != undefined) {
        producer[type]?.data?.resume();
      } else {
        producer[type] = {
          serverProducerId: "",
          data: undefined,
        };
        producer[type].data = await producerTransport.produce({
          track: stream,
          ...params,
          appData: {
            type,
          },
          stopTracks: false,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createSendTransport = async (
    stream: MediaStreamTrack,
    type: string
  ) => {
    if (device === undefined) return;
    if (
      producerTransport !== undefined &&
      producerTransport?.closed === false
    ) {
      connectSendTransport(stream, type);
      return;
    }
    socketClient.emit(
      "createWebRtcTransport",
      { consumer: false },
      async (data: any) => {
        const { transportParams } = data;
        if (transportParams.error) {
          console.log(transportParams.error);
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
                (data: { id: string; producersExist: any; type: string }) => {
                  if (producer[data.type] === undefined)
                    producer[data.type] = {
                      serverProducerId: data.id,
                      data: undefined,
                    };
                  else producer[data.type].serverProducerId = data.id;
                  callback({ id: data.id });
                }
              );
            } catch (error) {
              console.log(error);
              errback(error);
            }
          }
        );
        connectSendTransport(stream, type);
      }
    );
  };

  const connectRecvTransport = async (data: {
    consumerTransport: mediasoupClient.types.Transport;
    remoteProducerId: string;
    serverConsumerTransportId: any;
    spec: string;
    type: StreamType;
  }) => {
    const {
      consumerTransport,
      remoteProducerId,
      serverConsumerTransportId,
      spec,
      type,
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

        let connection: {
          producerId: string;
          consumer: mediasoupClient.types.Consumer;
        }[];
        if (consumerTransports[consumerTransport.id] === undefined)
          connection = [];
        else connection = consumerTransports[consumerTransport.id].connection;
        consumerTransports[consumerTransport.id] = {
          consumerTransport,
          serverConsumerTransportId: serverConsumerTransportId,
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
            switch (type) {
              case StreamType.webcam:
                dispatch(setMemberWebcam({ joinCode: spec, stream: track }));
                break;
              case StreamType.micro:
                dispatch(setMemberMicro({ joinCode: spec, stream: track }));
                break;
              case StreamType.screen:
                dispatch(setMemberScreen({ joinCode: spec, stream: track }));
                break;
              default:
                break;
            }
          }
        );
      }
    );
  };

  const signalNewConsumerTransport = async (
    remoteProducerId: string,
    spec: string,
    type: StreamType
  ) => {
    console.log(type);
    let consumerTransport: mediasoupClient.types.Transport;
    if (device === undefined) return;
    if (
      consumerTransports !== undefined &&
      Object.values(consumerTransports).filter((i: any) => i.spec === spec)
        .length > 0
    ) {
      let data = Object.values(consumerTransports).filter(
        (i: any) => i.spec === spec
      )[0];
      let args = {
        consumerTransport: data.consumerTransport,
        remoteProducerId,
        serverConsumerTransportId: data.serverConsumerTransportId,
        spec,
        type,
      };
      await connectRecvTransport(args);
      return;
    }

    socketClient.emit(
      "createWebRtcTransport",
      { consumer: true },
      async (data: any) => {
        const { transportParams } = data;

        if (transportParams.error) return;

        consumerTransport = device.createRecvTransport(transportParams);

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
          type,
        };
        await connectRecvTransport(args);
      }
    );
  };

  const closeProducer = (type: string) => {
    if (producer[type] === undefined) return;
    console.log(producer[type]);
    producer[type]?.data?.close();
    socketClient.emit("producer-closing", {
      producerId: producer[type]?.serverProducerId,
    });
    producer[type] = { serverProducerId: "", data: undefined };
  };

  const setConsumerTransports = (data: { id: string; payload: any }) => {
    consumerTransports[data.id] = data.payload;
  };

  const getConsumerTransport = () => {
    return consumerTransports;
  };

  const getOldProducers = () => {
    socketClient.emit(
      "get-old-producers",
      async (
        producers: { producerId: string; spec: string; type: StreamType }[]
      ) => {
        for (const i of producers) {
          await signalNewConsumerTransport(i.producerId, i.spec, i.type);
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
