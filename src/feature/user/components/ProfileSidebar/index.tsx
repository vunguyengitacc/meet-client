import { Box } from "@mui/material";
import { RootState } from "app/reduxStore";
import { IUser } from "model/User";
import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import useProfileSidebarStyle from "./style";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";

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
          <PersonOutlineOutlinedIcon />
          Profile
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `${style.link} ${isActive && style.activeLink}`
          }
          to="calendar"
        >
          <CalendarTodayOutlinedIcon />
          Calendar
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `${style.link} ${isActive && style.activeLink}`
          }
          to="history"
        >
          <HistoryOutlinedIcon />
          History
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `${style.link} ${isActive && style.activeLink}`
          }
          to="notification"
        >
          <NotificationsOutlinedIcon />
          Notification
        </NavLink>
      </Box>
    </Box>
  );
};

export default ProfileSidebar;
