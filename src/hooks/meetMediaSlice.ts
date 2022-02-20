import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as mediasoupClient from "mediasoup-client";
interface MediasoupState {
  device?: mediasoupClient.Device;
  producerTransport?: mediasoupClient.types.Transport;
  consumerTransports: any[];
  producer?: mediasoupClient.types.Producer;
  params: any;
}

const initialState: MediasoupState = {
  device: undefined,
  producerTransport: undefined,
  consumerTransports: [],
  producer: undefined,
  params: {
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
    codecOptions: {
      videoGoogleStartBitrate: 1000,
    },
  },
};
const mediasoupSlice = createSlice({
  name: "meetSlice",
  initialState,
  reducers: {
    setDevice: (state, { payload }: PayloadAction<mediasoupClient.Device>) => {
      state.device = payload;
    },
    setProducerTransport: (
      state,
      { payload }: PayloadAction<mediasoupClient.types.Transport>
    ) => {
      state.producerTransport = payload;
    },
    seConsummerTransports: (state, { payload }: PayloadAction<any[]>) => {
      state.consumerTransports = payload;
    },
    setProducer: (
      state,
      { payload }: PayloadAction<mediasoupClient.types.Producer>
    ) => {
      state.producer = payload;
    },
  },
});

const { reducer: mediasoupReducer, actions } = mediasoupSlice;

export const {
  setDevice,
  setProducerTransport,
  seConsummerTransports,
  setProducer,
} = actions;

export default mediasoupReducer;
