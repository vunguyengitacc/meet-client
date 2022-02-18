import { Box } from "@mui/material";
import React from "react";
import RoomCreator from "../RoomCreator";
import useAppContentStyle from "./style";

const AppContent = () => {
  const style = useAppContentStyle();
  return (
    <Box className={style.surface}>
      <Box className={style.app}>
        <RoomCreator />
      </Box>
      <Box className={style.desc}></Box>
    </Box>
  );
};

export default AppContent;
