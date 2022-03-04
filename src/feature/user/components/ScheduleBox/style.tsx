import { makeStyles } from "@mui/styles";

const useScheduleBoxStyle = makeStyles({
  surface: {
    height: "100%",
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 2px 10px",
  },
  toolbar: {
    width: "100%",
  },
  schedule: {
    boxShadow: "none !important",
  },
});

export default useScheduleBoxStyle;
