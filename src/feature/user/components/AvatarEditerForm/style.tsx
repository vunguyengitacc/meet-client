import { makeStyles } from "@mui/styles";

const useAvatarEditerFormStyle = makeStyles({
  submitField: {
    display: "flex",
    paddingTop: "20px",
    justifyContent: "flex-end",
    gap: "10px",
  },
  avatar: {
    width: "100px !important",
    height: "100px !important",
  },
  label: {
    paddingLeft: "5px",
  },
  input: {
    padding: "5px 10px",
    border: "2px solid #afafaf",
    borderRadius: "10px",
  },
});

export default useAvatarEditerFormStyle;
