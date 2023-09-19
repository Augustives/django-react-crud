import RegisterForm from "../modules/register_form";
import { useNavigate } from "react-router";

const Register = () => {
  const navigate = useNavigate();

  return (
    <section className="h-full w-full flex flex-row items-center justify-center">
      <div className="relative bg-gray-100 w-3/5 rounded-md p-6 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold leading-tight">Register</h1>
        <div className="w-full">
          <RegisterForm />
          <hr className="my-6 border-tiffanyBlue w-full" />
          <p className="mt-8">
            Already have an account?{" "}
            <a
              href="/"
              className="text-blue-500 hover:text-blue-700 font-semibold"
            >
              Log in
            </a>
          </p>
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            onClick={() => {
              navigate("/");
            }}
          >
            X
          </button>
        </div>
      </div>
    </section>
  );
};

export default Register;
