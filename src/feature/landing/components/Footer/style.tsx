import { makeStyles } from "@mui/styles";

const useLandingFooterStyles = makeStyles({
  surfuce: { padding: "20px" },
  logo: {},
  info: {
    color: "white",
    display: "flex",
  },
  info__title: {
    height: "60px",
    lineHeight: "60px !important",
    fontSize: "20px !important",
  },
  info__detail: {
    color: "gray",
    fontStyle: "italic",
    paddingLeft: "10px",
    marginTop: "10px !important",
    textDecoration: "none",
  },
});

export default useLandingFooterStyles;
