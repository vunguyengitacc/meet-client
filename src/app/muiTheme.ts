import { green, red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    disable: Palette["primary"];
  }
  interface PaletteOptions {
    disable?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    disable: true;
  }
  interface ButtonPropsVariantOverrides {
    fade: true;
  }
}

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
    disable: {
      main: "#5a5656",
    },
  },
  components: {
    MuiInputBase: {
      styleOverrides: {},
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
        },
      },
      variants: [
        {
          props: { variant: "fade", color: "success" },
          style: {
            color: green[500],
            backgroundColor: green[100],
          },
        },
        {
          props: { variant: "fade", color: "error" },
          style: {
            color: red[500],
            backgroundColor: red[100],
          },
        },
      ],
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
        },
      },
    },
  },
});

export default theme;
