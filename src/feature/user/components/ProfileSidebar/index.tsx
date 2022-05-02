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

interface IProps {
  onNavigated?: () => void;
}

const ProfileSidebar: React.FC<IProps> = ({ onNavigated }) => {
  const style = useProfileSidebarStyle();

  return (
    <Box className={style.surface}>
      <Box display="flex" flexDirection="column" width="100%" gap="10px">
        <NavLink
          className={({ isActive }) =>
            `${style.link} ${isActive && style.activeLink}`
          }
          to="profile"
          onClick={onNavigated}
        >
          <PersonOutlineOutlinedIcon />
          Profile
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `${style.link} ${isActive && style.activeLink}`
          }
          to="calendar"
          onClick={onNavigated}
        >
          <CalendarTodayOutlinedIcon />
          Calendar
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `${style.link} ${isActive && style.activeLink}`
          }
          to="notification"
          onClick={onNavigated}
        >
          <NotificationsOutlinedIcon />
          Notification
        </NavLink>
      </Box>
    </Box>
  );
};

export default ProfileSidebar;
