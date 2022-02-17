import { Box, Button } from "@mui/material";
import React from "react";
import MicIcon from "@mui/icons-material/Mic";
import PresentToAllIcon from "@mui/icons-material/PresentToAll";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import useMediaControlStyle from "./style";
import useMedia from "hooks/useMedia";
import { useSelector } from "react-redux";
import { RootState } from "app/reduxStore";

const MediaControl = () => {
  const style = useMediaControlStyle();
  const { getLocalCamStream, stopCam, stopScreen, getLocalScreenStream } =
    useMedia();
  const { myCam, myScreen } = useSelector((state: RootState) => state.media);
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
      <Button className={style.roundBtn} color="error" variant="contained">
        <PhoneEnabledIcon />
      </Button>
    </Box>
  );
};

export default MediaControl;
