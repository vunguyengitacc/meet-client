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
}

const initialState: MediaState = {
  myCam: undefined,
  myScreen: undefined,
  myMic: undefined,
};
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
  },
});

const { reducer: mediaReducer, actions } = mediaSlice;

export const {
  setCamStream,
  setScreenStream,
  setMicStream,
  stopMyCam,
  stopMyScreen,
  stopMyMic,
} = actions;
export default mediaReducer;
