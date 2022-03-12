import { AppDispatch } from "app/reduxStore";
import { socketClient } from "app/socketClient";
import { addNotification } from "feature/auth/authSlice";
import {
  addMember,
  addMessage,
  normalUpdateRoom,
  quitRoom,
  removeMember,
} from "feature/meet/meetSlice";
import { IMember } from "model/Member";
import { IMessage } from "model/Message";
import { INotification } from "model/Notification";
import { IRoom } from "model/Room";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { stopRecorder } from "./mediaSlice";

const useSocket = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    (async () => {
      socketClient.on("connect", () => {
        let token = localStorage.getItem("access_token");
        socketClient.emit("auth", {
          token,
        });
      });
      socketClient.on("room:finish", () => {
        dispatch(quitRoom());
        dispatch(stopRecorder());
      });
      socketClient.on("room:member-join", (data: IMember) => {
        dispatch(addMember(data));
      });
      socketClient.on("room:member-quit", (data: IMember) => {
        dispatch(removeMember(data));
      });
      socketClient.on(
        "room:update",
        (data: { roomUpdated: IRoom; notification: string }) => {
          dispatch(normalUpdateRoom(data.roomUpdated));
          toast(data.notification);
        }
      );
      socketClient.on("message:new", (data: IMessage) => {
        dispatch(addMessage(data));
      });
      socketClient.on(
        "notification:new",
        ({ notification }: { notification: INotification<any> }) => {
          toast(`You have got an invitation`);
          dispatch(addNotification(notification));
        }
      );
    })();
    return () => {
      socketClient.disconnect();
    };
  }, [socketClient]);
  return socketClient;
};

export default useSocket;
