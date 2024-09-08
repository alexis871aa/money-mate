import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { withRouter, withStore } from "./hoc";
import { GlobalStyle } from "./styles/GlobalStyle";

const AppWithEnhancements = withStore(withRouter(App));

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <>
    <GlobalStyle />
    <AppWithEnhancements />
  </>,
);
export { API_URL } from "./constants/API_URL";
