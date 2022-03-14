import { makeStyles } from "@mui/styles";

const useHeaderDrawToolStyle = makeStyles({
  surface: {
    padding: "10px 30px",
    backgroundColor: "white",
    boxSizing: "border-box",
    display: "flex",
    justifyContent: "space-between",
    height: "100%",
    width: "100vw",
    borderBottom: "1.25px solid #e5e5e5",
  },
  img: {
    height: "80%",
    cursor: "pointer",
  },
});

export default useHeaderDrawToolStyle;
