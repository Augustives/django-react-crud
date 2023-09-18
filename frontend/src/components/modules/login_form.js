import { useState } from "react";
import { useNavigate } from "react-router-dom";

import FormButton from "../elements/form_button";
import Input from "../elements/input";
import Modal from "../elements/modal";

import encryptMessage from "../../utils/crypt";

const LoginForm = () => {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(await encryptMessage(password));

    // try {
    //   const response = await fetch("http://localhost:8000/user/login/", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       username: email,
    //       password: await encryptMessage(password),
    //     }),
    //   });

    //   if (response.ok) {
    //   } else {
    //     setShowModal(true);
    //   }
    // } catch (error) {
    //   setShowModal(true);
    // }
  };

  return (
    <>
      <form className="mt-6" onSubmit={handleSubmit}>
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

      {showModal && (
        <Modal
          text="Failed to login."
          label="Failure"
          setOpenModal={setShowModal}
          onConfirm={() => {}}
        />
      )}
    </>
  );
};

export default LoginForm;
