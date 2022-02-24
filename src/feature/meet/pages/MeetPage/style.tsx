import { makeStyles } from "@mui/styles";

const useMeetPageStyle = makeStyles({
  surface: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#202020",
  },
  app: {
    width: "100vw",
    height: "90vh",
  },
  task: {
    width: "100vw",
    height: "10vh",
  },
});

export default useMeetPageStyle;
