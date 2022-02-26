import { makeStyles } from "@mui/styles";

const useUserInforStyle = makeStyles({
  surface: {
    paddingTop: "100px",
    display: "flex",
    gap: "40px",
    flexDirection: "column",
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
});

export default useUserInforStyle;
