import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./app";
import RootLayout from "./components/layouts/root_layout";
import ErrorPage from "./components/pages/error";
import Register from "./components/pages/register";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <ErrorPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RootLayout>
      <RouterProvider router={router} />
    </RootLayout>
  </React.StrictMode>
);
