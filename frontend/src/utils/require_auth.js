import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/user_hook";

const RequireAuth = () => {
  const { token } = useAuth();
  const location = useLocation();

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default RequireAuth;
