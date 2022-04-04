import { Box, Button, Typography } from "@mui/material";
import { RootState } from "app/reduxStore";
import AppHeader from "components/AppHeader";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useLandingStyle from "./style";
import appImage from "static/assets/landing/app.png";
import SharingIntroduce from "./components/SharingIntroduce";
import WhiteBoardIntroduce from "./components/WhiteBoardIntroduce";

const LandingFeature = () => {
  const [blurNav, setBlurNav] = useState<boolean>(true);
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const navigator = useNavigate();
  const style = useLandingStyle({ isBlurNav: blurNav });

  const handleScroll = useCallback((e: Event) => {
    if (document.documentElement.scrollTop < 100) {
      setBlurNav(true);
    } else setBlurNav(false);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <Box className={style.surface}>
      <Box className={style.header}>
        <AppHeader />
      </Box>
      <Box className={style.startApp}>
        <Box className={style.sideBody}>
          <Typography variant="h2">Create your meeting</Typography>
          <Typography sx={{ fontWeight: 100 }} variant="h5" color="secondary">
            Easy and free service for you to create an meeting online. Create
            and share your room code or link to everyone.
          </Typography>
          <Button
            disableElevation
            variant="contained"
            style={{
              position: "static",
              padding: "20px ",
            }}
            onClick={() => navigator("/app")}
          >
            Getting started
          </Button>
        </Box>
        <Box width="50%" display="flex" alignItems="center">
          <img src={appImage} width="100%" />
        </Box>
      </Box>
      <Box className={style.introduceContained}>
        <SharingIntroduce />
      </Box>
      <Box className={style.introduceTransparent}>
        <WhiteBoardIntroduce />
      </Box>
      <Box className={style.footer}></Box>
    </Box>
  );
};

export default LandingFeature;
