import { purple } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    subtitle1: {
      fontWeight: 100,
    },
  },
  palette: {
    primary: {
      main: "#6c63ff",
    },
    secondary: {
      main: "#b3b3b3",
    },
  },
  components: {
    MuiInputBase: {
      styleOverrides: {},
    },
  },
});

export default theme;
