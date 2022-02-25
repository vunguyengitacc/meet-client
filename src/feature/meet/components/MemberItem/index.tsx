import { Avatar, Box, IconButton, Typography } from "@mui/material";
import { IMember } from "model/Member";
import React from "react";
import PushPinIcon from "@mui/icons-material/PushPin";
import useMemberItemStyle from "./style";

interface IProps {
  member: IMember;
}

const MemberItem: React.FC<IProps> = ({ member }) => {
  const style = useMemberItemStyle();
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box height="50px" display="flex" alignItems="center" gap="10px">
          <Avatar className={style.avatar} src={member.user?.avatarURI} />
          <Typography variant="h6">{member.user?.fullname}</Typography>
        </Box>
        <Box>
          <IconButton>
            <PushPinIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default MemberItem;
