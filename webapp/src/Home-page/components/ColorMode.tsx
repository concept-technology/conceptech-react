import {
  extendTheme,
  type ThemeConfig,

  useColorMode,
  Icon,
} from "@chakra-ui/react";
import { VscColorMode } from 'react-icons/vsc'
// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: true,
};

// 3. extend the theme
const theme = extendTheme({
  config,
  color: {
    gray: {
      50: '#f9f9f9',
      100: '#ededed',
      200: '#d3d3d3',
      300: '#b3b3b3',
      400: '#a0a0a0',
      500: '#898989',
      600: '#6c6c6c',
      700: '#20202',
      800: '#121212',
      900: '#111'
    }
  }
});

export default theme;

export function ToggleColorMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <header>
      <Icon onClick={toggleColorMode} as={VscColorMode} boxSize={25}>
        {colorMode === "light" ? "Dark" : "Light"}
      </Icon>
    </header>
  );
}
