import RegisterForm from "../modules/register_form";

const Register = () => {
  return (
    <section className="h-full w-full flex flex-row items-center justify-center">
      <div className="bg-gray-100 w-1/3 rounded-md p-6 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold leading-tight">Register</h1>
        <div className="w-full">
          <RegisterForm />
        </div>
      </div>
    </section>
  );
};

export default Register;
