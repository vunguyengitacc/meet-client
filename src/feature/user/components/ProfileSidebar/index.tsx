import { Box } from "@mui/material";
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
      <Box display="flex" flexDirection="column" width="100%" gap="10px">
        <NavLink
          className={({ isActive }) =>
            `${style.link} ${isActive && style.activeLink}`
          }
          to="profile"
        >
          {/* <PersonOutlineIcon /> */}
          Profile
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `${style.link} ${isActive && style.activeLink}`
          }
          to="calendar"
        >
          {/* <TodayIcon /> */}
          Calendar
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `${style.link} ${isActive && style.activeLink}`
          }
          to="history"
        >
          {/* <HistoryIcon /> */}
          History
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `${style.link} ${isActive && style.activeLink}`
          }
          to="notification"
        >
          {/* <HistoryIcon /> */}
          Notification
        </NavLink>
      </Box>
    </Box>
  );
};

export default ProfileSidebar;
