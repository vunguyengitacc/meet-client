import { Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";

const useAppContentStyle = makeStyles((theme: Theme) =>
  createStyles({
    surface: {
      width: "100%",
      height: "100%",
      display: "flex",
    },
    app: {
      width: "50%",
      height: "100%",
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
    },
    desc: {
      width: "50%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      padding: "20px",
      boxSizing: "border-box",
      [theme.breakpoints.down("md")]: {
        width: "0%",
      },
    },
    image: {
      width: "100%",
    },
  })
);

export default useAppContentStyle;
