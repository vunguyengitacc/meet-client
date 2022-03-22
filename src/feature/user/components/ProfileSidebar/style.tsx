import { makeStyles } from "@mui/styles";

const useProfileSidebarStyle = makeStyles({
  surface: {
    width: "100%",
    height: "100%",
    display: "flex",
    boxSizing: "border-box",
    gap: "20px",
  },
  avatar: {
    width: "40% !important",
    height: "auto !important",
  },
  link: {
    display: "flex",
    backgroundColor: "transparent !important",
    padding: "10px !important",
    textDecoration: "none",
    textAlign: "center",
    fontSize: "1.25rem",
    color: "#cfcfcf",
    fontWeight: 700,
    alignItems: "center",
    gap: "10px",
    borderRadius: "10px",
  },
  activeLink: {
    backgroundColor: "#4b45b221 !important",
    color: "#4b45b27a",
  },
});

export default useProfileSidebarStyle;
