import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { IMember } from "model/Member";
export const membersAdapter = createEntityAdapter({
  selectId: (member: IMember) => member._id,
});

interface MediaState {
  myCam?: MediaStream;
  myScreen?: MediaStream;
  myMic?: MediaStream;
  recorderStream?: MediaStream;
  recorder?: MediaRecorder;
}

const initialState: MediaState = {};
const mediaSlice = createSlice({
  name: "meetSlice",
  initialState,
  reducers: {
    setCamStream: (state, { payload }: PayloadAction<MediaStream>) => {
      state.myCam = payload;
    },
    setScreenStream: (state, { payload }: PayloadAction<MediaStream>) => {
      state.myScreen = payload;
    },
    setMicStream: (state, { payload }: PayloadAction<MediaStream>) => {
      state.myMic = payload;
    },
    setRecorderStream: (
      state,
      { payload }: PayloadAction<MediaStream | undefined>
    ) => {
      state.recorderStream = payload;
    },
    setRecorder: (
      state,
      { payload }: PayloadAction<MediaRecorder | undefined>
    ) => {
      state.recorder = payload;
    },
    stopMyCam: (state) => {
      state.myCam?.getTracks()[0].stop();
      state.myCam = undefined;
    },
    stopMyScreen: (state) => {
      state.myScreen?.getTracks()[0].stop();
      state.myScreen = undefined;
    },
    stopMyMic: (state) => {
      state.myMic?.getTracks()[0].stop();
      state.myMic = undefined;
    },
    stopRecorderStream: (state) => {
      state.recorderStream?.getTracks()[0].stop();
      state.recorderStream = undefined;
    },
    stopRecorder: (state) => {
      state.recorder?.stop();
    },
  },
});

const { reducer: mediaReducer, actions } = mediaSlice;

export const {
  setCamStream,
  setScreenStream,
  setMicStream,
  setRecorderStream,
  setRecorder,
  stopMyCam,
  stopMyScreen,
  stopMyMic,
  stopRecorderStream,
  stopRecorder,
} = actions;
export default mediaReducer;
