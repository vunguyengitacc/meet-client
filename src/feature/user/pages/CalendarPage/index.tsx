import { Box } from "@mui/material";
import React from "react";
import useCalendarPageStyle from "./style";

const CalendarPage = () => {
  const style = useCalendarPageStyle();
  return (
    <Box>
      <Box className={style.header}>Calendar header</Box>
      <Box className={style.content}>
        <Box className={style.detail}></Box>
      </Box>
    </Box>
  );
};

export default CalendarPage;
