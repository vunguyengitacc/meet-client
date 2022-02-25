import { makeStyles } from "@mui/styles";

const useTaskBarStyle = makeStyles({
  surface: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "5px",
    boxSizing: "border-box",
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
});

export default useTaskBarStyle;
