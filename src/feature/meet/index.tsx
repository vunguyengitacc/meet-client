import { AppDispatch, RootState } from "app/reduxStore";
import { IRoom } from "model/Room";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getOneRoom } from "./meetSlice";
import LoadingPage from "feature/loading";
import WaitPage from "./pages/WaitPage";
import MeetPage from "./pages/MeetPage";
import toast from "react-hot-toast";
import { unwrapResult } from "@reduxjs/toolkit";

const MeetFeature = () => {
  const [load, setLoad] = useState<boolean>(false);
  const joinCode = useSelector((state: RootState) => state.meet.joinCode);
  const navigator = useNavigate();

  const { code } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    (async () => {
      try {
        code && (await dispatch(getOneRoom(code)).then(unwrapResult));
        setLoad(true);
      } catch (error: any) {
        toast.error(error.message);
        navigator("/app");
      }
    })();
  }, [code]);

  return (
    <>
      {load ? (
        joinCode.length > 0 ? (
          <MeetPage />
        ) : (
          <WaitPage />
        )
      ) : (
        <LoadingPage />
      )}
    </>
  );
};

export default MeetFeature;
