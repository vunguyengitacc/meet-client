import { makeStyles } from "@mui/styles";

const usePasswordEditerFormStyle = makeStyles({
  submitField: {
    display: "flex",
    paddingTop: "20px",
    justifyContent: "flex-end",
    gap: "10px",
  },
  avatar: {
    width: "70px !important",
    height: "70px !important",
  },
  label: {
    paddingLeft: "5px",
  },
  input: {
    padding: "5px 10px",
    border: "2px solid #afafaf",
    borderRadius: "10px",
  },
  errInput: {
    border: "2px solid #d32f2f !important",
  },
});

export default usePasswordEditerFormStyle;
