import store from "app/reduxStore";
import { socketClient } from "app/socketClient";
import { setMemberStream } from "feature/meet/meetSlice";
import * as mediasoupClient from "mediasoup-client";

let device: mediasoupClient.Device;
let producerTransport: mediasoupClient.types.Transport;
let consumerTransports: any[] = [];
let producer: mediasoupClient.types.Producer;
let isProducer = false;

const params: any = {
  // mediasoup params
  encodings: [
    {
      rid: "r0",
      maxBitrate: 100000,
      scalabilityMode: "S1T3",
    },
    {
      rid: "r1",
      maxBitrate: 300000,
      scalabilityMode: "S1T3",
    },
    {
      rid: "r2",
      maxBitrate: 900000,
      scalabilityMode: "S1T3",
    },
  ],
  // https://mediasoup.org/documentation/v3/mediasoup-client/api/#ProducerCodecOptions
  codecOptions: {
    videoGoogleStartBitrate: 1000,
  },
};

const createDevice = async (
  rtpCapabilities: mediasoupClient.types.RtpCapabilities
) => {
  try {
    device = new mediasoupClient.Device();

    await device?.load({
      routerRtpCapabilities: rtpCapabilities,
    });
  } catch (error: any) {
    console.log(error);
    if (error.name === "UnsupportedError")
      console.warn("browser not supported");
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
      if (producerTransport === undefined) return;

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

      producerTransport.on("produce", async (parameters, callback, errback) => {
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
          store.dispatch(setMemberStream({ joinCode: spec, stream: track }));
        }
      );
    }
  );
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

const signalNewConsumerTransport = async (
  remoteProducerId: string,
  spec: string
) => {
  await socketClient.emit(
    "createWebRtcTransport",
    { consumer: true },
    (data: any) => {
      const { transportParams } = data;

      if (transportParams.error) {
        console.log(transportParams.error);
        return;
      }
      if (device === undefined) return;
      let consumerTransport: mediasoupClient.types.Transport;
      try {
        consumerTransport = device.createRecvTransport(transportParams);
      } catch (error) {
        console.log(error);
        return;
      }

      let args = {
        consumerTransport,
        remoteProducerId,
        serverConsumerTransportId: transportParams.id,
        spec,
      };
      connectRecvTransport(args);

      consumerTransport.on(
        "connect",
        async ({ dtlsParameters }, callback, errback) => {
          try {
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
    }
  );
};

socketClient.on(
  "new-producer",
  (data: { producerId: string; spec: string }) => {
    signalNewConsumerTransport(data.producerId, data.spec);
  }
);
socketClient.on(
  "producer-closed",
  (data: { remoteProducerId: string; spec: string }) => {
    const producerToClose = consumerTransports.find(
      (transportData) => transportData.producerId === data.remoteProducerId
    );
    producerToClose.consumerTransport.close();
    producerToClose.consumer.close();

    consumerTransports = consumerTransports.filter(
      (transportData) => transportData.producerId !== data.remoteProducerId
    );
    console.log(data);
    store.dispatch(setMemberStream({ joinCode: data.spec, stream: undefined }));
  }
);
export { createDevice, createSendTransport };
