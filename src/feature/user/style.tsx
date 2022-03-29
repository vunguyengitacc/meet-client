import { Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";

const useUserFeatureStyle = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      width: "100vw",
      height: "100vh",
      display: "flex",
    },
    surface: {},
    mobileToogleBar: {
      position: "fixed",
      zIndex: 999,
      width: "100vw",
      padding: "10px",
      display: "flex",
      justifyContent: "flex-end",
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
      boxSizing: "border-box",
    },
    mobileNavigationBar: {
      backgroundColor: "white",
      width: "80vw",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
    },
    navigationBar: {
      backgroundColor: "white",
      [theme.breakpoints.down("md")]: {
        display: "none",
      },
      [theme.breakpoints.up("md")]: {
        width: "20vw",
      },
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      boxShadow: "1px 2px #c9c9c9",
    },
    logo: {
      height: "50px",
      cursor: "pointer",
    },
    body: {
      [theme.breakpoints.down("md")]: {
        width: "100vw",
      },
      [theme.breakpoints.up("md")]: {
        width: "80vw",
      },
      height: "100%",
      display: "flex",
      flexDirection: "column",
      zIndex: 99,
      backgroundColor: "#f3f3f3",
    },
  })
);

export default useUserFeatureStyle;
