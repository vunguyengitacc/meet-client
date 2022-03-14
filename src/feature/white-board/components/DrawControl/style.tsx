import { makeStyles } from "@mui/styles";

const useDrawControlStyle = makeStyles({
  surface: {
    position: "fixed",
    marginTop: "100px",
    marginLeft: "20px",
    display: "flex",
    gap: 10,
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    padding: "5px",
    flexDirection: "column",
    borderRadius: "10px",
    backgroundColor: "white",
    opacity: "0.89",
  },
  menu: {
    padding: "10px",
    backgroundColor: "white",
  },
});

export default useDrawControlStyle;
