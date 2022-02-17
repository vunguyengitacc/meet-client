import { Box, IconButton } from "@mui/material";
import React from "react";
import useTaskBarStyle from "./style";
import MessageIcon from "@mui/icons-material/Message";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import MediaControl from "../MediaControl";

const TaskBar = () => {
  const style = useTaskBarStyle();

  return (
    <Box className={style.surface}>
      check
      <Box className={style.groupBtn}>
        <MediaControl />
      </Box>
      <Box className={style.groupBtn}>
        <IconButton className={style.fadeBgBtn}>
          <PersonIcon />
        </IconButton>
        <IconButton className={style.fadeBgBtn}>
          <MessageIcon />
        </IconButton>
        <IconButton className={style.fadeBgBtn}>
          <SettingsIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default TaskBar;
