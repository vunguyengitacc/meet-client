import { makeStyles } from "@mui/styles";

const useNotificationPageStyle = makeStyles({
  content: {
    boxSizing: "border-box",
    margin: "20px 50px",
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
  headerIcon: {
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    backgroundColor: "white",
    padding: "10px",
    borderRadius: "5px",
    color: "#ff0000b3",
  },
});

export default useNotificationPageStyle;
