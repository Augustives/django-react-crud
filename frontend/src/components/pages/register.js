import RegisterForm from "../modules/register_form";

const Register = () => {
  return (
    <section className="h-full w-full flex flex-row items-center justify-center">
      <div className="bg-gray-100 w-3/5 rounded-md p-6 flex flex-col items-center justify-center">
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
        </div>
      </div>
    </section>
  );
};

export default Register;
