import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./Home-page/components/ColorMode.tsx";
import { BrowserRouter, } from "react-router-dom";

// import './assets/js/bootstrap.min.js'
// import '../src/assets/css/style.css'
// import '../src/assets/css/plugins.css'
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
