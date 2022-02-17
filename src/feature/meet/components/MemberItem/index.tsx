import { Avatar, Box, Typography } from "@mui/material";
import Video from "components/Video";
import { IMember } from "model/Member";
import React from "react";
import useMemberItemStyle from "./style";

interface IProps {
  member: IMember;
  media?: MediaStream;
}

const MemberItem: React.FC<IProps> = (props) => {
  const style = useMemberItemStyle();
  return (
    <Box className={style.surface}>
      {props.media ? (
        <Box className={style.member}>
          <Video className={style.video} srcObject={props.media} />
        </Box>
      ) : (
        <Box className={style.member}>
          <Avatar className={style.avatar} src={props.member.user?.avatarURI} />
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
