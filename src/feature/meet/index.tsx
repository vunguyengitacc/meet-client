import { AppDispatch, RootState } from "app/reduxStore";
import { IRoom } from "model/Room";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneRoom } from "./meetSlice";
import LoadingPage from "feature/loading";
import WaitPage from "./pages/WaitPage";
import MeetPage from "./pages/MeetPage";

const MeetFeature = () => {
  const [load, setLoad] = useState<boolean>(false);
  const room = useSelector((state: RootState) => state.meet.room) as IRoom;

  const { code } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    code && dispatch(getOneRoom(code)).then(() => setLoad(true));
  }, [code]);

  return (
    <>{load ? room.isPrivate ? <WaitPage /> : <MeetPage /> : <LoadingPage />}</>
  );
};

export default MeetFeature;
