import { createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { createSlice, EntityState, PayloadAction } from "@reduxjs/toolkit";
import memberApi from "api/memberApi";
import messageApi from "api/messageApi";
import requestApi from "api/requestApi";
import roomApi, { IRoomResponse } from "api/roomApi";
import { RootState } from "app/reduxStore";
import { IMember } from "model/Member";
import { IMessage } from "model/Message";
import { IRequest } from "model/Request";
import { IRoom } from "model/Room";
import toast from "react-hot-toast";

export const membersAdapter = createEntityAdapter({
  selectId: (member: IMember) => member._id,
});

export const requestsAdapter = createEntityAdapter({
  selectId: (request: IRequest) => request._id,
});

export const messagesAdapter = createEntityAdapter({
  selectId: (message: IMessage) => message._id,
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
      (i) => i.joinSession !== payload.joinCode
    );
    return { me: meRes.data.data, members };
  }
);

export const kickMember = createAsyncThunk(
  "meet/kickMember",
  async (payload: IMember) => {
    await memberApi.delete(payload);
    return payload;
  }
);

export const answerRequest = createAsyncThunk(
  "meet/answerRequest",
  async (payload: {
    room: IRoom;
    request: IRequest;
    answer: Partial<IRequest>;
  }) => {
    const res = await requestApi.answer(payload);
    return payload.request;
  }
);

export const getMessage = createAsyncThunk(
  "meet/getMessage",
  async (room: IRoom) => {
    const res = await messageApi.getAllInRoom(room);
    return res.data.messages;
  }
);

export const getOneRoom = createAsyncThunk(
  "room/getOne",
  async (payload: string) => {
    const { data } = await roomApi.getOne(payload);
    return { room: data.result.room, joinCode: data.result.joinCode };
  }
);

export const createRoom = createAsyncThunk(
  "room/create",
  async (payload?: Partial<IRoom>) => {
    const { data } = await roomApi.create(payload);
    return data.result;
  }
);

export const updateRoom = createAsyncThunk(
  "room/update",
  async (payload: { room: Partial<IRoom>; notification: string }) => {
    const { data } = await roomApi.update(payload);
    return data.roomUpdated;
  }
);

export const exitRoom = createAsyncThunk(
  "room/exit",
  async (payload: IMember) => {
    let res = await memberApi.delete(payload);
    return res.data.rs;
  }
);

export const finishRoom = createAsyncThunk(
  "room/finishRoom",
  async (payload: IMember) => {
    let res;
    if (payload.isAdmin) res = await roomApi.delete(payload.roomId);
    else throw new Error("Unauthorized");
    return res.data.rs;
  }
);

interface MeetState {
  room?: IRoom;
  me?: IMember;
  members: EntityState<IMember>;
  joinCode: string;
  messages: EntityState<IMessage>;
  myRequest?: IRequest;
  requests: EntityState<IRequest>;
  pinItem?: string;
  isRecorderOwner?: boolean;
}

const initialState: MeetState = {
  members: membersAdapter.getInitialState(),
  joinCode: "",
  messages: messagesAdapter.getInitialState(),
  requests: requestsAdapter.getInitialState(),
};

export const membersSelector = membersAdapter.getSelectors(
  (state: RootState) => state.meet.members
);
export const requestsSelector = requestsAdapter.getSelectors(
  (state: RootState) => state.meet.requests
);
export const messagesSelector = messagesAdapter.getSelectors(
  (state: RootState) => state.meet.messages
);

const meetSlice = createSlice({
  name: "meetSlice",
  initialState,
  reducers: {
    setMyRequest: (state, { payload }: PayloadAction<IRequest>) => {
      console.log(payload);
      state.myRequest = payload;
    },
    addNewRequest: (state, { payload }: PayloadAction<IRequest>) => {
      if (state.me?.isAdmin) requestsAdapter.addOne(state.requests, payload);
    },
    setJoinCode: (state, { payload }: PayloadAction<string>) => {
      state.joinCode = payload;
    },
    setPinItem: (state, { payload }: PayloadAction<string>) => {
      if (state.pinItem === payload) {
        state.pinItem = "";
        return;
      }
      state.pinItem = payload;
    },
    setJoinCodeStrict: (
      state,
      { payload }: PayloadAction<{ joinCode: string; request: IRequest }>
    ) => {
      if (state.myRequest?._id === payload.request?._id)
        state.joinCode = payload.joinCode;
    },
    setIsOwnerRecorder: (state, { payload }: PayloadAction<boolean>) => {
      state.isRecorderOwner = payload;
    },
    addMember: (state, { payload }: PayloadAction<IMember>) => {
      membersAdapter.addOne(state.members, payload);
      toast(`${payload.user?.fullname} joined the meet`);
    },
    addMessage: (state, { payload }: PayloadAction<IMessage>) => {
      messagesAdapter.addOne(state.messages, payload);
    },
    normalUpdateRoom: (state, { payload }: PayloadAction<IRoom>) => {
      state.room = payload;
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
      toast(<div>The meet is finished</div>);
    },
    setMemberWebcam: (
      state,
      {
        payload,
      }: PayloadAction<{ joinCode: string; stream?: MediaStreamTrack }>
    ) => {
      let member = membersAdapter
        .getSelectors((state: MeetState) => state.members)
        .selectAll(state)
        .filter((i) => i.joinSession === payload.joinCode)[0];
      membersAdapter.updateOne(state.members, {
        id: member._id,
        changes: { webcamStream: payload.stream },
      });
    },
    setMemberMicro: (
      state,
      {
        payload,
      }: PayloadAction<{ joinCode: string; stream?: MediaStreamTrack }>
    ) => {
      let member = membersAdapter
        .getSelectors((state: MeetState) => state.members)
        .selectAll(state)
        .filter((i) => i.joinSession === payload.joinCode)[0];
      membersAdapter.updateOne(state.members, {
        id: member._id,
        changes: { microStream: payload.stream },
      });
    },
    setMemberScreen: (
      state,
      {
        payload,
      }: PayloadAction<{ joinCode: string; stream?: MediaStreamTrack }>
    ) => {
      let member = membersAdapter
        .getSelectors((state: MeetState) => state.members)
        .selectAll(state)
        .filter((i) => i.joinSession === payload.joinCode)[0];
      if (member === undefined) return;
      if (!state.pinItem) state.pinItem = member._id + "-screen";
      membersAdapter.updateOne(state.members, {
        id: member._id,
        changes: { screenStream: payload.stream },
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOneRoom.rejected, (state) => {});
    builder.addCase(getOneRoom.pending, (state) => {});
    builder.addCase(
      getOneRoom.fulfilled,
      (state, { payload }: PayloadAction<IRoomResponse>) => {
        const { room, joinCode } = payload;
        state.room = room;
        if (!joinCode) return;
        state.joinCode = joinCode;
      }
    );
    builder.addCase(getMember.rejected, (state) => {});
    builder.addCase(getMember.pending, (state) => {});
    builder.addCase(
      getMember.fulfilled,
      (
        state,
        {
          payload,
        }: PayloadAction<{
          me: IMember;
          members: IMember[];
        }>
      ) => {
        state.me = payload.me;
        membersAdapter.removeAll(state.members);
        membersAdapter.addMany(state.members, payload.members);
      }
    );
    builder.addCase(getMessage.rejected, (state) => {});
    builder.addCase(getMessage.pending, (state) => {});
    builder.addCase(
      getMessage.fulfilled,
      (state, { payload }: PayloadAction<IMessage[]>) => {
        messagesAdapter.addMany(state.messages, payload);
      }
    );
    builder.addCase(createRoom.rejected, (state) => {});
    builder.addCase(createRoom.pending, (state) => {});
    builder.addCase(
      createRoom.fulfilled,
      (state, { payload }: PayloadAction<IRoomResponse>) => {
        state.room = payload.room;
        state.joinCode = payload.joinCode as string;
      }
    );
    builder.addCase(exitRoom.rejected, (state) => {});
    builder.addCase(exitRoom.pending, (state) => {});
    builder.addCase(exitRoom.fulfilled, (state) => {
      state.me = undefined;
      state.joinCode = "";
      state.members = membersAdapter.getInitialState();
      state.messages = messagesAdapter.getInitialState();
    });
    builder.addCase(finishRoom.rejected, (state) => {});
    builder.addCase(finishRoom.pending, (state) => {});
    builder.addCase(finishRoom.fulfilled, (state) => {
      state.me = undefined;
      state.joinCode = "";
      state.members = membersAdapter.getInitialState();
      state.messages = messagesAdapter.getInitialState();
    });
    builder.addCase(updateRoom.rejected, (state) => {});
    builder.addCase(updateRoom.pending, (state) => {});
    builder.addCase(
      updateRoom.fulfilled,
      (state, { payload }: PayloadAction<IRoom>) => {
        state.room = payload;
      }
    );
    builder.addCase(answerRequest.rejected, (state) => {});
    builder.addCase(answerRequest.pending, (state) => {});
    builder.addCase(
      answerRequest.fulfilled,
      (state, { payload }: PayloadAction<IRequest>) => {
        requestsAdapter.removeOne(state.requests, payload._id);
      }
    );
    builder.addCase(kickMember.rejected, (state) => {});
    builder.addCase(kickMember.pending, (state) => {});
    builder.addCase(
      kickMember.fulfilled,
      (state, { payload }: PayloadAction<IMember>) => {
        membersAdapter.removeOne(state.members, payload._id);
      }
    );
  },
});

const { reducer: meetReducer, actions } = meetSlice;

export const {
  setJoinCode,
  addNewRequest,
  addMember,
  removeMember,
  quitRoom,
  setMemberWebcam,
  setMemberMicro,
  setMemberScreen,
  addMessage,
  normalUpdateRoom,
  setMyRequest,
  setJoinCodeStrict,
  setPinItem,
  setIsOwnerRecorder,
} = actions;
export default meetReducer;
