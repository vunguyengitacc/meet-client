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
  frm: {
    display: "flex",
    gap: 10,
  },
  nameField: {
    height: "100%",
    padding: "20px",
    border: "2px solid #6c63ff !important",
    borderRadius: "10px",
    color: "gray !important",
    fontWeight: 500,
  },
  menu: {
    padding: "5px",
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
});

export default useHeaderDrawToolStyle;
