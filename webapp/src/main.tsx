import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./Home-page/components/ColorMode.tsx";
import { BrowserRouter, } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
// import './assets/js/bootstrap.min.js'
// import '../src/assets/css/style.css'
// import '../src/assets/css/plugins.css'
ReactDOM.createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId="293789754225-j40l223bopqvcedji6oks147omf7al2s.apps.googleusercontent.com">
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
  </GoogleOAuthProvider>
);
