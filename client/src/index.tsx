import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { withStore } from "./hoc";
import { GlobalStyle } from "./styles/GlobalStyle";

const AppWithStore = withStore(App);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
    <>
        <GlobalStyle />
        <AppWithStore />
    </>
);
