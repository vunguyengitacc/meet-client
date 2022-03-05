import { Avatar, Box, Button, Typography } from "@mui/material";
import { AppDispatch } from "app/reduxStore";
import Video from "components/Video";
import { setPinItem } from "feature/meet/meetSlice";
import { IMember } from "model/Member";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import useMeetItemStyle from "./style";
import PushPinIcon from "@mui/icons-material/PushPin";
import Audio from "components/Audio";

interface IProps {
  member: IMember;
  media?: MediaStreamTrack;
  audio?: MediaStreamTrack;
  isMe?: boolean;
  type?: string;
}

const MeetItem: React.FC<IProps> = (props) => {
  const style = useMeetItemStyle();
  const dispatch = useDispatch<AppDispatch>();
  const [isHover, setIsHover] = useState<boolean>(false);

  const pinHandler = () => {
    dispatch(setPinItem(`${props.member._id}-${props.type}`));
  };

  const mouseInHandler = () => {
    setIsHover(true);
  };

  const mouseOutHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    let current = e.currentTarget as HTMLElement;
    let next = e.relatedTarget as HTMLElement;
    setIsHover(current.contains(next));
  };

  return (
    <Box
      className={style.surface}
      component="div"
      onMouseOver={mouseInHandler}
      onMouseOut={mouseOutHandler}
    >
      {props.media ? (
        <Box className={style.member}>
          <Video className={style.video} srcObject={props.media} />
          {isHover && (
            <Box className={style.floatingToolbar}>
              <Button
                variant="outlined"
                className={style.floatingGroup}
                onClick={pinHandler}
              >
                <PushPinIcon />
              </Button>
            </Box>
          )}
        </Box>
      ) : (
        <Box className={style.member}>
          <Avatar className={style.avatar} src={props.member.user?.avatarURI} />
          {isHover && (
            <Box className={style.floatingToolbar}>
              <Button
                variant="outlined"
                className={style.floatingGroup}
                onClick={pinHandler}
              >
                <PushPinIcon />
              </Button>
            </Box>
          )}
        </Box>
      )}
      {props.audio && <Audio srcObject={props.audio} />}
      <Typography
        variant="h6"
        color="secondary"
        className={style.floatingTitle}
      >
        {props.isMe ? "Me" : props.member.user?.fullname}
      </Typography>
    </Box>
  );
};

export default MeetItem;
