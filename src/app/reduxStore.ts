import { configureStore } from "@reduxjs/toolkit";
import authRedecer from "feature/auth/authSlice";
import meetReducer from "feature/meet/meetSlice";
import mediaReducer from "hooks/mediaSlice";

const rootReducer = {
  auth: authRedecer,
  meet: meetReducer,
  media: mediaReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
