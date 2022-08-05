import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { MantineProvider } from "@mantine/core";
import reportWebVitals from "./reportWebVitals";
import { HashRouter as Router } from "react-router-dom";
import { NotificationsProvider } from "@mantine/notifications";
import { GlobalModelsProvider } from "contexts/ModelsContext";
import { UserProvider } from "contexts/UserContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <GlobalModelsProvider>
      <UserProvider>
        <Router>
          <MantineProvider
            theme={{ fontFamily: "Montserrat" }}
            withGlobalStyles
            withNormalizeCSS
          >
            <NotificationsProvider position="top-right" >
              <App />
            </NotificationsProvider>
          </MantineProvider>
        </Router>
      </UserProvider>
    </GlobalModelsProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
