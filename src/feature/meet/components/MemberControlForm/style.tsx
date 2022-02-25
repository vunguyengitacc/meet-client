import { makeStyles } from "@mui/styles";

const useMemberControlFormStyle = makeStyles({
  surface: {
    width: "100%",
    transition: "width 2s",
  },
  controlItemField: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px",
  },
});

export default useMemberControlFormStyle;
