import { makeStyles } from "@mui/styles";

const useSharingIntroduceStyle = makeStyles({
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
    flexGrow: 1,
  },
  slider: {
    padding: "20px",
    width: "50%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    justifyContent: "center",
  },
  sliderBox: {
    width: "100%",
    height: "80%",
    overflow: "hidden",
  },
  sliderImage: {
    height: "100%",
    borderRadius: "20px",
    overflow: "hidden",
    opacity: 1,
    transition: "opacity 2s",
  },
  sliderHideImage: {
    opacity: 0,
    transition: "opacity 2s",
  },
  introduce: {
    display: "flex",
    padding: "20px",
    width: "50%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default useSharingIntroduceStyle;
