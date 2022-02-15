import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import useAuthStyle from "./style";

const AuthFeature = () => {
  const style = useAuthStyle();
  return (
    <Box className={style.surface}>
      auth
      <Box>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AuthFeature;
