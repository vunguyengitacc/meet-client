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

export const getOne = createAsyncThunk(
  "meet/getOne",
  async (payload: string) => {
    const roomRes = await roomApi.getOne(payload);
    const memberRes = await memberApi.getMeInRoom(payload);
    return { room: roomRes.data.data, me: memberRes.data.data };
  }
);

export const getMyMember = createAsyncThunk(
  "meet/getMyMember",
  async (payload: IRoom) => {
    const res = await memberApi.getMeInRoom(payload._id);
    return res.data.data;
  }
);

export const getOneRoom = createAsyncThunk(
  "room/getOne",
  async (payload: string) => {
    const { data } = await roomApi.getOne(payload);
    return data.data;
  }
);

interface MeetState {
  room?: IRoom;
  me?: IMember;
  members: EntityState<IMember>;
}

const initialState: MeetState = {
  room: undefined,
  me: undefined,
  members: membersAdapter.getInitialState(),
};

export const membersSelector = membersAdapter.getSelectors(
  (state: RootState) => state.meet.members
);

const meetSlice = createSlice({
  name: "meetSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOneRoom.rejected, (state) => {});
    builder.addCase(getOneRoom.pending, (state) => {});
    builder.addCase(
      getOneRoom.fulfilled,
      (state, { payload }: PayloadAction<IRoom>) => {
        state.room = payload;
      }
    );
    builder.addCase(getOne.rejected, (state) => {});
    builder.addCase(getOne.pending, (state) => {});
    builder.addCase(
      getOne.fulfilled,
      (state, { payload }: PayloadAction<{ room: IRoom; me: IMember }>) => {
        state.room = payload.room;
        state.me = payload.me;
      }
    );
    builder.addCase(getMyMember.rejected, (state) => {});
    builder.addCase(getMyMember.pending, (state) => {});
    builder.addCase(
      getMyMember.fulfilled,
      (state, { payload }: PayloadAction<IMember>) => {
        state.me = payload;
      }
    );
  },
});

const { reducer: meetReducer, actions } = meetSlice;

export const {} = actions;
export default meetReducer;
