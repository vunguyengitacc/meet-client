import { makeStyles } from "@mui/styles";

const useMediaControlStyle = makeStyles({
  surface: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  roundBtn: {
    borderRadius: "50% !important",
    width: "60px",
    height: "60px",
  },
  fadeBgBtn: {
    color: "white !important",
    width: "60px",
    height: "60px",
  },
});

export default useMediaControlStyle;
