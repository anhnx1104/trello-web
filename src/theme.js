import { experimental_extendTheme as extendTheme } from "@mui/material/styles";

// Create a theme instance.

const APP_BAR_HEIGHT = "58px";
const BOARD_BAR_HEIGHT = "60px";

const COLUMN_HEADER_HEIGHT = "50px";
const COLUMN_FOOTER_HEIGHT = "56px";

const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`;
const theme = extendTheme({
  trelloCustom: {
    appBarHeight: APP_BAR_HEIGHT,
    boardBarHeight: BOARD_BAR_HEIGHT,
    boardContentHeight: BOARD_CONTENT_HEIGHT,
    columnHeaderHeight: COLUMN_HEADER_HEIGHT,
    columnFooterHeight: COLUMN_FOOTER_HEIGHT,
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
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          "*::webkit-scrollbar": {
            width: "10px",
            height: "10px",
          },
          "*::webkit-scrollbar-thumb": {
            backgroundColor: "#dcdde1",
            borderRadius: "8px",
          },
          "*::webkit-scrollbar-thumb:hover": {
            backgroundColor: "white",
          },
        },
      },
    },

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
        root: { fontSize: "0.875rem" },
      },
    },
    MuiTypography: {
      styleOverrides: {
        // Name of the slot
        root: {
          "&.MuiTypography-body1": { fontSize: "0.875rem" },
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
