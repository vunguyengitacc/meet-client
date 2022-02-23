import { Box } from "@mui/material";
import { RootState } from "app/reduxStore";
import { messagesSelector } from "feature/meet/meetSlice";
import React from "react";
import { useSelector } from "react-redux";
import Message from "../Message";

const MessageBox = () => {
  const { joinCode } = useSelector((state: RootState) => state.meet);
  const messages = useSelector((state: RootState) =>
    messagesSelector.selectAll(state)
  );
  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      flexDirection="column"
      gap="10px"
    >
      {messages.map((i, index) => (
        <Message
          message={i}
          key={index}
          isMe={i.member.joinSession === joinCode}
        />
      ))}
    </Box>
  );
};

export default MessageBox;
