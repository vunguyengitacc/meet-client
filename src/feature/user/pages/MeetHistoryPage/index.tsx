import { Box, Typography } from "@mui/material";
import React from "react";
import useMeetsPageStyle from "./style";
import HistoryIcon from "@mui/icons-material/History";

const MeetHistoryPage = () => {
  const style = useMeetsPageStyle();
  return (
    <Box>
      <Box className={style.header}>
        <Box className={style.headerIcon}>
          <HistoryIcon />
        </Box>
        <Box>
          <Typography variant="h6">History</Typography>
          <Typography>See your history meeting</Typography>
        </Box>
      </Box>
      <Box className={style.content}></Box>
    </Box>
  );
};

export default MeetHistoryPage;
