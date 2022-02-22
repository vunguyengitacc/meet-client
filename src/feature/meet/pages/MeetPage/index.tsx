import { Box } from "@mui/material";
import { AppDispatch, RootState } from "app/reduxStore";
import MemberDisplayer from "feature/meet/components/MemberDisplayer";
import TaskBar from "feature/meet/components/TaskBar";
import { getMember, setMemberStream } from "feature/meet/meetSlice";
import { IRoom } from "model/Room";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useMeetPageStyle from "./style";
import LoadingPage from "feature/loading";
import { socketClient } from "app/socketClient";
import * as mediasoupClient from "mediasoup-client";
import useMeeting from "hooks/useMeeting";

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
      (data: { producerId: string; spec: string }) => {
        signalNewConsumerTransport(data.producerId, data.spec);
      }
    );
    socketClient.on(
      "producer-closed",
      async (data: { remoteProducerId: string; spec: string }) => {
        await dispatch(
          setMemberStream({ joinCode: data.spec, stream: undefined })
        );
        const transport = Object.values(getConsumerTransport()).filter(
          (transportData: any) =>
            transportData.connection.filter(
              (i: any) => i.producerId === data.remoteProducerId
            ).length > 0
        )[0] as any;
        if (transport === undefined) return;
        transport.connection
          .filter((i: any) => i.producerId === data.remoteProducerId)[0]
          .consumer.close();
        // setConsumerTransports(
        //   getConsumerTransport().filter(
        //     (transportData) =>
        //       transportData.producerId !== data.remoteProducerId
        //   )
        // );
        // setConsumerTransports({
        //   id: transport.consumerTransport.id,
        //   payload: {

        //   },
        // });

        transport.connection
          .filter((i: any) => i.producerId === data.remoteProducerId)[0]
          .consumer.close();
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
