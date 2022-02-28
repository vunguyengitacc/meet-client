import { Box, Typography } from "@mui/material";
import React from "react";
import useMeetHistoryPageStyle from "./style";
import HistoryIcon from "@mui/icons-material/History";

const MeetHistoryPage = () => {
  const style = useMeetHistoryPageStyle();
  return (
    <Box>
      <Box className={style.header}>
        <Box className={style.headerIcon}>
          <HistoryIcon />
        </Box>
        <Box>
          <Typography variant="h6">Histories</Typography>
          <Typography>Your meeting history</Typography>
        </Box>
      </Box>
      <Box className={style.content}></Box>
    </Box>
  );
};

export default MeetHistoryPage;
