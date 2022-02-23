import { AppDispatch } from "app/reduxStore";
import { socketClient } from "app/socketClient";
import {
  addMember,
  addMessage,
  normalUpdateRoom,
  quitRoom,
  removeMember,
} from "feature/meet/meetSlice";
import { IMember } from "model/Member";
import { IMessage } from "model/Message";
import { IRoom } from "model/Room";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

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
        try {
          dispatch(quitRoom());
        } catch (error) {}
      });
      socketClient.on("room:member-join", (data: IMember) => {
        try {
          dispatch(addMember(data));
        } catch (error) {}
      });
      socketClient.on("room:member-quit", (data: IMember) => {
        try {
          dispatch(removeMember(data));
        } catch (error) {}
      });
      socketClient.on(
        "room:update",
        (data: { roomUpdated: IRoom; notification: string }) => {
          try {
            dispatch(normalUpdateRoom(data.roomUpdated));
            toast(data.notification);
          } catch (error) {}
        }
      );
      socketClient.on("message:new", (data: IMessage) => {
        try {
          dispatch(addMessage(data));
        } catch (error) {}
      });
    })();
    return () => {
      socketClient.disconnect();
    };
  }, [socketClient]);
  return socketClient;
};

export default useSocket;
