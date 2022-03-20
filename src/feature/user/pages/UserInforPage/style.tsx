import { makeStyles } from "@mui/styles";

const useUserInforStyle = makeStyles({
  surface: {
    width: "100%",
    height: "100vh",
    overflowY: "scroll",
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
    color: "#00bb17d1",
  },
  form: {
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 2px 10px",
  },
  submitField: {
    display: "flex",
    paddingTop: "20px",
    justifyContent: "flex-end",
    gap: "10px",
  },
  avatar: {
    width: "70px !important",
    height: "70px !important",
  },
  label: {
    paddingLeft: "5px",
  },
  input: {
    padding: "5px 10px",
    border: "2px solid #afafaf",
    borderRadius: "10px",
  },
  content: {
    boxSizing: "border-box",
    padding: "20px 50px",
    display: "flex",
    flexDirection: "column",
    gap: "40px",
  },
});

export default useUserInforStyle;
