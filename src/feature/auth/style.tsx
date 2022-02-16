import { createStyles, makeStyles } from "@mui/styles";
import { Theme } from "@mui/system";

const useAuthStyle = makeStyles((theme: Theme) =>
  createStyles({
    surface: {
      width: "100vw",
      height: "100vh",
      display: "flex",
    },
    imageField: {
      height: "100%",
      display: "flex",
      boxSizing: "border-box",
      justifyContent: "center",
      alignItems: "flex-start",
      paddingTop: "10vh",
      [theme.breakpoints.down("lg")]: {
        width: "0vw",
      },
      [theme.breakpoints.between("md", "lg")]: {
        width: "40vw",
      },
      [theme.breakpoints.up("lg")]: {
        width: "50vw",
      },
    },
    image: {
      maxWidth: "80%",
      height: "auto",
    },
    formField: {
      height: "100%",
      [theme.breakpoints.down("lg")]: {
        width: "100vw",
      },
      [theme.breakpoints.between("md", "lg")]: {
        width: "60vw",
      },
      [theme.breakpoints.up("lg")]: {
        width: "50vw",
      },
    },
  })
);

export default useAuthStyle;
