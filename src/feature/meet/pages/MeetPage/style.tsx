import { makeStyles } from "@mui/styles";

const useMeetPageStyle = makeStyles({
  surface: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#363636",
  },
  app: {
    width: "100vw",
    height: "85vh",
  },
  task: {
    width: "100vw",
    height: "15vh",
  },
});

export default useMeetPageStyle;
