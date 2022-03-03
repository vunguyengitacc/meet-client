import { makeStyles } from "@mui/styles";

const useMeetsPageStyle = makeStyles({
  content: {
    boxSizing: "border-box",
    padding: "20px 50px",
    display: "flex",
    flexDirection: "column",
    gap: "40px",
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
    color: "#9d9d00b3",
  },
});

export default useMeetsPageStyle;
