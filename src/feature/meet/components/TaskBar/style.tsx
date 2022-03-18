import { Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";

const useTaskBarStyle = makeStyles((theme: Theme) =>
  createStyles({
    surface: {
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "5px",
      boxSizing: "border-box",
      [theme.breakpoints.down("md")]: {
        justifyContent: "center",
      },
    },
    roundBtn: {
      borderRadius: "50% !important",
      width: "60px",
      height: "60px",
    },
    groupBtn: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    fadeBgBtn: {
      color: "white !important",
      width: "60px",
      height: "60px",
    },
  })
);

export default useTaskBarStyle;
