import { green, indigo, orange, purple, red } from "@mui/material/colors";
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
    blur: true;
  }
}

declare module "@mui/material/Chip" {
  interface ChipPropsVariantOverrides {
    blur: true;
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
          props: { variant: "blur", color: "success" },
          style: {
            color: green[500],
            backgroundColor: green[100],
          },
        },
        {
          props: { variant: "blur", color: "primary" },
          style: {
            color: indigo[500],
            backgroundColor: indigo[100],
          },
        },
        {
          props: { variant: "blur", color: "error" },
          style: {
            color: red[500],
            backgroundColor: red[100],
          },
        },
        {
          props: { variant: "blur", color: "warning" },
          style: {
            color: orange[500],
            backgroundColor: orange[100],
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
      variants: [
        {
          props: { variant: "blur", color: "success" },
          style: {
            color: green[500],
            backgroundColor: green[100],
          },
        },
        {
          props: { variant: "blur", color: "error" },
          style: {
            color: red[500],
            backgroundColor: red[100],
          },
        },
        {
          props: { variant: "blur", color: "warning" },
          style: {
            color: orange[500],
            backgroundColor: orange[100],
          },
        },
      ],
    },
  },
});

export default theme;
