import { makeStyles } from "@mui/styles";

const useMemberListBoxStyle = makeStyles({
  surface: {
    width: "100%",
    height: "100%",
    padding: "10px",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  controlField: {
    display: "flex",
    gap: "10px",
    padding: "10px",
  },
  controlItem: {
    display: "flex",
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    height: "75px",
  },
  controlBtn: {
    width: "100%",
    height: "100%",
  },
  headerField: {
    width: "100%",
    height: "auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxSizing: "border-box",
  },
  header: { color: "#818181" },
  filterField: {},
  filterInput: {
    padding: "10px",
    border: "2px solid #dddddd",
    borderRadius: "10px",
    "&:focus": { border: "2px solid blue" },
  },
  listField: {
    flexGrow: 1,
    overflowY: "scroll",
    display: "flex",
    gap: "15px",
    flexDirection: "column",
  },
  modalField: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "10vh",
  },
  formField: {
    width: "600px",
    maxWidth: "80vw",
  },
});

export default useMemberListBoxStyle;
