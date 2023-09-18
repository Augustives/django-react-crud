import Input from "../elements/input";
import FormButton from "../elements/form_button";

const LoginForm = () => {
  return (
    <>
      <form className="mt-6" action="#" method="POST">
        <div>
          <Input
            label="Email Address"
            type="email"
            placeholder="Enter the email address"
          />
        </div>

        <div className="mt-4">
          <Input
            label="Password"
            type="password"
            placeholder="Enter the password"
            required
            minLength={6}
          />
        </div>

        <FormButton text="Log In" />
      </form>
    </>
  );
};

export default LoginForm;
