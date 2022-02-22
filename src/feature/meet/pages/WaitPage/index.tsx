import { LoadingButton } from "@mui/lab";
import { Box, Button, Typography } from "@mui/material";
import memberApi from "api/memberApi";
import { AppDispatch, RootState } from "app/reduxStore";
import Video from "components/Video";
import { setJoinCode } from "feature/meet/meetSlice";
import useMedia from "hooks/useMedia";
import { IRoom } from "model/Room";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useWaitPageStyle from "./style";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import MicIcon from "@mui/icons-material/Mic";
import AppHeader from "feature/app/components/AppHeader";

const WaitPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const room = useSelector((state: RootState) => state.meet.room) as IRoom;
  const [isWait, setIsWait] = useState<boolean>(false);
  const myCam = useSelector((state: RootState) => state.media.myCam);
  let style = useWaitPageStyle({ onCam: true, onMic: false });
  const { getLocalCamStream, stopCam } = useMedia();

  const handleJoin = async () => {
    try {
      const rs = await memberApi.join(room);
      if (rs.data.joinCode !== undefined) {
        dispatch(setJoinCode(rs.data.joinCode));
      } else setIsWait(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Box height="10vh" width="100%">
        <AppHeader />
      </Box>
      <Box className={style.surface}>
        <Box className={style.mediaCheckerField}>
          {myCam ? (
            <Video
              className={style.video}
              srcObject={myCam.getVideoTracks()[0]}
            />
          ) : (
            <video className={style.video} />
          )}
          <Box className={style.taskBtnGroup}>
            <Button
              className={style.taskBtn}
              variant="contained"
              sx={{
                bgcolor: `${
                  myCam !== undefined ? "red" : "#8383833b"
                } !important`,
              }}
              onClick={myCam ? stopCam : getLocalCamStream}
            >
              <VideoCameraFrontIcon />
            </Button>
            <Button
              className={style.taskBtn}
              variant="contained"
              sx={{
                bgcolor: `${false ? "red" : "#8383833b"} !important`, //myMic !== undefined ? 'red' : '#8383833b'
              }}
            >
              <MicIcon />
            </Button>
          </Box>
        </Box>
        <Box className={style.joinField}>
          <Typography variant="h5">Ready to join</Typography>
          <Box>
            <LoadingButton
              className={style.joinBtn}
              loading={isWait}
              onClick={handleJoin}
              variant="contained"
              disableElevation
            >
              Join
            </LoadingButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default WaitPage;
