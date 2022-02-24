import { makeStyles } from "@mui/styles";

const useMeetItemStyle = makeStyles({
  surface: {
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
    border: "solid 0.5px #525252",
    borderRadius: "5px",
  },
  member: {
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    height: "40% !important",
    width: "auto !important",
  },
  video: {
    maxWidth: "95%",
    maxHeight: "100%",
    width: "95%",
  },
  floatingTitle: {
    position: "absolute",
    transform: "translate(20px, -40px)",
  },
  floatingGroup: {
    position: "absolute",
  },
});

export default useMeetItemStyle;
