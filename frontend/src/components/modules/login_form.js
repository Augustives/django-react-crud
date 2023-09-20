import { useState } from "react";
import { useAuth } from "../../hooks/auth_hook";

import Button from "../elements/button";
import Input from "../elements/input";

import { encryptMessage } from "../../utils/crypt";

const LoginForm = () => {
  const { login, setError } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    let encryptedPassword;
    try {
      encryptedPassword = await encryptMessage(password);
    } catch (err) {
      setError(`An unexpected error occurred: ${err.message}`);
      return;
    }

    await login(email, encryptedPassword);
  };

  return (
    <>
      <form className="mt-6 flex flex-col items-center" onSubmit={handleSubmit}>
        <div className="w-4/6">
          <Input
            label="Email Address"
            type="email"
            placeholder="Enter the email address"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="w-4/6">
          <Input
            label="Password"
            type="password"
            placeholder="Enter the password"
            required
            minLength={8}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button text="Log In" type="submit" />
      </form>
    </>
  );
};

export default LoginForm;
