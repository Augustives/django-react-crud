import { useAuth } from "../../hooks/user_hook";
import LoginForm from "../modules/login_form";
import { useEffect } from "react";

const Login = () => {
  const { error, setToken } = useAuth();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken && !error) {
      setToken(JSON.parse(storedToken));
    }
  }, [error, setToken]);

  return (
    <section className="h-full w-full flex flex-row items-center justify-center">
      <div className="bg-gray-100 w-max sm:w-2/6 rounded-md p-6 flex flex-col items-center justify-center">
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
