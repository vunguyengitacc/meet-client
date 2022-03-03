import { makeStyles } from "@mui/styles";

const useRoomCreatorModalStyle = makeStyles({
  surface: {
    width: "100%",
  },
  header: {
    display: "flex",
    padding: "15px",
    justifyContent: "space-between",
    alignItems: "center",
  },
  form: {
    padding: "30px",
    display: "flex",
    flexDirection: "column",
    gap: "30px",
  },
  formLbl: {
    width: "40%",
  },
  submit: {
    padding: "15px",
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
  },
  closeBtn: {
    minWidth: "auto !important",
    padding: "5px 5px !important",
  },
});

export default useRoomCreatorModalStyle;
