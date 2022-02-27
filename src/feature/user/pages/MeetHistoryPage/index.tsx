import { Box } from "@mui/material";
import React from "react";
import useMeetHistoryPageStyle from "./style";

const MeetHistoryPage = () => {
  const style = useMeetHistoryPageStyle();
  return (
    <Box>
      <Box className={style.header}>History header</Box>
      <Box className={style.content}>
        <Box className={style.detail}></Box>
      </Box>
    </Box>
  );
};

export default MeetHistoryPage;
