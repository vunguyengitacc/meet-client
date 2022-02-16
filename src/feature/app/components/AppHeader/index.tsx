import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Menu,
  Typography,
} from "@mui/material";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { AppDispatch, RootState } from "app/reduxStore";
import { logout } from "feature/auth/authSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useAppHeaderStyle from "./style";
import useTime from "hooks/useTime";
import { getDayOfWeek, getMonthString } from "utilities/dateUtils";

const AppHeader = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [subMenu1, setSubMenu1] = React.useState<boolean>(false);
  const [subMenu2, setSubMenu2] = React.useState<boolean>(false);
  const [subMenu3, setSubMenu3] = React.useState<boolean>(false);
  let { date } = useTime();

  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const dispatch = useDispatch<AppDispatch>();

  const style = useAppHeaderStyle();

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <Box className={style.surface}>
      <Box className={style.logoField}>
        <Typography variant="h4">LET'S MEET</Typography>
      </Box>
      <Box className={style.configField}>
        <Typography variant="h6" color="secondary">
          {`${date.getHours()} : ${date.getMinutes()} `} -{" "}
          {`${getDayOfWeek(date)}, ${date.getDate()} ${getMonthString(date)} `}
        </Typography>
        <IconButton onClick={handleClick}>
          <Avatar src={currentUser?.avatarURI} />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              boxSizing: "border-box",
              width: "80px",
              height: "258px",
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              borderRadius: "10px",
              mt: 1.5,
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <Box
            className={style.subMenuInfor}
            width={`${subMenu1 ? "180px" : "0px"}`}
          >
            <Typography className={style.desc}>My Profiles</Typography>
          </Box>
          <Box
            className={style.menuInforField}
            component="div"
            onMouseOver={() => setSubMenu1(true)}
            onMouseLeave={() => setSubMenu1(false)}
          >
            <IconButton>
              <PermIdentityIcon />
            </IconButton>
          </Box>
          <Box
            className={style.subMenuMeet}
            width={`${subMenu2 ? "180px" : "0px"}`}
          >
            <Typography className={style.desc}>My Meets</Typography>
          </Box>
          <Divider />
          <Box
            className={style.menuAllMeetField}
            component="div"
            onMouseOver={() => setSubMenu2(true)}
            onMouseLeave={() => setSubMenu2(false)}
          >
            <IconButton>
              <DashboardIcon />
            </IconButton>
          </Box>
          <Box
            className={style.subMenuLogout}
            width={`${subMenu3 ? "180px" : "0px"}`}
          >
            <Typography className={style.desc}>Log out</Typography>
          </Box>
          <Divider />
          <Box
            className={style.menuLogoutField}
            component="div"
            onMouseOver={() => setSubMenu3(true)}
            onMouseLeave={() => setSubMenu3(false)}
          >
            <IconButton onClick={logoutHandler}>
              <LogoutIcon />
            </IconButton>
          </Box>
        </Menu>
      </Box>
    </Box>
  );
};

export default AppHeader;
