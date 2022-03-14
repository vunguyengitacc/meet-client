import { Avatar, Box, IconButton } from "@mui/material";
import { RootState } from "app/reduxStore";
import { IUser } from "model/User";
import React from "react";
import { useSelector } from "react-redux";
import Logo from "static/Logo.svg";
import useHeaderDrawToolStyle from "./style";
import { useNavigate } from "react-router-dom";

const HeaderDrawTool = () => {
  const navigator = useNavigate();
  const currentUser = useSelector(
    (state: RootState) => state.auth.currentUser
  ) as IUser;
  const style = useHeaderDrawToolStyle();
  return (
    <Box className={style.surface}>
      <img className={style.img} src={Logo} onClick={() => navigator("/app")} />
      <IconButton onClick={() => navigator("/user/profile")}>
        <Avatar src={currentUser.avatarURI} />
      </IconButton>
    </Box>
  );
};

export default HeaderDrawTool;
