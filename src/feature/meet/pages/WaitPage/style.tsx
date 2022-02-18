import { makeStyles } from "@mui/styles";

interface IProps {}

const useWaitPageStyle = makeStyles({
  surface: {
    width: "100%",
    height: "100%",
    display: "flex",
  },
  mediaCheckerField: {
    width: "55vw",
    paddingTop: "15vh",
    padding: "5%",
  },
  joinField: {
    paddingTop: "30vh",
    width: "45vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
  },
  joinBtn: {
    borderRadius: "20px !important",
    padding: "10px 50px 10px 50px !important",
  },
  video: {
    width: "100%",
    height: "50vh",
    backgroundColor: "#323232",
    borderRadius: "10px",
  },
  taskBtnGroup: {
    display: "flex",
    justifyContent: "center",
    gap: "5%",
    padding: "0",
  },
  taskBtn: {
    position: "absolute",
    width: "60px",
    borderRadius: "20vh !important",
    height: "60px",
    transform: "translate( 0 , -90px )",
  },
});

export default useWaitPageStyle;
