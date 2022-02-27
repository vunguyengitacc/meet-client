import { makeStyles } from "@mui/styles";

const useCalendarPageStyle = makeStyles({
  header: {
    height: "100px",
  },
  content: {
    backgroundColor: "#f8fafb",
    height: "calc( 100vh - 100px )",
    borderRadius: "20px 0 0 0",
    boxShadow: "inset 0px 0px 5px rgba(0,0,0,0.25)",
    boxSizing: "border-box",
    paddingTop: "4px",
  },
  detail: {
    height: "100%",
    padding: "20px 50px",
    display: "flex",
    flexDirection: "column",
    gap: "40px",
    overflowY: "scroll",
    boxSizing: "border-box",
  },
});

export default useCalendarPageStyle;
