import { makeStyles } from "@mui/styles";

const useDrawControlStyle = makeStyles({
  surface: {
    position: "fixed",
    bottom: "20px",
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  box: {
    backgroundColor: "white",
    padding: "10px",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    borderRadius: "10px",
    display: "flex",
    gap: 10,
  },
});

export default useDrawControlStyle;
