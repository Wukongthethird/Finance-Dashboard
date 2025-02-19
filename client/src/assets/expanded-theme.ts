//eslint-disable-next-line
import { Palette, PaletteColor } from "@mui/material/styles/createPalette";

// pused in @app as provider
declare module "@mui/material/styles/createPalette" {
  // typescrtipt setting from material ui
  // extending types from material ui
  interface PaletteColor {
    [key: number]: string;
  }
  interface Palette {
    tertiary: PaletteColor;
  }
}
