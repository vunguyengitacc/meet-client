import { AppDispatch } from "app/reduxStore";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import {
  setCamStream,
  setMicStream,
  setScreenStream,
  stopMyCam,
  stopMyMic,
  stopMyScreen,
} from "./mediaSlice";

const useMedia = () => {
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
    track.onended = () => {
      stopCam();
    };
    setParams({ track, ...params });
  };
  const screenStreamSuccess = (stream: MediaStream) => {
    dispatch(setScreenStream(stream));
    const track = stream.getVideoTracks()[0];
    track.onended = () => {
      stopScreen();
    };
    setParams({ track, ...params });
  };
  const micStreamSuccess = (stream: MediaStream) => {
    dispatch(setMicStream(stream));
    const track = stream.getAudioTracks()[0];
    track.onended = () => {
      stopMic();
    };
    setParams({ track, ...params });
  };

  const getLocalCamStream = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
      })
      .then(camStreamSuccess)
      .catch((error) => {
        toast.error(error.message);
      });
  };
  const getLocalScreenStream = () => {
    navigator.mediaDevices
      .getDisplayMedia({
        audio: true,
        video: true,
      })
      .then(screenStreamSuccess)
      .catch((error) => {
        console.log(error.message);
      });
  };

  const getLocalMicStream = () => {
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
      })
      .then(micStreamSuccess)
      .catch((error) => {
        toast.error(error.message);
      });
  };
  const stopCam = () => {
    dispatch(stopMyCam());
  };
  const stopScreen = () => {
    dispatch(stopMyScreen());
  };
  const stopMic = () => {
    dispatch(stopMyMic());
  };
  return {
    params,
    getLocalScreenStream,
    getLocalCamStream,
    stopCam,
    stopScreen,
    getLocalMicStream,
    stopMic,
  };
};

export default useMedia;
