import { createTheme } from "@mui/material";
import { purple, cyan } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: purple[800],
    },
    secondary: {
      main: cyan[500],
    },
  },
});
