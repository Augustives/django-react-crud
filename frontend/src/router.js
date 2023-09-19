import { Route, Routes } from "react-router-dom";

import App from "./app";
import Edit from "./components/pages/edit";
import Error from "./components/pages/error";
import Login from "./components/pages/login";
import Missing from "./components/pages/missing";
import Register from "./components/pages/register";
import User from "./components/pages/user";
import RequireAuth from "./utils/require_auth";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} errorElement={<Error />}>
        <Route path="" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<RequireAuth />}>
          <Route path="/user" element={<User />} />
          <Route path="/edit" element={<Edit />} />
        </Route>

        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
};

export default Router;
