import { makeStyles } from "@mui/styles";

const useNotificationItemStyle = makeStyles({
  surface: {
    width: "100%",
    display: "flex",
    backgroundColor: "white",
    padding: "20px",
    boxSizing: "border-box",
  },
  authorField: {
    width: "10%",
  },
  contentField: {
    width: "70%",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  label: {},
  dateField: {
    width: "20%",
  },
});
export default useNotificationItemStyle;
