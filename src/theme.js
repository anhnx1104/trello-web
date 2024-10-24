import { deepOrange, teal, cyan, orange } from "@mui/material/colors";
import { experimental_extendTheme as extendTheme } from "@mui/material/styles";

// Create a theme instance.

const theme = extendTheme({
  trelloCustom: {
    appBarHeight: "58px",
    boardBarHeight: "60px",
  },
  colorSchemes: {
    // light: {
    //   palette: {
    //     primary: teal,
    //     secondary: deepOrange,
    //   },
    //   //   spacing: (factor) => `${0.25 * factor}rem`,
    // },
    // dark: {
    //   palette: {
    //     primary: cyan,
    //     secondary: orange,
    //   },
    //   //   spacing: (factor) => `${0.25 * factor}rem`,
    // },
  },
  components: {
    // Name of the component

    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          textTransform: "none",
          borderWidth: "0.5px",
          "&:hover": {
            borderWidth: "0.5px",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        // Name of the slot
        root: ({ theme }) => {
          return {
            color: theme.palette.primary.main,
            fontSize: "0.875rem",
          };
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        // Name of the slot
        root: ({ theme }) => {
          // Some CSS
          return {
            // color: theme.palette.primary.main,
            fontSize: "0.875rem",

            // "&:hover": {
            //   ".MuiOutlinedInput-notchedOutline": {
            //     borderColor: theme.palette.primary.light,
            //   },

            // },
            "& fieldset": {
              borderWidth: "0.5px !important",
            },
            "&:hover fieldset": {
              borderWidth: "1px !important",
            },
            "&:hover-focused fieldset": {
              borderWidth: "1px !important",
            },
          };
        },
      },
    },
  },
});

export default theme;
