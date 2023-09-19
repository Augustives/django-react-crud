import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./hooks/user_hook";

import RootLayout from "./components/layouts/root_layout";

const App = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/user");
    }
  }, [token, navigate]);

  return (
    <RootLayout>
      <Outlet />
    </RootLayout>
  );
};

export default App;
