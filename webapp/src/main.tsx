import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./Home-page/components/ColorMode.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux"; // Import Redux Provider
import { store } from "./app/store.ts"; // Import Redux store
import { HelmetProvider } from "react-helmet-async";
ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <HelmetProvider>

      <Provider store={store}> {/* Wrap app with Redux Provider */}
        <ChakraProvider theme={theme}>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ChakraProvider>
      </Provider>
      </HelmetProvider>
    </React.StrictMode>
);
