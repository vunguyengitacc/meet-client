import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  EntityState,
  PayloadAction,
} from "@reduxjs/toolkit";
import memberApi from "api/memberApi";
import roomApi from "api/roomApi";
import { RootState } from "app/reduxStore";
import { IMember } from "model/Member";
import { IRoom } from "model/Room";
export const membersAdapter = createEntityAdapter({
  selectId: (member: IMember) => member._id,
});

interface MediaState {
  myCam?: MediaStream;
  myScreen?: MediaStream;
}

const initialState: MediaState = {
  myCam: undefined,
  myScreen: undefined,
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
    stopMyCam: (state) => {
      state.myCam?.getTracks()[0].stop();
      state.myCam = undefined;
    },
    stopMyScreen: (state) => {
      state.myScreen?.getTracks()[0].stop();
      state.myScreen = undefined;
    },
  },
});

const { reducer: mediaReducer, actions } = mediaSlice;

export const { setCamStream, setScreenStream, stopMyCam, stopMyScreen } =
  actions;
export default mediaReducer;
