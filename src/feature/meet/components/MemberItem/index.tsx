import { Avatar, Box } from "@mui/material";
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
        <Video className={style.video} srcObject={props.media} />
      ) : (
        <Box className={style.member}>
          <Avatar className={style.avatar} src={props.member.user?.avatarURI} />
        </Box>
      )}
    </Box>
  );
};

export default MemberItem;
