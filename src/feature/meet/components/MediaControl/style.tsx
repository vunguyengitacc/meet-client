import { makeStyles } from "@mui/styles";

const useMediaControlStyle = makeStyles({
  surface: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  roundBtn: {
    borderRadius: "10px !important",
    width: "40px",
    height: "40px",
  },
  fadeBgBtn: {
    color: "white !important",
    width: "40px",
    height: "40px",
  },
});

export default useMediaControlStyle;
