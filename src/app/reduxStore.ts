import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authRedecer from "feature/auth/authSlice";
import meetReducer from "feature/meet/meetSlice";
import mediaReducer from "hooks/mediaSlice";
import mediasoupReducer from "hooks/meetMediaSlice";

const rootReducer = {
  auth: authRedecer,
  meet: meetReducer,
  media: mediaReducer,
  mediasoup: mediasoupReducer,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
