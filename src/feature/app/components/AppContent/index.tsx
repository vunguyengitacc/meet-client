import { Box } from "@mui/material";
import React from "react";
import RoomCreator from "../RoomCreator";
import useAppContentStyle from "./style";
import appPage from "static/assets/appPage.png";

const AppContent = () => {
  const style = useAppContentStyle();
  return (
    <Box className={style.surface}>
      <Box className={style.app}>
        <RoomCreator />
      </Box>
      <Box className={style.desc}>
        <img src={appPage} className={style.image} />
      </Box>
    </Box>
  );
};

export default AppContent;
