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
import toast from "react-hot-toast";
export const membersAdapter = createEntityAdapter({
  selectId: (member: IMember) => member._id,
});

export const getMember = createAsyncThunk(
  "meet/getMember",
  async (payload: { room: IRoom; joinCode: string }) => {
    const meRes = await memberApi.getMeInRoom({
      roomId: payload.room._id,
      joinCode: payload.joinCode,
    });
    const otherRes = await memberApi.getAllInRoom(payload.room);
    let members = otherRes.data.members.filter(
      (i) => i.joinSession != payload.joinCode
    );
    return { me: meRes.data.data, members };
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
    let res;
    if (payload.isAdmin) res = await roomApi.delete(payload.roomId);
    else res = await memberApi.delete(payload);
    return res.data.rs;
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
    addMember: (state, { payload }: PayloadAction<IMember>) => {
      membersAdapter.addOne(state.members, payload);
      toast(`${payload.user?.fullname} join the meet`);
    },
    removeMember: (state, { payload }: PayloadAction<IMember>) => {
      let temp = membersAdapter
        .getSelectors()
        .selectById(state.members, payload._id);
      if (temp === undefined) return;
      membersAdapter.removeOne(state.members, payload._id);
      toast(`${temp.user?.fullname} quit the meet`);
    },
    quitRoom: (state) => {
      state.me = undefined;
      state.joinCode = "";
      state.members = membersAdapter.getInitialState();
      toast(`The meet is finished`);
    },
    setMemberStream: (
      state,
      {
        payload,
      }: PayloadAction<{ joinCode: string; stream?: MediaStreamTrack }>
    ) => {
      console.log(
        membersAdapter
          .getSelectors((state: MeetState) => state.members)
          .selectAll(state)
      );
      let member = membersAdapter
        .getSelectors((state: MeetState) => state.members)
        .selectAll(state)
        .filter((i) => i.joinSession === payload.joinCode)[0];
      membersAdapter.updateOne(state.members, {
        id: member._id,
        changes: { streamMedia: payload.stream },
      });
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
    builder.addCase(getMember.rejected, (state) => {});
    builder.addCase(getMember.pending, (state) => {});
    builder.addCase(
      getMember.fulfilled,
      (
        state,
        { payload }: PayloadAction<{ me: IMember; members: IMember[] }>
      ) => {
        state.me = payload.me;
        membersAdapter.removeAll(state.members);
        membersAdapter.addMany(state.members, payload.members);
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
      state.me = undefined;
      state.joinCode = "";
      state.members = membersAdapter.getInitialState();
      toast(`The meet is finished`);
    });
  },
});

const { reducer: meetReducer, actions } = meetSlice;

export const {
  setJoinCode,
  addMember,
  removeMember,
  quitRoom,
  setMemberStream,
} = actions;
export default meetReducer;
