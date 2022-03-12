import { makeStyles } from "@mui/styles";

const useMeetItemStyle = makeStyles({
  surface: {
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
    border: "solid 0.5px #525252",
    borderRadius: "5px",
    backgroundColor: "#464646",
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
    height: "100px !important",
    width: "100px !important",
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
  floatingToolbar: {
    backgroundColor: "#000000a3",
    padding: "10px",
    position: "absolute",
    borderRadius: "20px",
  },
});

export default useMeetItemStyle;
