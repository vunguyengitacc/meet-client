import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import authApi from "api/authApi";
import notificationApi from "api/notificationApi";
import roomApi from "api/roomApi";
import userApi from "api/userApi";
import { IChangePasswordParams } from "feature/user/components/PasswordEditerForm/form";
import { INotification } from "model/Notification";
import { IRoom } from "model/Room";
import { IUser } from "model/User";
import { ILoginParams } from "./pages/login/form";

export const login = createAsyncThunk(
  "auth/login",
  async (payload: ILoginParams) => {
    const res = await authApi.login(payload);
    return res.data.access_token;
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (payload: Partial<IUser>) => {
    const res = await authApi.register(payload);
    return res.data.access_token;
  }
);

export const getMe = createAsyncThunk("auth/getMe", async () => {
  const res = await userApi.getMe();
  return res.data.currentUser;
});

export const getMyRoom = createAsyncThunk("auth/getMyRoom", async () => {
  const res = await roomApi.getMyRooms();
  return res.data.rooms;
});

export const getMyNotification = createAsyncThunk(
  "auth/getMyNotification",
  async () => {
    const res = await notificationApi.getAll();
    return res.data.notifications;
  }
);

export const changePassword = createAsyncThunk(
  "auth/changePass",
  async (payload: IChangePasswordParams) => {
    const res = await userApi.changePassword(payload);
    return res.data;
  }
);

export const updateInfor = createAsyncThunk(
  "auth/updateInfor",
  async (payload: Partial<IUser>) => {
    const res = await userApi.update(payload);
    return res.data.userUpdated;
  }
);

interface AuthState {
  currentUser: IUser | null;
  isAuth: boolean;
}
const initialState: AuthState = {
  currentUser: null,
  isAuth: false,
};
const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuth = false;
      state.currentUser = null;
      localStorage.removeItem("access_token");
    },
    addNotification: (
      state,
      { payload }: PayloadAction<INotification<any>>
    ) => {
      let temp = state.currentUser;
      if (!temp) return;
      temp.notifications?.push(payload);
      state.currentUser = temp;
      console.log(temp.notifications?.length);
    },
    removeNotification: (state, { payload }: PayloadAction<string>) => {
      let temp = state.currentUser;
      if (!temp) return;
      temp.notifications = temp.notifications?.filter((i) => i._id != payload);
      state.currentUser = temp;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.rejected, (state) => {
      state.currentUser = null;
      state.isAuth = false;
    });
    builder.addCase(login.pending, (state) => {
      state.isAuth = false;
    });
    builder.addCase(
      login.fulfilled,
      (state, { payload }: PayloadAction<string>) => {
        localStorage.setItem("access_token", payload);
      }
    );
    builder.addCase(register.rejected, (state) => {
      state.currentUser = null;
      state.isAuth = false;
    });
    builder.addCase(register.pending, (state) => {
      state.isAuth = false;
    });
    builder.addCase(
      register.fulfilled,
      (state, { payload }: PayloadAction<string>) => {
        localStorage.setItem("access_token", payload);
      }
    );
    builder.addCase(getMe.rejected, (state) => {
      state.currentUser = null;
      state.isAuth = false;
    });
    builder.addCase(getMe.pending, (state) => {});
    builder.addCase(
      getMe.fulfilled,
      (state, { payload }: PayloadAction<IUser>) => {
        state.currentUser = payload;
        state.isAuth = true;
      }
    );
    builder.addCase(getMyRoom.rejected, (state) => {});
    builder.addCase(getMyRoom.pending, (state) => {});
    builder.addCase(
      getMyRoom.fulfilled,
      (state, { payload }: PayloadAction<IRoom[]>) => {
        if (!state.currentUser) return;
        let temp = state.currentUser;
        temp.rooms = payload;
        state.currentUser = temp;
      }
    );
    builder.addCase(getMyNotification.rejected, (state) => {});
    builder.addCase(getMyNotification.pending, (state) => {});
    builder.addCase(
      getMyNotification.fulfilled,
      (state, { payload }: PayloadAction<INotification<any>[]>) => {
        if (!state.currentUser) return;
        let temp = state.currentUser;
        temp.notifications = payload;
        state.currentUser = temp;
      }
    );
    builder.addCase(changePassword.rejected, (state) => {});
    builder.addCase(changePassword.pending, (state) => {});
    builder.addCase(
      changePassword.fulfilled,
      (state, { payload }: PayloadAction<any>) => {
        console.log(payload);
      }
    );
    builder.addCase(updateInfor.rejected, (state) => {});
    builder.addCase(updateInfor.pending, (state) => {});
    builder.addCase(
      updateInfor.fulfilled,
      (state, { payload }: PayloadAction<IUser>) => {
        state.currentUser = payload;
      }
    );
  },
});

const { reducer: authRedecer, actions } = authSlice;

export const { logout, addNotification, removeNotification } = actions;

export default authRedecer;
