import { Box, Button } from "@mui/material";
import React from "react";
import MicIcon from "@mui/icons-material/Mic";
import PresentToAllIcon from "@mui/icons-material/PresentToAll";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import useMediaControlStyle from "./style";
import useMedia from "hooks/useMedia";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "app/reduxStore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { exitRoom } from "feature/meet/meetSlice";
import { IMember } from "model/Member";

const MediaControl = () => {
  const me = useSelector((state: RootState) => state.meet.me) as IMember;
  const dispatch = useDispatch<AppDispatch>();

  const style = useMediaControlStyle();
  const { getLocalCamStream, stopCam, stopScreen, getLocalScreenStream } =
    useMedia();
  const { myCam, myScreen } = useSelector((state: RootState) => state.media);

  const handleExit = () => {
    dispatch(exitRoom(me));
  };
  return (
    <Box className={style.surface}>
      <Button className={style.roundBtn} color="disable" variant="contained">
        <MicIcon />
      </Button>
      <Button
        onClick={myCam ? stopCam : getLocalCamStream}
        className={style.roundBtn}
        color={`${myCam ? "error" : "disable"}`}
        variant="contained"
      >
        <VideoCameraFrontIcon />
      </Button>
      <Button
        onClick={myScreen ? stopScreen : getLocalScreenStream}
        className={style.roundBtn}
        color={`${myScreen ? "error" : "disable"}`}
        variant="contained"
      >
        <PresentToAllIcon />
      </Button>
      <Button className={style.roundBtn} color="disable" variant="contained">
        <MoreVertIcon />
      </Button>
      <Button
        onClick={handleExit}
        className={style.roundBtn}
        color="error"
        variant="contained"
      >
        <PhoneEnabledIcon />
      </Button>
    </Box>
  );
};

export default MediaControl;
