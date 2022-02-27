import { Avatar, Box } from "@mui/material";
import { IconButton } from "@mui/material";
import { RootState } from "app/reduxStore";
import React from "react";
import { useSelector } from "react-redux";
import useAppHeaderStyle from "./style";
import logo from "static/Logo.svg";
import { useNavigate } from "react-router-dom";

const AppHeader = () => {
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);

  const navigator = useNavigate();

  const style = useAppHeaderStyle();

  return (
    <Box className={style.surface}>
      <Box className={style.logoField}>
        <img
          className={style.logo}
          src={logo}
          onClick={() => navigator("/app")}
        />
      </Box>
      <Box className={style.configField}>
        <IconButton onClick={() => navigator("/user/profile")}>
          <Avatar src={currentUser?.avatarURI} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default AppHeader;
