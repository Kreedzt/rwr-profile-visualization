// SPDX-License-Identifier: GPL-3.0-only
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { DataContextProvider } from "./context/DataContext";

ReactDOM.render(
  <React.StrictMode>
    <DataContextProvider>
      <App />
    </DataContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
