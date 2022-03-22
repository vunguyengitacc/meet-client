import { Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";

const useCalendarPageStyle = makeStyles((theme: Theme) =>
  createStyles({
    surface: {
      width: "100%",
      height: "100vh",
      overflowY: "scroll",
    },
    content: {
      boxSizing: "border-box",
      padding: "20px 50px",
      [theme.breakpoints.down("md")]: { padding: "10px" },
      display: "flex",
      flexDirection: "column",
      gap: "40px",
    },
    header: {
      [theme.breakpoints.down("md")]: { margin: "10px" },
      margin: "20px 50px",
      display: "flex",
      alignItems: "center",
      boxSizing: "border-box",
      gap: "20px",
    },
    headerIcon: {
      boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
      backgroundColor: "white",
      padding: "10px",
      borderRadius: "5px",
      color: "#008989a8",
    },
  })
);

export default useCalendarPageStyle;
