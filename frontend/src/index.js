import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "./context/user_provider";

import Router from "./router";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <UserProvider>
      <Routes>
        <Route path="/*" element={<Router />} />
      </Routes>
    </UserProvider>
  </BrowserRouter>
);
