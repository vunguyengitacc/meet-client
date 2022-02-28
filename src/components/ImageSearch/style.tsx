import { makeStyles } from "@mui/styles";

const useImageSearchStyle = makeStyles({
  form: {
    display: "flex",
    padding: "10px",
    gap: 10,
  },
  input: {
    padding: "5px",
    border: "2px solid #e3e3e3",
    borderRadius: "10px",
  },
  item: {
    borderRadius: "5px",
    width: "100%",
    height: "100px",
    boxSizing: "border-box",
  },
  chosenItem: {
    border: "5px solid #6c63ff",
  },
});

export default useImageSearchStyle;
