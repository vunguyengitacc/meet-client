import { makeStyles } from "@mui/styles";

const useScheduleBoxStyle = makeStyles({
  surface: {
    height: "100%",
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 2px 10px",
    borderRadius: "10px !important",
  },
  toolbar: {
    width: "100%",
  },
  schedule: {
    boxShadow: "none !important",
    borderRadius: "10px !important",
  },
});

export default useScheduleBoxStyle;
