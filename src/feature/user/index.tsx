import { Box } from "@mui/material";
import logo from "static/Logo.svg";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import ProfileSidebar from "./components/ProfileSidebar";
import useUserFeatureStyle from "./style";

const UserFeature = () => {
  const navigator = useNavigate();
  const style = useUserFeatureStyle();
  return (
    <Box className={style.surface}>
      <Box className={style.header}>
        <img
          className={style.logo}
          onClick={() => navigator("/app")}
          src={logo}
        />
      </Box>
      <Box className={style.body}>
        <Box width="35%" height="100vh">
          <ProfileSidebar />
        </Box>
        <Box width="65%" height="100vh">
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default UserFeature;
