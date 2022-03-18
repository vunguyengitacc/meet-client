import { makeStyles } from "@mui/styles";

const useMenuSelectItemStyle = makeStyles({
  surface: {
    padding: "20px",
    cursor: "pointer",
    borderRadius: "10px",
    "&:hover": {
      backgroundColor: "#d5d5d5",
    },
    display: "flex",
    gap: "15px",
    alignItems: "center",
  },
  selected: {
    backgroundColor: "#ebebeb",
  },
  text: {},
});

export default useMenuSelectItemStyle;
