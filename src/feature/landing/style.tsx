import { Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";

interface IProps {
  isBlurNav: boolean;
}

const useLandingStyle = makeStyles((theme: Theme) =>
  createStyles({
    surface: {
      display: "flex",
      flexDirection: "column",
      gap: "50px",
      maxWidth: "100%",
    },
    header: (props: IProps) => ({
      width: "100%",
      height: "70px",
      position: "fixed",
      padding: "0 10px 10px 0",
      boxSizing: "border-box",
      backgroundColor: props.isBlurNav ? "transparent" : "white",
      boxShadow: props.isBlurNav ? "none" : "0 4px 8px #d7d7d7",
      transition: "box-shadow 0.3s ease-in-out",
    }),
    startApp: {
      width: "100%",
      height: "100vh",
      padding: "5%",
      paddingTop: "0",
      boxSizing: "border-box",
      display: "flex",
    },
    startApp__image: {
      width: "50%",
      display: "flex",
      alignItems: "center",
      [theme.breakpoints.down("md")]: {
        display: "none",
      },
    },
    startApp__sideBody: {
      width: "50%",
      alignItems: "center",
      [theme.breakpoints.down("md")]: {
        paddingRight: "0",
        width: "auto",
      },
      height: "100%",
      paddingTop: "30vh",
      paddingRight: "10%",
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      gap: 20,
    },
    introduceContained: {
      width: "100%",
      height: "auto",
      backgroundColor: "#6c63ffa6",
    },
    introduceTransparent: {
      width: "100%",
      height: "auto",
    },
    footer: {
      width: "100%",
      height: "auto",
      backgroundColor: "#444343",
    },
  })
);

export default useLandingStyle;
