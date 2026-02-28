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
    global: (props) => ({
      body: {
        bg: props.colorMode === 'dark' ? '#0f0f1e' : 'linear-gradient(140deg, #f8f4ee, #efe9e1)',
        color: props.colorMode === 'dark' ? '#e0e0e0' : '#1b1b1f',
        transition: 'background-color 0.3s ease, color 0.3s ease',
      },
      a: {
        color: props.colorMode === 'dark' ? '#ff7a4a' : 'inherit',
        _hover: {
          textDecoration: 'underline',
        },
      },
    }),
  },
  semanticTokens: {
    colors: {
      'bg-primary': {
        default: '#f8f4ee',
        _dark: '#0f0f1e',
      },
      'bg-secondary': {
        default: '#efe9e1',
        _dark: '#171a23',
      },
      'text-primary': {
        default: '#1b1b1f',
        _dark: '#e0e0e0',
      },
      'text-muted': {
        default: 'rgba(27, 27, 31, 0.7)',
        _dark: 'rgba(224, 224, 224, 0.6)',
      },
      'border-color': {
        default: 'rgba(0, 0, 0, 0.1)',
        _dark: 'rgba(255, 255, 255, 0.1)',
      },
    },
  },
  components: {
    Button: {
      defaultProps: {
        _active: {
          transform: 'scale(0.98)',
        },
      },
    },    Box: {
      baseStyle: (props) => ({
        _dark: {
          bg: props.colorMode === 'dark' ? undefined : undefined,
        },
      }),
    },  },
});

export default theme;
