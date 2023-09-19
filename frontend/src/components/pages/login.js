import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth_hook";

import LoginForm from "../modules/login_form";

const Login = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/user");
    }
  }, [token, navigate]);

  return (
    <section className="h-full w-full flex flex-row items-center justify-center">
      <div className="bg-gray-100 w-max rounded-md p-6 flex flex-col items-center justify-center m-2">
        <h1 className="text-2xl font-bold leading-tight">Login</h1>
        <div className="w-full">
          <LoginForm />
          <hr className="my-6 border-tiffanyBlue w-full" />
          <p className="mt-8">
            Need an account?{" "}
            <a
              href="/register"
              className="text-blue-500 hover:text-blue-700 font-semibold"
            >
              Create account
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
