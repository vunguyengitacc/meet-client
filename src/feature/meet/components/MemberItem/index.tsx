import { Avatar, Box, IconButton, Typography } from "@mui/material";
import { IMember } from "model/Member";
import React from "react";
import PushPinIcon from "@mui/icons-material/PushPin";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import useMemberItemStyle from "./style";
import { useDispatch } from "react-redux";
import { AppDispatch } from "app/reduxStore";
import { kickMember, setPinItem } from "feature/meet/meetSlice";

interface IProps {
  member: IMember;
  isMe?: boolean;
  isScreen?: boolean;
  enableKick?: boolean;
}

const MemberItem: React.FC<IProps> = ({
  member,
  isMe,
  isScreen,
  enableKick,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const style = useMemberItemStyle();
  const handleKick = () => {
    dispatch(kickMember(member));
  };
  const handlePin = () => {
    dispatch(setPinItem(member._id + "-cam"));
  };
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box height="50px" display="flex" alignItems="center" gap="10px">
          <Avatar className={style.avatar} src={member.user?.avatarURI} />
          <Box display="flex" gap="10px" alignItems="center">
            <Typography variant="subtitle1" style={{ fontWeight: 400 }}>
              {member.user?.fullname} {isMe && "(Me)"}
            </Typography>
            <Typography variant="subtitle2">
              {isScreen && "(Screen sharing)"}
            </Typography>
          </Box>
        </Box>
        <Box>
          <IconButton onClick={handlePin}>
            <PushPinIcon />
          </IconButton>
          {enableKick && (
            <IconButton onClick={handleKick}>
              <LogoutOutlinedIcon />
            </IconButton>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default MemberItem;
