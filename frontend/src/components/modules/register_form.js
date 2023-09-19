import { useState } from "react";
import { useAuth } from "../../hooks/user_hook";

import { cpf, cnpj } from "cpf-cnpj-validator";

import FormButton from "../elements/button";
import Input from "../elements/input";
import Select from "../elements/select";

import encryptMessage from "../../utils/crypt";

const RegisterForm = () => {
  const { register, setError } = useAuth();

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
      setError("Invalid credentials");
    }
  };

  const validateIdentifier = () => {
    if (formData.identifier_type === "CPF") {
      if (!cpf.isValid(formData.identifer)) {
        setError("Invalid document");
      }
    } else if (formData.identifier_type === "CNPJ") {
      if (!cnpj.isValid(formData.identifer)) {
        setError("Invalid document");
      }
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
    validateIdentifier();

    let encryptedPassword;
    try {
      encryptedPassword = await encryptMessage(formData.password);
    } catch (error) {
      setError(error);
      return;
    }

    register({ ...formData, password: encryptedPassword });
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
              onChange={(e) => handleChange("password", e.target.value)}
            />

            <Input
              label="Confirm Password"
              type="password"
              placeholder="Enter the password again"
              required
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
          <div className="col-span-2 mx-auto">
            <FormButton text="Register" type="submit" />
          </div>
        </section>
      </form>
    </>
  );
};

export default RegisterForm;
