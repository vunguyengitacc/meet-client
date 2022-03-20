import { makeStyles } from "@mui/styles";

const useNotificationPageStyle = makeStyles({
  surface: {
    maxHeight: "100vh",
    overflowY: "scroll",
  },
  content: {
    boxSizing: "border-box",
    margin: "40px 50px",
    display: "flex",
    flexDirection: "column",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 2px 10px",
  },
  header: {
    margin: "20px 50px",
    display: "flex",
    alignItems: "center",
    boxSizing: "border-box",
    gap: "20px",
  },
  defaultContent: {
    backgroundColor: "white",
    fontWeight: 500,
    textAlign: "center",
    padding: "10px",
    color: "gray",
    fontSize: "1.2rem",
  },
  headerIcon: {
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    backgroundColor: "white",
    padding: "10px",
    borderRadius: "5px",
    color: "#ff0000b3",
  },
});

export default useNotificationPageStyle;
