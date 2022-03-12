import { makeStyles } from "@mui/styles";

const useRequestControlStyle = makeStyles({
  surface: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    padding: "20px",
  },
  headerField: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchInput: {
    padding: "5px 10px",
    border: "2px solid #dddddd",
    borderRadius: "10px",
  },
  nonText: {
    display: "flex",
    justifyContent: "center",
    fontWeight: "900 !important",
    color: "#afafaf",
  },
});

export default useRequestControlStyle;
