import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./Home-page/components/ColorMode.tsx";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux"; // Import Redux Provider
import { store } from "./app/store.ts"; // Import Redux store

ReactDOM.createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId="293789754225-j40l223bopqvcedji6oks147omf7al2s.apps.googleusercontent.com">
    <React.StrictMode>
      <Provider store={store}> {/* Wrap app with Redux Provider */}
        <ChakraProvider theme={theme}>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ChakraProvider>
      </Provider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);
