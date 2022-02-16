import { makeStyles } from "@mui/styles";

const useAppFeatureStyle = makeStyles({
  surface: {
    width: "100vw",
    height: "100vh",
  },
  header: {
    width: "100%",
    height: "10vh",
    position: "fixed",
  },
  body: {
    width: "100vw",
    height: "100vh",
  },
});

export default useAppFeatureStyle;
