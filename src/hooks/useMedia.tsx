import { AppDispatch, RootState } from "app/reduxStore";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCamStream,
  setScreenStream,
  stopMyCam,
  stopMyScreen,
} from "./mediaSlice";

const useMedia = () => {
  const { myCam, myScreen } = useSelector((state: RootState) => state.media);
  const dispatch = useDispatch<AppDispatch>();
  const [params, setParams] = useState<any>({
    encodings: [
      {
        rid: "r0",
        maxBitrate: 100000,
        scalabilityMode: "S1T3",
      },
      {
        rid: "r1",
        maxBitrate: 300000,
        scalabilityMode: "S1T3",
      },
      {
        rid: "r2",
        maxBitrate: 900000,
        scalabilityMode: "S1T3",
      },
    ],
    codecOptions: {
      videoGoogleStartBitrate: 1000,
    },
  });

  const camStreamSuccess = (stream: MediaStream) => {
    dispatch(setCamStream(stream));
    const track = stream.getVideoTracks()[0];
    setParams({ track, ...params });
  };
  const screenStreamSuccess = (stream: MediaStream) => {
    dispatch(setScreenStream(stream));
    const track = stream.getVideoTracks()[0];
    setParams({ track, ...params });
  };

  const getLocalCamStream = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
      })
      .then(camStreamSuccess)
      .catch((error) => {
        console.log(error.message);
      });
  };
  const getLocalScreenStream = () => {
    navigator.mediaDevices
      .getDisplayMedia({})
      .then(screenStreamSuccess)
      .catch((error) => {
        console.log(error.message);
      });
  };
  const stopCam = () => {
    dispatch(stopMyCam());
  };
  const stopScreen = () => {
    dispatch(stopMyScreen());
  };
  return {
    params,
    getLocalScreenStream,
    getLocalCamStream,
    stopCam,
    stopScreen,
  };
};

export default useMedia;
