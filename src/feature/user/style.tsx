import { makeStyles } from "@mui/styles";

const useUserFeatureStyle = makeStyles({
  surface: {
    width: "100vw",
    height: "100vh",
    display: "flex",
  },
  navigationBar: {
    backgroundColor: "white",
    width: "20vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  logo: {
    height: "50px",
    cursor: "pointer",
  },
  body: {
    width: "80vw",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
  },
});

export default useUserFeatureStyle;
