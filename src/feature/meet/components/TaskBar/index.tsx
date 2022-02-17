import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import useTaskBarStyle from "./style";
import MessageIcon from "@mui/icons-material/Message";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import MediaControl from "../MediaControl";
import useTime from "hooks/useTime";

interface IProps {
  setIsShowTask: (value: boolean) => void;
  isShowTask: boolean;
}

const TaskBar: React.FC<IProps> = ({ setIsShowTask, isShowTask }) => {
  const style = useTaskBarStyle();
  const { date } = useTime();

  return (
    <Box className={style.surface}>
      <Typography>{date.toLocaleDateString()}</Typography>
      <Box className={style.groupBtn}>
        <MediaControl />
      </Box>
      <Box className={style.groupBtn}>
        <IconButton
          onClick={() => setIsShowTask(!isShowTask)}
          className={style.fadeBgBtn}
        >
          <PersonIcon />
        </IconButton>
        <IconButton
          onClick={() => setIsShowTask(!isShowTask)}
          className={style.fadeBgBtn}
        >
          <MessageIcon />
        </IconButton>
        <IconButton
          onClick={() => setIsShowTask(!isShowTask)}
          className={style.fadeBgBtn}
        >
          <SettingsIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default TaskBar;
