import { useState } from "react";
import { useAuth } from "../../hooks/user_hook";

import FormButton from "../elements/button";
import Input from "../elements/input";

import encryptMessage from "../../utils/crypt";

const LoginForm = () => {
  const { login, setError } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    let encryptedPassword;
    try {
      encryptedPassword = await encryptMessage(password);
    } catch (error) {
      setError(error);
      return;
    }

    await login(email, encryptedPassword);
  };

  return (
    <>
      <form className="mt-6 flex flex-col items-center" onSubmit={handleSubmit}>
        <div className="w-10/12">
          <Input
            label="Email Address"
            type="email"
            placeholder="Enter the email address"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mt-4 w-10/12">
          <Input
            label="Password"
            type="password"
            placeholder="Enter the password"
            required
            minLength={6}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <FormButton text="Log In" type="submit" />
      </form>
    </>
  );
};

export default LoginForm;
