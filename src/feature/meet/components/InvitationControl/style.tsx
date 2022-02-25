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
    padding: "10px",
    border: "2px solid #dddddd",
    borderRadius: "10px",
  },
});

export default useInvitationControlStyle;
