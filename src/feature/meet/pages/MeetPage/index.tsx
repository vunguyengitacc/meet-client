import { Box, Button } from "@mui/material";
import { AppDispatch, RootState } from "app/reduxStore";
import MemberDisplayer from "feature/meet/components/MemberDisplayer";
import TaskBar from "feature/meet/components/TaskBar";
import { getMember } from "feature/meet/meetSlice";
import { IRoom } from "model/Room";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useMeetPageStyle from "./style";
import LoadingPage from "feature/loading";
import useSocket from "hooks/useSocket";
import { socketClient } from "app/socketClient";
import * as mediasoupClient from "mediasoup-client";
import { createDevice } from "hooks/useMeet";

const MeetPage = () => {
  const room = useSelector((state: RootState) => state.meet.room) as IRoom;
  const joinCode = useSelector((state: RootState) => state.meet.joinCode);
  const [load, setLoad] = useState<boolean>(false);
  const [isShowTask, setIsShowTask] = useState<boolean>(false);
  const style = useMeetPageStyle();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    socketClient.emit(
      "meet:join",
      { roomId: room._id, joinCode },
      (res: { rtpCapabilities: mediasoupClient.types.RtpCapabilities }) => {
        createDevice(res.rtpCapabilities);
        dispatch(getMember({ room, joinCode })).then(() => {
          setLoad(true);
        });
      }
    );
    return () => {
      socketClient.emit("meet:exit", { roomId: room._id });
    };
  }, [room]);

  return (
    <>
      {load ? (
        <Box className={style.surface}>
          <Box className={style.app}>
            <MemberDisplayer isShowTask={isShowTask} />
          </Box>
          <Box className={style.task}>
            <TaskBar isShowTask={isShowTask} setIsShowTask={setIsShowTask} />
          </Box>
        </Box>
      ) : (
        <LoadingPage />
      )}
    </>
  );
};

export default MeetPage;
