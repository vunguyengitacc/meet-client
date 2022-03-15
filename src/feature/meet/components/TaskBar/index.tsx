import { Box, IconButton, Typography, Chip } from "@mui/material";
import React from "react";
import useTaskBarStyle from "./style";
import MessageIcon from "@mui/icons-material/Message";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import MediaControl from "../MediaControl";
import useTime from "hooks/useTime";

interface IProps {
  setType: (value: number) => void;
  currentType: number;
}

const TaskBar: React.FC<IProps> = ({ setType, currentType }) => {
  const style = useTaskBarStyle();
  const { date } = useTime();

  const controlType = (value: number) => {
    if (currentType === value) setType(0);
    else setType(value);
  };

  return (
    <Box className={style.surface}>
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <Chip
          label={<Typography>{date.toLocaleDateString()}</Typography>}
          variant="filled"
          color="primary"
        />
      </Box>
      <Box className={style.groupBtn}>
        <MediaControl setType={controlType} />
      </Box>
      <Box
        className={style.groupBtn}
        sx={{ display: { xs: "none", md: "block" } }}
      >
        <IconButton onClick={() => controlType(1)} className={style.fadeBgBtn}>
          <PersonIcon />
        </IconButton>
        <IconButton onClick={() => controlType(2)} className={style.fadeBgBtn}>
          <MessageIcon />
        </IconButton>
        <IconButton onClick={() => controlType(3)} className={style.fadeBgBtn}>
          <SettingsIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default TaskBar;
