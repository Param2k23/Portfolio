// theme.js

// 1. import `extendTheme` function
import { extendTheme } from "@chakra-ui/react";

// 2. Add your color mode config
const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors: {
    brand: {
      50: "#fff2eb",
      100: "#ffd9c7",
      200: "#ffb89a",
      300: "#ff946a",
      400: "#ff7a4a",
      500: "#f35d2f",
      600: "#d6451d",
      700: "#a93419",
      800: "#7d2416",
      900: "#55170f",
    },
    night: {
      500: "#0b0e14",
      600: "#171a23",
    },
  },
  fonts: {
    heading: "'Fraunces', serif",
    body: "'Space Grotesk', system-ui, sans-serif",
  },
  styles: {
    global: {
      body: {
        bg: "transparent",
        color: "gray.900",
      },
    },
  },
});

export default theme;
