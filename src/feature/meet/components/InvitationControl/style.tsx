import { makeStyles } from "@mui/styles";

const useInvitationControlStyle = makeStyles({
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
    flexGrow: 1,
    padding: " 5px 10px",
    border: "2px solid #dddddd",
    borderRadius: "10px",
  },
  searchResults: {
    maxHeight: "50vh",
    overflowY: "scroll",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  searchItem: {
    padding: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "transparent",
    borderRadius: "5px",
    "&:hover": {
      backgroundColor: "#e5e5e5",
    },
  },
});

export default useInvitationControlStyle;
