import { Box } from "@mui/material";
import { AppDispatch, RootState } from "app/reduxStore";
import MeetApp from "feature/meet/components/MeetApp";
import TaskBar from "feature/meet/components/TaskBar";
import {
  getMember,
  setMemberWebcam,
  setMemberMicro,
  setMemberScreen,
} from "feature/meet/meetSlice";
import { IRoom } from "model/Room";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useMeetPageStyle from "./style";
import LoadingPage from "feature/loading";
import { socketClient } from "app/socketClient";
import * as mediasoupClient from "mediasoup-client";
import useMeeting from "hooks/useMeeting";
import { StreamType } from "utilities/streamTypeUtil";

const MeetPage = () => {
  const room = useSelector((state: RootState) => state.meet.room) as IRoom;
  const joinCode = useSelector((state: RootState) => state.meet.joinCode);
  const [load, setLoad] = useState<boolean>(false);
  const [isShowTask, setIsShowTask] = useState<boolean>(false);
  const style = useMeetPageStyle();
  const dispatch = useDispatch<AppDispatch>();
  const {
    createDevice,
    signalNewConsumerTransport,
    getConsumerTransport,
    setConsumerTransports,
    getOldProducers,
  } = useMeeting();

  useEffect(() => {
    socketClient.on(
      "new-producer",
      (data: { producerId: string; spec: string; type: StreamType }) => {
        signalNewConsumerTransport(data.producerId, data.spec, data.type);
      }
    );
    socketClient.on(
      "producer-closed",
      async (data: {
        remoteProducerId: string;
        spec: string;
        type: StreamType;
      }) => {
        switch (data.type) {
          case StreamType.webcam:
            dispatch(
              setMemberWebcam({ joinCode: data.spec, stream: undefined })
            );
            break;
          case StreamType.micro:
            dispatch(
              setMemberMicro({ joinCode: data.spec, stream: undefined })
            );
            break;
          case StreamType.screen:
            dispatch(
              setMemberScreen({ joinCode: data.spec, stream: undefined })
            );
            break;
          default:
            break;
        }
        const transport = Object.values(getConsumerTransport()).filter(
          (transportData: any) =>
            transportData.connection.filter(
              (i: any) => i.producerId === data.remoteProducerId
            ).length > 0
        )[0] as any;
        if (transport === undefined) return;

        setConsumerTransports({
          id: transport.consumerTransport.id,
          payload: transport,
        });

        transport.connection
          .filter((i: any) => i.producerId === data.remoteProducerId)[0]
          .consumer.close();
        transport.connection = transport.connection.filter(
          (i: any) => i.producerId !== data.remoteProducerId
        );
      }
    );
  }, []);

  useEffect(() => {
    socketClient.emit(
      "meet:join",
      { roomId: room._id, joinCode },
      (res: { rtpCapabilities: mediasoupClient.types.RtpCapabilities }) => {
        dispatch(getMember({ room, joinCode })).then(() => {
          createDevice(res.rtpCapabilities).then(() => {
            getOldProducers();
          });
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
            <MeetApp isShowTask={isShowTask} />
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
