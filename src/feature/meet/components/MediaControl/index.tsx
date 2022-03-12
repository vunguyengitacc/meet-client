import { Box, Button, Menu, MenuItem } from "@mui/material";
import React, { useEffect } from "react";
import MicIcon from "@mui/icons-material/Mic";
import PresentToAllIcon from "@mui/icons-material/PresentToAll";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import useMediaControlStyle from "./style";
import useMedia from "hooks/useMedia";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "app/reduxStore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { exitRoom, finishRoom, setPinItem } from "feature/meet/meetSlice";
import { IMember } from "model/Member";
import useMeeting from "hooks/useMeeting";
import { StreamType } from "utilities/streamTypeUtil";
import { IRoom } from "model/Room";
import toast from "react-hot-toast";
import { stopRecorder } from "hooks/mediaSlice";

const MediaControl = () => {
  const me = useSelector((state: RootState) => state.meet.me) as IMember;
  const pin = useSelector((state: RootState) => state.meet.pinItem);
  const room = useSelector((state: RootState) => state.meet.room) as IRoom;
  const recorder = useSelector((state: RootState) => state.media.recorder);
  const isRecorderOwner = useSelector(
    (state: RootState) => state.meet.isRecorderOwner
  );

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openMenu, setOpenMenu] = React.useState<boolean>(Boolean(anchorEl));

  const { createSendTransport, closeProducer } = useMeeting();
  const { myCam, myScreen, myMic } = useSelector(
    (state: RootState) => state.media
  );

  const dispatch = useDispatch<AppDispatch>();
  const style = useMediaControlStyle();
  const {
    getLocalCamStream,
    stopCam,
    stopScreen,
    getLocalScreenStream,
    getLocalMicStream,
    stopMic,
  } = useMedia();

  const handleExit = () => {
    if (me.isAdmin && recorder && isRecorderOwner) {
      dispatch(stopRecorder());
    }
    dispatch(exitRoom(me));
  };

  const handleFinish = () => {
    if (recorder && isRecorderOwner) {
      dispatch(stopRecorder());
    }
    dispatch(finishRoom(me));
  };

  const openMenuHandler = (event: React.MouseEvent<HTMLElement>) => {
    if (me.isAdmin) {
      setAnchorEl(event.currentTarget);
      setOpenMenu(true);
    } else handleExit();
  };
  const closeMenuHandler = () => {
    setAnchorEl(null);
    setOpenMenu(false);
  };

  useEffect(() => {
    if (myCam && !room.isAllowShareWebcam) {
      closeProducer(StreamType.webcam);
      toast("Admin block share webcam, your sharing data will be closed");
    }
    if (myScreen && !room.isAllowShareScreen) {
      closeProducer(StreamType.screen);
      toast("Admin block share screen, your sharing data will be closed");
    }
  }, [room]);

  useEffect(() => {
    if (!room.isAllowShareWebcam && myCam && !me.isAdmin) {
      toast(
        "You are not allowed to share your webcam. Your data will be not sent."
      );
      return;
    }
    if (myCam)
      createSendTransport(myCam.getVideoTracks()[0], StreamType.webcam);
    else closeProducer(StreamType.webcam);
  }, [myCam]);

  useEffect(() => {
    if (!room.isAllowShareScreen && myScreen && !me.isAdmin) {
      toast(
        "You are not allowed to share your screen. Your data will be not sent."
      );
      return;
    }
    if (myScreen) {
      createSendTransport(myScreen.getVideoTracks()[0], StreamType.screen);
      if (!pin) dispatch(setPinItem(`${me._id}-screen`));
    } else {
      closeProducer(StreamType.screen);
      if (pin === `${me._id}-screen`) dispatch(setPinItem(""));
    }
  }, [myScreen]);
  useEffect(() => {
    if (!room.isAllowShareMicro && myMic && !me.isAdmin) {
      toast(
        "You are not allowed to share your audio micro. Your data will be not sent."
      );
      return;
    }
    if (myMic) createSendTransport(myMic.getAudioTracks()[0], StreamType.micro);
    else closeProducer(StreamType.micro);
  }, [myMic]);
  return (
    <Box className={style.surface}>
      <Button
        onClick={myMic ? stopMic : getLocalMicStream}
        className={style.roundBtn}
        color={`${
          myMic
            ? !room.isAllowShareWebcam && !me.isAdmin
              ? "warning"
              : "error"
            : "disable"
        }`}
        variant="contained"
      >
        <MicIcon />
      </Button>
      <Button
        onClick={myCam ? stopCam : getLocalCamStream}
        className={style.roundBtn}
        color={`${
          myCam
            ? !room.isAllowShareWebcam && !me.isAdmin
              ? "warning"
              : "error"
            : "disable"
        }`}
        variant="contained"
      >
        <VideoCameraFrontIcon />
      </Button>
      <Button
        onClick={myScreen ? stopScreen : getLocalScreenStream}
        className={style.roundBtn}
        color={`${
          myScreen
            ? !room.isAllowShareWebcam && !me.isAdmin
              ? "warning"
              : "error"
            : "disable"
        }`}
        variant="contained"
      >
        <PresentToAllIcon />
      </Button>
      <Button className={style.roundBtn} color="disable" variant="contained">
        <MoreVertIcon />
      </Button>
      <Button
        className={style.roundBtn}
        color="error"
        variant="contained"
        onClick={openMenuHandler}
      >
        <PhoneEnabledIcon className={style.phoneOffIcon} />
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={openMenu}
        onClose={closeMenuHandler}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem className={style.menuItem} onClick={handleExit}>
          Just Exit
        </MenuItem>
        <MenuItem className={style.menuItem} onClick={handleFinish}>
          Finish meet
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default MediaControl;
