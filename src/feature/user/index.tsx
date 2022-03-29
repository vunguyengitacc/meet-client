import { Box, Button, SwipeableDrawer } from "@mui/material";
import logo from "static/Logo.svg";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import ProfileSidebar from "./components/ProfileSidebar";
import useUserFeatureStyle from "./style";
import { useDispatch } from "react-redux";
import { AppDispatch } from "app/reduxStore";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { logout } from "feature/auth/authSlice";
import SquareButton from "components/CustomUI/SquareButton";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const UserFeature = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigator = useNavigate();
  const [openSidebar, setOpenSidebar] = React.useState<boolean>(false);
  const style = useUserFeatureStyle();
  const onCloseSidebar = () => {
    setOpenSidebar(false);
  };
  const onOpenSidebar = () => {
    setOpenSidebar(true);
  };
  return (
    <Box className={style.surface}>
      <Box className={style.mobileToogleBar}>
        <SquareButton onClick={() => setOpenSidebar((prev) => !prev)}>
          {!openSidebar ? <MenuOutlinedIcon /> : <CloseOutlinedIcon />}
        </SquareButton>
      </Box>
      <SwipeableDrawer
        open={openSidebar}
        onClose={onCloseSidebar}
        onOpen={onOpenSidebar}
      >
        <Box className={style.mobileNavigationBar}>
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
              <ProfileSidebar onNavigated={() => setOpenSidebar(false)} />
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
      </SwipeableDrawer>
      <Box className={style.content}>
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
    </Box>
  );
};

export default UserFeature;
