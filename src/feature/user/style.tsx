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
    // borderRight: "0.01px solid #cbcbcb",
    boxShadow: "1px 2px #c9c9c9",
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
