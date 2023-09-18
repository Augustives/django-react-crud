import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./app";
import ErrorPage from "./components/pages/error";
import Register from "./components/pages/register";
import User from "./components/pages/user_page";
import Login from "./components/pages/login_page";

const Router = () => {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/user",
          element: <User />,
        },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
};
export default Router;
