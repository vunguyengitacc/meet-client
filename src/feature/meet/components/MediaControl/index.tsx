import { Box, Button, Menu, MenuItem, useMediaQuery } from "@mui/material";
import React, { useEffect } from "react";
import MicNoneOutlinedIcon from "@mui/icons-material/MicNoneOutlined";
import PresentToAllIcon from "@mui/icons-material/PresentToAll";
import VideoCameraFrontOutlinedIcon from "@mui/icons-material/VideoCameraFrontOutlined";
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
import { stopRecorder } from "hooks/slices/mediaSlice";
import theme from "app/muiTheme";
import SquareButton from "components/CustomUI/SquareButton";

interface IProps {
  setType: (value: number) => void;
}

const MediaControl: React.FC<IProps> = ({ setType }) => {
  const me = useSelector((state: RootState) => state.meet.me) as IMember;
  const pin = useSelector((state: RootState) => state.meet.pinItem);
  const room = useSelector((state: RootState) => state.meet.room) as IRoom;
  const recorder = useSelector((state: RootState) => state.media.recorder);
  const isRecorderOwner = useSelector(
    (state: RootState) => state.meet.isRecorderOwner
  );
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorElOption, setAnchorElOption] =
    React.useState<null | HTMLElement>(null);
  const [openMenu, setOpenMenu] = React.useState<boolean>(false);
  const [openOption, setOpenOption] = React.useState<boolean>(false);

  const matchesMd = useMediaQuery(theme.breakpoints.up("md"));
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

  const openOptionHandler = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElOption(event.currentTarget);
    setOpenOption(true);
  };
  const closeOptionHandler = () => {
    setAnchorElOption(null);
    setOpenOption(false);
  };

  const openToolBoxHandler = (value: number) => {
    setType(value);
    closeOptionHandler();
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
      {!matchesMd && (
        <SquareButton
          className={style.roundBtn}
          color="error"
          variant="contained"
          onClick={openMenuHandler}
        >
          <PhoneEnabledIcon className={style.phoneOffIcon} />
        </SquareButton>
      )}
      <SquareButton
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
        <MicNoneOutlinedIcon />
      </SquareButton>
      <SquareButton
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
        <VideoCameraFrontOutlinedIcon />
      </SquareButton>
      <SquareButton
        onClick={myScreen ? stopScreen : getLocalScreenStream}
        className={style.roundBtn}
        color={`${
          myScreen
            ? !room.isAllowShareScreen && !me.isAdmin
              ? "warning"
              : "error"
            : "disable"
        }`}
        variant="contained"
      >
        <PresentToAllIcon />
      </SquareButton>
      <SquareButton
        className={style.roundBtn}
        color="disable"
        variant="contained"
        onClick={openOptionHandler}
      >
        <MoreVertIcon />
      </SquareButton>
      <Menu
        anchorEl={anchorElOption}
        open={openOption}
        onClose={closeOptionHandler}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem
          className={style.menuItem}
          onClick={() => openToolBoxHandler(1)}
        >
          Members
        </MenuItem>
        <MenuItem
          className={style.menuItem}
          onClick={() => openToolBoxHandler(2)}
        >
          Messages
        </MenuItem>
        <MenuItem
          className={style.menuItem}
          onClick={() => openToolBoxHandler(4)}
        >
          White board
        </MenuItem>
        <MenuItem
          className={style.menuItem}
          onClick={() => openToolBoxHandler(3)}
        >
          Settings
        </MenuItem>
      </Menu>
      {matchesMd && (
        <SquareButton
          className={style.roundBtn}
          color="error"
          variant="contained"
          onClick={openMenuHandler}
        >
          <PhoneEnabledIcon className={style.phoneOffIcon} />
        </SquareButton>
      )}
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
