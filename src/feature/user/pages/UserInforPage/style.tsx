import { makeStyles } from "@mui/styles";

const useUserInforStyle = makeStyles({
  surface: {
    width: "100%",
    height: "100%",
  },
  header: {
    height: "100px",
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
    backgroundColor: "#f8fafb",
    height: "calc( 100vh - 100px )",
    borderRadius: "20px 0 0 0",
    boxShadow: "inset 0px 0px 5px rgba(0,0,0,0.25)",
    boxSizing: "border-box",
    paddingTop: "4px",
  },
  detail: {
    height: "100%",
    padding: "20px 50px",
    display: "flex",
    flexDirection: "column",
    gap: "40px",
    overflowY: "scroll",
    boxSizing: "border-box",
  },
});

export default useUserInforStyle;
