import { makeStyles } from "@mui/styles";

const useWhiteBoardControlStyle = makeStyles({
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
  frmBox: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    overflowY: "scroll",
  },
  boardItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px",
    marginBottom: "10px",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    borderRadius: "10px",
    "&:hover": {
      backgroundColor: "#a5a5a5",
    },
  },
});

export default useWhiteBoardControlStyle;
