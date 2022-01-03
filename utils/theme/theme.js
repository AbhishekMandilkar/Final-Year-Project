import { ThemeProvider } from "styled-components";
import React from "react";
const theme = {
  colors: {
    primary: "#1da1f2",
    gray: "#e6e6e6",
  },
};

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
