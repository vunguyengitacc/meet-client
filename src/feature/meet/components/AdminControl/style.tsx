import { makeStyles } from "@mui/styles";

const useAdminControlStyle = makeStyles({
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
});

export default useAdminControlStyle;
