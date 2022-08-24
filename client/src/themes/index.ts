import { responsiveFontSizes } from "@mui/material";
import { theme as primary } from "./main";
import { theme as secondary } from "./secondary";

export default [
  { name: "main", theme: responsiveFontSizes(primary) },
  { name: "secondary", theme: responsiveFontSizes(secondary) },
];
