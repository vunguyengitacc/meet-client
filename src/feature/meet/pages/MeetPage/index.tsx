import { Box } from "@mui/material";
import { AppDispatch, RootState } from "app/reduxStore";
import MeetApp from "feature/meet/components/MeetApp";
import TaskBar from "feature/meet/components/TaskBar";
import {
  getMember,
  setMemberWebcam,
  setMemberMicro,
  setMemberScreen,
  getMessage,
  addNewRequest,
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
import { IRequest } from "model/Request";

const MeetPage = () => {
  const room = useSelector((state: RootState) => state.meet.room) as IRoom;
  const joinCode = useSelector((state: RootState) => state.meet.joinCode);
  const [load, setLoad] = useState<boolean>(false);
  const [type, setType] = useState<number>(0);
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
      async (res: {
        rtpCapabilities: mediasoupClient.types.RtpCapabilities;
      }) => {
        await dispatch(getMember({ room, joinCode }));
        await createDevice(res.rtpCapabilities);
        await getOldProducers();
        await dispatch(getMessage(room));
        setLoad(true);
      }
    );
    socketClient.on("request/new", (payload: IRequest) => {
      dispatch(addNewRequest(payload));
    });
    return () => {
      socketClient.emit("meet:exit", { roomId: room._id });
    };
  }, []);

  return (
    <>
      {load ? (
        <Box className={style.surface}>
          <Box className={style.app}>
            <MeetApp setType={setType} typeDisplay={type} />
          </Box>
          <Box className={style.task}>
            <TaskBar currentType={type} setType={setType} />
          </Box>
        </Box>
      ) : (
        <LoadingPage />
      )}
    </>
  );
};

export default MeetPage;
