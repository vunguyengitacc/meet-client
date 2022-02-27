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
    width: "100%",
    cursor: "pointer",
  },
  body: {
    marginLeft: "10vw",
    width: "80vw",
    height: "100%",
    display: "flex",
  },
  sidebar: {
    width: "20%",
    height: "100vh",
    position: "fixed",
  },
  content: {
    width: "80%",
    marginLeft: "30%",
  },
});

export default useUserFeatureStyle;
