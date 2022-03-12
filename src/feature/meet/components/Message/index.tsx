import { Box, Typography } from "@mui/material";
import { IMessage } from "model/Message";
import React, { useState } from "react";
import useMessageStyle from "./style";

interface IProps {
  message: IMessage;
  isMe?: boolean;
}

const Message: React.FC<IProps> = ({ message, isMe }) => {
  const [createAt, setCreateAt] = useState<Date>(new Date(message.createdAt));
  const style = useMessageStyle();
  return (
    <Box>
      <Box display="flex" gap="20px" alignItems="center">
        <Box>
          <Typography variant="subtitle1">
            <b>{isMe ? "Me" : message.member.user?.fullname}</b>
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2" style={{ fontWeight: 400 }}>
            {`${createAt.getHours()} : ${createAt.getMinutes()}`}
          </Typography>
        </Box>
      </Box>
      <Box>{message.content}</Box>
    </Box>
  );
};

export default Message;
