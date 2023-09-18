import { useState } from "react";
import { useNavigate } from "react-router-dom";

import FormButton from "../elements/form_button";
import Input from "../elements/input";
import Modal from "../elements/modal";
import Select from "../elements/select";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("passwordMismatch");

  const [confirmPassword, setconfirmPassword] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    customer: {
      name: "",
      identifier: "",
      identifier_type: "",
      address: {
        country: "",
        state: "",
        city: "",
        street: "",
        postal_code: "",
        additional_info: "",
      },
    },
  });

  const checkPasswords = () => {
    if (formData.password !== confirmPassword) {
      setModalType("passwordMismatch");
      setShowModal(true);
    }
  };

  const handleChange = (path, value) => {
    setFormData((prevData) => {
      const keys = path.split(".");
      let data = { ...prevData };
      let temp = data;

      for (let i = 0; i < keys.length - 1; i++) {
        temp = temp[keys[i]];
      }

      temp[keys[keys.length - 1]] = value;

      return data;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    checkPasswords();

    try {
      const response = await fetch("http://localhost:8000/user/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setModalType("success");
        setShowModal(true);
      } else {
        setModalType("failure");
        setShowModal(true);
      }
    } catch (error) {
      setModalType("failure");
      setShowModal(true);
    }
  };

  return (
    <>
      <form className="mt-6 grid items-center" onSubmit={handleSubmit}>
        <section className="grid grid-cols-2 gap-6">
          <div>
            <Input
              label="Email Address"
              type="email"
              placeholder="Enter the email"
              required
              onChange={(e) => handleChange("email", e.target.value)}
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter the password"
              required
              minLength={6}
              onChange={(e) => handleChange("password", e.target.value)}
            />

            <Input
              label="Confirm Password"
              type="password"
              placeholder="Enter the password again"
              required
              minLength={6}
              onChange={(e) => setconfirmPassword(e.target.value)}
            />

            <Input
              label="Name"
              type="text"
              placeholder="Enter your name"
              required
              onChange={(e) => handleChange("customer.name", e.target.value)}
            />

            <Select
              required
              label="Document Type"
              choices={[
                { value: "CPF", label: "CPF" },
                { value: "CNPJ", label: "CNPJ" },
              ]}
              onChange={(e) =>
                handleChange("customer.identifier_type", e.target.value)
              }
            />

            <Input
              label="Document"
              type="text"
              placeholder="Enter your document"
              required
              maxLength={14}
              onChange={(e) =>
                handleChange("customer.identifier", e.target.value)
              }
            />
          </div>
          <div>
            <Select
              required
              label="Country"
              choices={[{ value: "BR", label: "Brasil" }]}
              onChange={(e) =>
                handleChange("customer.address.country", e.target.value)
              }
            />

            <Select
              required
              label="State"
              choices={[
                { value: "AC", label: "Acre" },
                { value: "AL", label: "Alagoas" },
                { value: "AP", label: "Amapá" },
                { value: "AM", label: "Amazonas" },
                { value: "BA", label: "Bahia" },
                { value: "CE", label: "Ceará" },
                { value: "DF", label: "Distrito Federal" },
                { value: "ES", label: "Espírito Santo" },
                { value: "GO", label: "Goiás" },
                { value: "MA", label: "Maranhão" },
                { value: "MT", label: "Mato Grosso" },
                { value: "MS", label: "Mato Grosso do Sul" },
                { value: "MG", label: "Minas Gerais" },
                { value: "PA", label: "Pará" },
                { value: "PB", label: "Paraíba" },
                { value: "PR", label: "Paraná" },
                { value: "PE", label: "Pernambuco" },
                { value: "PI", label: "Piauí" },
                { value: "RJ", label: "Rio de Janeiro" },
                { value: "RN", label: "Rio Grande do Norte" },
                { value: "RS", label: "Rio Grande do Sul" },
                { value: "RO", label: "Rondônia" },
                { value: "RR", label: "Roraima" },
                { value: "SC", label: "Santa Catarina" },
                { value: "SP", label: "São Paulo" },
                { value: "SE", label: "Sergipe" },
                { value: "TO", label: "Tocantins" },
              ]}
              onChange={(e) =>
                handleChange("customer.address.state", e.target.value)
              }
            />

            <Input
              label="City"
              type="text"
              placeholder="Enter the city"
              required
              onChange={(e) =>
                handleChange("customer.address.city", e.target.value)
              }
            />

            <Input
              label="Street"
              type="text"
              placeholder="Enter the street"
              required
              onChange={(e) =>
                handleChange("customer.address.street", e.target.value)
              }
            />

            <Input
              label="Postal Code"
              type="text"
              placeholder="Enter the postal code"
              required
              onChange={(e) =>
                handleChange("customer.address.postal_code", e.target.value)
              }
            />

            <Input
              label="Additional Informatiom"
              type="text"
              placeholder="Enter additional information"
              onChange={(e) =>
                handleChange("customer.address.additional_info", e.target.value)
              }
            />
          </div>
        </section>

        <FormButton text="Register" />
      </form>

      {showModal && modalType === "passwordMismatch" && (
        <Modal
          text="The passwords don't match."
          label="Passwords Mismatch"
          setOpenModal={setShowModal}
          onConfirm={() => {}}
        />
      )}
      {showModal && modalType === "failure" && (
        <Modal
          text="Failed to create user."
          label="Failure"
          setOpenModal={setShowModal}
          onConfirm={() => {}}
        />
      )}
      {showModal && modalType === "success" && (
        <Modal
          text="User created successfully."
          label="Success"
          setOpenModal={setShowModal}
          onConfirm={() => {
            navigate("/");
          }}
        />
      )}
    </>
  );
};

export default RegisterForm;
