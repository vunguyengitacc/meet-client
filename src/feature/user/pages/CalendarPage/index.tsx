import { Box, Typography } from "@mui/material";
import React from "react";
import useCalendarPageStyle from "./style";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ScheduleBox from "feature/user/components/ScheduleBox";

const CalendarPage = () => {
  const style = useCalendarPageStyle();
  return (
    <Box className={style.surface}>
      <Box className={style.header}>
        <Box className={style.headerIcon}>
          <CalendarTodayIcon />
        </Box>
        <Box>
          <Typography variant="h6">Calendar</Typography>
          <Typography>Monitoring your schedule</Typography>
        </Box>
      </Box>
      <Box className={style.content}>
        <ScheduleBox />
      </Box>
    </Box>
  );
};

export default CalendarPage;
