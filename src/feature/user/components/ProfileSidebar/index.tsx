import { Avatar, Box, ButtonBase, Chip, Typography } from "@mui/material";
import { RootState } from "app/reduxStore";
import { IUser } from "model/User";
import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import useProfileSidebarStyle from "./style";

const ProfileSidebar = () => {
  const currentUser = useSelector(
    (state: RootState) => state.auth.currentUser
  ) as IUser;

  const style = useProfileSidebarStyle();

  return (
    <Box className={style.surface}>
      <Box display="flex" flexDirection="column" width="80%">
        <NavLink
          className={({ isActive }) =>
            `${style.link} ${isActive && style.activeLink}`
          }
          to="profile"
        >
          Profile
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `${style.link} ${isActive && style.activeLink}`
          }
          to="calendar"
        >
          Calendar
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `${style.link} ${isActive && style.activeLink}`
          }
          to="history"
        >
          History
        </NavLink>
      </Box>
    </Box>
  );
};

export default ProfileSidebar;
