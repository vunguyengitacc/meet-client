import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import useWhiteBoardFeatureStyle from "./style";

const WhiteBoardFeature = () => {
  const style = useWhiteBoardFeatureStyle();
  return (
    <Box className={style.surface}>
      <Outlet />
    </Box>
  );
};

export default WhiteBoardFeature;
