import { Avatar, Badge, Box, Button } from "@mui/material";
import { IconButton } from "@mui/material";
import { RootState } from "app/reduxStore";
import { useSelector } from "react-redux";
import useAppHeaderStyle from "./style";
import logo from "static/Logo.svg";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNavigate } from "react-router-dom";

const AppHeader = () => {
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);

  const navigator = useNavigate();

  const style = useAppHeaderStyle();

  return (
    <Box className={style.surface}>
      <Box className={style.logoField}>
        <img className={style.logo} src={logo} onClick={() => navigator("/")} />
      </Box>
      <Box className={style.configField}>
        {currentUser ? (
          <>
            <IconButton onClick={() => navigator("/user/notification")}>
              <Badge
                color="error"
                badgeContent={currentUser.notifications?.length}
              >
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton onClick={() => navigator("/user/profile")}>
              <Avatar src={currentUser.avatarURI} />
            </IconButton>
          </>
        ) : (
          <>
            <Button onClick={() => navigator("/auth/login")}>Login</Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default AppHeader;
