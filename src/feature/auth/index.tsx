import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import useAuthStyle from "./style";
import loginImage from "static/login-image.svg";

const AuthFeature = () => {
  const style = useAuthStyle();

  return (
    <Box className={style.surface}>
      <Box className={style.imageField}>
        <img className={style.image} src={loginImage} />
      </Box>
      <Box className={style.formField}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AuthFeature;
