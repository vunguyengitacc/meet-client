import { AppDispatch, RootState } from "app/reduxStore";
import { socketClient } from "app/socketClient";
import { addMember, quitRoom, removeMember } from "feature/meet/meetSlice";
import { IMember } from "model/Member";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

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
    })();
    return () => {
      socketClient.disconnect();
    };
  }, [socketClient]);
  return socketClient;
};

export default useSocket;
