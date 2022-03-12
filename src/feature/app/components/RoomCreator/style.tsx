import { makeStyles } from "@mui/styles";

const useRoomCreatorStyle = makeStyles({
  surface: {
    width: "100%",
    height: "100%",
    paddingTop: "40%",
    padding: "10%",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  menuCreatorItem: {
    display: "flex !important",
    gap: "20px",
    padding: "20px !important",
  },
  modal: {
    width: "600px",
    maxWidth: "80vw",
    maxHeight: "80vh",
    margin: "auto",
    borderRadius: "15px !important",
  },
});

export default useRoomCreatorStyle;
