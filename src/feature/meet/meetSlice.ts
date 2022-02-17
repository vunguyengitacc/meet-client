import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  EntityState,
  PayloadAction,
} from "@reduxjs/toolkit";
import memberApi from "api/memberApi";
import roomApi, { ICreateRoomResponse } from "api/roomApi";
import { RootState } from "app/reduxStore";
import { IMember } from "model/Member";
import { IRoom } from "model/Room";
export const membersAdapter = createEntityAdapter({
  selectId: (member: IMember) => member._id,
});

export const getMyMember = createAsyncThunk(
  "meet/getMyMember",
  async (payload: { room: IRoom; joinCode: string }) => {
    const res = await memberApi.getMeInRoom({
      roomId: payload.room._id,
      joinCode: payload.joinCode,
    });
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

export const createRoom = createAsyncThunk("room/create", async () => {
  const { data } = await roomApi.create();
  return data.result;
});

export const exitRoom = createAsyncThunk(
  "room/exit",
  async (payload: IMember) => {
    const { data } = await memberApi.delete(payload);
    return data.data;
  }
);

interface MeetState {
  room?: IRoom;
  me?: IMember;
  members: EntityState<IMember>;
  joinCode: string;
}

const initialState: MeetState = {
  room: undefined,
  me: undefined,
  members: membersAdapter.getInitialState(),
  joinCode: "",
};

export const membersSelector = membersAdapter.getSelectors(
  (state: RootState) => state.meet.members
);

const meetSlice = createSlice({
  name: "meetSlice",
  initialState,
  reducers: {
    setJoinCode: (state, { payload }: PayloadAction<string>) => {
      state.joinCode = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOneRoom.rejected, (state) => {});
    builder.addCase(getOneRoom.pending, (state) => {});
    builder.addCase(
      getOneRoom.fulfilled,
      (state, { payload }: PayloadAction<IRoom>) => {
        state.room = payload;
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
    builder.addCase(createRoom.rejected, (state) => {});
    builder.addCase(createRoom.pending, (state) => {});
    builder.addCase(
      createRoom.fulfilled,
      (state, { payload }: PayloadAction<ICreateRoomResponse>) => {
        state.room = payload.room;
        state.joinCode = payload.joinCode;
      }
    );
    builder.addCase(exitRoom.rejected, (state) => {});
    builder.addCase(exitRoom.pending, (state) => {});
    builder.addCase(exitRoom.fulfilled, (state) => {
      state.room = undefined;
      state.me = undefined;
      state.joinCode = "";
      state.members = membersAdapter.getInitialState();
    });
  },
});

const { reducer: meetReducer, actions } = meetSlice;

export const { setJoinCode } = actions;
export default meetReducer;
