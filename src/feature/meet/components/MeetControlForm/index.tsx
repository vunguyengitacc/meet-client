import { Box, Typography, Button } from "@mui/material";
import { AppDispatch, RootState } from "app/reduxStore";
import { IRoom } from "model/Room";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsOwnerRecorder, updateRoom } from "feature/meet/meetSlice";
import CustomSwitch from "components/CustomUI/CustomSwitch";
import useMeetControlFormStyle from "./style";
import {
  setRecorder,
  setRecorderStream,
  stopRecorder,
  stopRecorderStream,
} from "hooks/mediaSlice";

const MeetControlForm = () => {
  const room = useSelector((state: RootState) => state.meet.room) as IRoom;
  const { recorder } = useSelector((state: RootState) => state.media);
  const dispatch = useDispatch<AppDispatch>();
  const style = useMeetControlFormStyle();

  const updateHandler = (value: Partial<IRoom>, message: string) => {
    dispatch(
      updateRoom({
        room: { _id: room?._id, ...value },
        notification: message,
      })
    );
  };

  const recordHandler = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });
      updateHandler(
        { _id: room._id, isRecording: true },
        "The recorder is starting!"
      );
      let recordedChunks: BlobPart[] = [];

      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable = function (e) {
        if (e.data.size > 0) {
          recordedChunks.push(e.data);
        }
      };

      mediaRecorder.onstop = function () {
        updateHandler(
          { _id: room._id, isRecording: false },
          "The recorder is stopped!"
        );
        dispatch(stopRecorderStream());
        const blob = new Blob(recordedChunks, {
          type: "video/webm",
        });
        let downloadLink = document.createElement("a");
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = `${
          room.accessCode
        }_${new Date().toString()}.webm`;

        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        recordedChunks = [];
        dispatch(setRecorder(undefined));
      };

      mediaRecorder.start(200);
      dispatch(setIsOwnerRecorder(true));
      dispatch(setRecorderStream(stream));
      dispatch(setRecorder(mediaRecorder));
    } catch (error) {
      console.log(error);
    }
  };

  const stopRecorderHandler = () => {
    dispatch(stopRecorder());
  };

  return (
    <Box className={style.surface}>
      <Box padding="10px">
        <Typography
          variant="subtitle1"
          style={{
            fontWeight: 500,
          }}
        >
          Allow member to
        </Typography>
        <Box className={style.controlItemField}>
          <Box>
            <Typography>Share their micro</Typography>
            <Typography variant="subtitle1">
              Member's audio data will be not sent to everyone if you turn off
              this feature
            </Typography>
          </Box>
          <CustomSwitch
            checked={room.isAllowShareMicro}
            onClick={() =>
              updateHandler(
                { isAllowShareMicro: !room.isAllowShareMicro },
                !room.isAllowShareMicro
                  ? "Admin enable member to share micro"
                  : "Admin block share micro"
              )
            }
          />
        </Box>
        <Box className={style.controlItemField}>
          <Box>
            <Typography>Share their webcam</Typography>
            <Typography variant="subtitle1">
              Member's webcam video data will be not sent to everyone if you
              turn off this feature
            </Typography>
          </Box>
          <CustomSwitch
            checked={room.isAllowShareWebcam}
            onClick={() =>
              updateHandler(
                { isAllowShareWebcam: !room.isAllowShareWebcam },
                !room.isAllowShareWebcam
                  ? "Admin enable member to share webcam"
                  : "Admin block share webcam"
              )
            }
          />
        </Box>
        <Box className={style.controlItemField}>
          <Box>
            <Typography>Share their screen</Typography>
            <Typography variant="subtitle1">
              Member's screen video data will be not sent to everyone if you
              turn off this feature
            </Typography>
          </Box>
          <CustomSwitch
            checked={room.isAllowShareScreen}
            onClick={() =>
              updateHandler(
                { isAllowShareScreen: !room.isAllowShareScreen },
                !room.isAllowShareScreen
                  ? "Admin enable member to share screen"
                  : "Admin block share screen"
              )
            }
          />
        </Box>
      </Box>
      <Box padding="10px">
        <Typography
          variant="subtitle1"
          style={{
            fontWeight: 500,
          }}
        >
          Set this meet
        </Typography>
        <Box className={style.controlItemField}>
          <Box>
            <Typography>To private</Typography>
            <Typography variant="subtitle1">
              Private room need admin accept join request to be joined
            </Typography>
          </Box>
          <CustomSwitch
            checked={room.isPrivate}
            onClick={() =>
              updateHandler(
                { isPrivate: !room.isPrivate },
                !room.isPrivate
                  ? "Admin sets this room to private"
                  : "Admin sets this room to public"
              )
            }
          />
        </Box>
        <Box className={style.controlItemField}>
          <Box>
            <Typography>Record this meet</Typography>
            <Typography variant="subtitle1">
              This meet will be recorded and sent to your mail
            </Typography>
          </Box>
          {room.isRecording ? (
            !recorder ? (
              <Button color="error" variant="outlined">
                You are not recorder
              </Button>
            ) : (
              <Button
                variant="contained"
                disableElevation
                color="error"
                onClick={stopRecorderHandler}
              >
                STOP
              </Button>
            )
          ) : (
            <Button variant="outlined" disableElevation onClick={recordHandler}>
              RECORD
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default React.memo(MeetControlForm);
