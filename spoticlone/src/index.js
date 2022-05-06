import React from "react";
import App from "./App";
import "./scss/common.scss";
import reportWebVitals from "./reportWebVitals";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { MediaProvider } from "./contexts/MediaContext";

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';



createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <MediaProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MediaProvider>
  </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
