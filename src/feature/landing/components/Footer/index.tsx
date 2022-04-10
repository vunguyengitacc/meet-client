import { Box, Grid, Typography } from "@mui/material";
import useLandingFooterStyles from "./style";
import logo from "static/Logo.svg";

function Footer() {
  const style = useLandingFooterStyles();
  return (
    <Grid container spacing={2} className={style.surfuce}>
      <Grid item xs={12} sm={12} md={4} className={style.logo}>
        <img src={logo} />
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        className={style.info}
        sx={{ flexDirection: "column" }}
      >
        <Typography className={style.info__title}>We provide</Typography>
        <a className={style.info__detail} href="#media">
          Webcam sharing
        </a>
        <a className={style.info__detail} href="#media">
          Micro sharing
        </a>
        <a className={style.info__detail} href="#media">
          Screen sharing
        </a>
        <a className={style.info__detail} href="#whiteboard">
          White board
        </a>
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        className={style.info}
        sx={{ flexDirection: "column" }}
      >
        <Typography className={style.info__title}>Contact us</Typography>
        <Typography className={style.info__detail}>
          ngha.vu.dev@gmail.com
        </Typography>
        <Typography className={style.info__detail}>
          (+84) 326 991 801
        </Typography>
        <Typography className={style.info__detail}>
          Distric 9, Thu Duc City, HCM City
        </Typography>
      </Grid>
    </Grid>
  );
}

export default Footer;
