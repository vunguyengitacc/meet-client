import { Avatar, Box, Button, Typography } from "@mui/material";
import Video from "components/Video";
import { IMember } from "model/Member";
import React from "react";
import useMemberItemStyle from "./style";

interface IProps {
  member: IMember;
  media?: MediaStreamTrack;
}

const MemberItem: React.FC<IProps> = (props) => {
  const style = useMemberItemStyle();
  return (
    <Box className={style.surface}>
      {props.media ? (
        <Box className={style.member}>
          <Video className={style.video} srcObject={props.media} />
          {/* <Button className={style.floatingGroup}>Pin</Button> */}
        </Box>
      ) : (
        <Box className={style.member}>
          <Avatar className={style.avatar} src={props.member.user?.avatarURI} />
          {/* <Button className={style.floatingGroup}>Pin</Button> */}
        </Box>
      )}
      <Typography
        variant="h6"
        color="secondary"
        className={style.floatingTitle}
      >
        {props.member.user?.fullname}
      </Typography>
    </Box>
  );
};

export default MemberItem;
