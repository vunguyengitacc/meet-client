import { Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";

const useSharingIntroduceStyle = makeStyles((theme: Theme) =>
  createStyles({
    surface: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
    },
    header: {
      textAlign: "center",
      padding: "20px",
    },
    content: {
      display: "flex",
      flexGrow: 1,
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
      },
    },
    slider: {
      padding: "20px",
      width: "50%",
      [theme.breakpoints.down("sm")]: {
        width: "auto",
      },
      height: "100%",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      justifyContent: "center",
    },
    sliderBox: {
      width: "100%",
      height: "60vh",
      overflow: "hidden",
    },
    sliderImage: {
      height: "100%",
      borderRadius: "20px",
      overflow: "hidden",
      opacity: 1,
      transition: "opacity 2s",
    },
    sliderHideImage: {
      opacity: 0,
      transition: "opacity 2s",
    },
    introduce: {
      display: "flex",
      padding: "20px",
      width: "50%",
      [theme.breakpoints.down("sm")]: {
        width: "auto",
      },
      height: "auto",
      justifyContent: "center",
      textAlign: "center",
      fontSize: "larger",
      fontWeight: 500,
      alignItems: "center",
    },
  })
);

export default useSharingIntroduceStyle;
