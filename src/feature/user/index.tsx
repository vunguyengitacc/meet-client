import { Box, Button } from "@mui/material";
import logo from "static/Logo.svg";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import ProfileSidebar from "./components/ProfileSidebar";
import useUserFeatureStyle from "./style";
import { useDispatch } from "react-redux";
import { AppDispatch } from "app/reduxStore";
import { logout } from "feature/auth/authSlice";

const UserFeature = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigator = useNavigate();
  const style = useUserFeatureStyle();
  return (
    <Box className={style.surface}>
      <Box className={style.navigationBar}>
        <Box padding="20px" display="flex" justifyContent="center">
          <img
            className={style.logo}
            onClick={() => navigator("/app")}
            src={logo}
          />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          flexGrow="1"
          justifyContent="space-between"
        >
          <Box padding="20px">
            <ProfileSidebar />
          </Box>
          <Box padding="20px">
            <Button
              fullWidth
              variant="outlined"
              color="error"
              onClick={() => dispatch(logout())}
            >
              Logout
            </Button>
          </Box>
        </Box>
      </Box>
      <Box className={style.body}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default UserFeature;
