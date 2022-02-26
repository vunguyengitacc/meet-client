import { makeStyles } from "@mui/styles";

const useUserFeatureStyle = makeStyles({
  surface: {
    width: "100vw",
    height: "100vh",
    overflowY: "scroll",
  },
  header: {
    position: "fixed",
    height: "70px",
    display: "flex",
    alignItems: "center",
    paddingLeft: "5%",
  },
  logo: {
    height: "80%",
    width: "70%",
  },
  body: {
    marginLeft: "10vw",
    width: "80vw",
    height: "100%",
    display: "flex",
  },
});

export default useUserFeatureStyle;
