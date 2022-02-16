import { Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";

const useLoginPageStyle = makeStyles((theme: Theme) =>
  createStyles({
    surface: {
      boxSizing: "border-box",
      height: "100%",
      paddingTop: "10vh",
      [theme.breakpoints.down("md")]: {
        width: "80%",
        marginLeft: "10%",
      },
      [theme.breakpoints.up("md")]: {
        width: "70%",
        marginLeft: "15%",
      },
    },
    form: {
      width: "100%",
      marginTop: "20px",
    },
    inputField: {
      backgroundColor: "#edf2f5",
      padding: "20px 15px",
      borderRadius: "10px",
    },
    submitBtn: {
      margin: "20px 0 20px !important",
      padding: "20px 15px !important",
      borderRadius: "10px",
    },
    link: {
      textDecoration: "none",
      "&:hover": {
        "&:before": {
          opacity: "0.3",
          width: "100px",
        },
      },
      "&::before": {
        width: "0px",
        height: "10px",
        content: `" a"`,
        color: "transparent",
        position: "absolute",
        transform: "translate(0, 15px)",
        backgroundColor: "#6c63ff",
        opacity: "0.15",
        transition: "width 1s",
      },
    },
  })
);

export default useLoginPageStyle;
