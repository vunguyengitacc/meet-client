import { makeStyles } from "@mui/styles";

const useChatBoxStyle = makeStyles({
  surface: {
    width: "100%",
    height: "100%",
    padding: "10px",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  headerField: {
    width: "100%",
    height: "auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxSizing: "border-box",
  },
  controlField: {},
  controlTask: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: {
    color: "#818181",
  },
  tipField: {
    width: "100%",
    height: "auto",
    boxSizing: "border-box",
    backgroundColor: "#f5f5f5",
    borderRadius: "10px",
    padding: "10px",
  },
  tip: {
    color: "#c1c1c1",
  },
  messageBox: {
    flexGrow: 1,
    overflowY: "scroll",
  },
  sendForm: {
    backgroundColor: "#e5e5e5",
    padding: "10px",
    display: "flex",
    borderRadius: "20px",
  },
  msgInput: {
    flexGrow: 1,
  },
});

export default useChatBoxStyle;
