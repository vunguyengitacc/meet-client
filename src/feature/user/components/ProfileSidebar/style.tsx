import { makeStyles } from "@mui/styles";

const useProfileSidebarStyle = makeStyles({
  surface: {
    width: "100%",
    height: "100%",
    paddingTop: "100px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxSizing: "border-box",
    gap: "20px",
  },
  avatar: {
    width: "40% !important",
    height: "auto !important",
  },
  link: {
    backgroundColor: "transparent !important",
    padding: "10px !important",
    textDecoration: "none",
    textAlign: "center",
    fontSize: "1.25rem",
    color: "#cfcfcf",
    fontWeight: 500,
  },
  activeLink: {
    color: "#4e4e4e !important",
    fontSize: "1.75rem !important",
    fontWeight: 700,
  },
});

export default useProfileSidebarStyle;
