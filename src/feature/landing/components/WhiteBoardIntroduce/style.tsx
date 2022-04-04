import { makeStyles } from "@mui/styles";

const useWhiteBoardIntroduceStyle = makeStyles({
  surface: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    textAlign: "center",
    padding: "20px",
  },
  content: {
    display: "flex",
  },
  introduce: {
    display: "flex",
    padding: "20px",
    width: "50%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize: "larger",
    fontWeight: 500,
  },
  image: {
    width: "50%",
    height: "100%",
  },
});

export default useWhiteBoardIntroduceStyle;
