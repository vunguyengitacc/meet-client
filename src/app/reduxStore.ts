import { configureStore } from "@reduxjs/toolkit";
import authRedecer from "feature/auth/authSlice";

const rootReducer = {
  auth: authRedecer,
};

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
