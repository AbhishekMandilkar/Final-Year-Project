import { ThemeProvider } from "styled-components";
import React from "react";
const theme = {
  colors: {
    primary: "#1da1f2",
    gray: "#e6e6e6",
    mintGreen: "#a3e4db",
    darkMintGreen: "#16413B",
  },
};

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
