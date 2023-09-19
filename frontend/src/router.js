import { Route, Routes } from "react-router-dom";

import App from "./app";
import RequireAuth from "./utils/require_auth";
import ErrorPage from "./components/pages/error";
import Login from "./components/pages/login";
import Register from "./components/pages/register";
import User from "./components/pages/user";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} errorElement={<ErrorPage />}>
        <Route path="" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<RequireAuth />}>
          <Route path="/user" element={<User />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;
