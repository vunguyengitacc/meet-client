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
    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
    zIndex: 100,
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
    zIndex: 99,
  },
});

export default useUserFeatureStyle;
