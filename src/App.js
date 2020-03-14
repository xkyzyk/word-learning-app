import React from "react";
import {
  ThemeProvider,
  ColorModeProvider,
  theme,
  Flex,
  CSSReset
} from "@chakra-ui/core";
import Main from "./components/Main";

export default function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <ColorModeProvider>
          <Flex direction="column" align="center" justify="center">
            <CSSReset />
            <Main />
          </Flex>
        </ColorModeProvider>
      </ThemeProvider>
    </>
  );
}
