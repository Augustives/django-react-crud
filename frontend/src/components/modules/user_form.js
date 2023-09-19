import { useState } from "react";
import { useAuth } from "../../hooks/auth_hook";

import { cpf, cnpj } from "cpf-cnpj-validator";

import Button from "../elements/button";
import Input from "../elements/input";
import Select from "../elements/select";

import encryptMessage from "../../utils/crypt";

const UserForm = ({ initialData }) => {
  const { registerUser, putUser } = useAuth();

  const [validationMsg, setValidationMsg] = useState({});
  const [confirmPassword, setconfirmPassword] = useState();

  const [formData, setFormData] = useState(
    initialData || {
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
    }
  );

  const validations = {
    email: (value) => {
      const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return re.test(String(value).toLowerCase()) || "Invalid email address";
    },
    password: (value) => {
      if (value.length < 8) {
        return "Password must be at least 8 characters";
      }
      if (/^\d+$/.test(value)) {
        return "Password should not be only numeric";
      }
      return true;
    },
    confirmPassword: () => {
      return confirmPassword === formData.password || "Passwords do not match";
    },
    "customer.identifier": (value) => {
      return validateIdentifier(value) || "Invalid document";
    },
  };

  const getNestedValue = (obj, path) => {
    return path.split(".").reduce((acc, part) => (acc ? acc[part] : null), obj);
  };

  const validate = () => {
    let isValid = true;
    let errors = {};

    for (let field in validations) {
      let value = getNestedValue(formData, field) || "";
      let result = validations[field](value);

      if (result !== true) {
        isValid = false;
        errors[field] = result;
      }
    }

    setValidationMsg(errors);

    return isValid;
  };

  const validateIdentifier = (value) => {
    switch (formData.customer.identifier_type) {
      case "CPF":
        return cpf.isValid(value);
      case "CNPJ":
        return cnpj.isValid(value);
      default:
        return false;
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

    if (!validate()) {
      return;
    }

    let encryptedPassword;
    encryptedPassword = await encryptMessage(formData.password);

    if (initialData) {
      putUser({ ...formData, password: encryptedPassword });
    } else {
      registerUser({ ...formData, password: encryptedPassword });
    }
  };

  return (
    <>
      <form
        className="mt-6 grid gap-3 md:gap-6 items-center"
        onSubmit={handleSubmit}
      >
        <Input
          label="Email Address"
          type="email"
          placeholder="Enter the email"
          value={formData.email}
          errorMessage={validationMsg.email}
          required
          onChange={(e) => handleChange("email", e.target.value)}
        />

        <Input
          label="Password"
          type="password"
          placeholder="Enter the password"
          errorMessage={validationMsg.password}
          minLength={8}
          required
          onChange={(e) => handleChange("password", e.target.value)}
        />

        <Input
          label="Confirm Password"
          type="password"
          placeholder="Enter the password again"
          errorMessage={validationMsg.confirmPassword}
          minLength={8}
          required
          onChange={(e) => setconfirmPassword(e.target.value)}
        />

        <Input
          label="Name"
          type="text"
          placeholder="Enter your name"
          value={formData.customer.name}
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
          value={formData.customer.identifier_type}
          onChange={(e) =>
            handleChange("customer.identifier_type", e.target.value)
          }
        />

        <Input
          label="Document"
          type="text"
          placeholder="Enter your document"
          value={formData.customer.identifier}
          errorMessage={validationMsg["customer.identifier"]}
          required
          maxLength={14}
          onChange={(e) => handleChange("customer.identifier", e.target.value)}
        />

        <Select
          required
          label="Country"
          choices={[{ value: "BR", label: "Brasil" }]}
          value={formData.customer.address.country}
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
          value={formData.customer.address.state}
          onChange={(e) =>
            handleChange("customer.address.state", e.target.value)
          }
        />

        <Input
          label="City"
          type="text"
          placeholder="Enter the city"
          value={formData.customer.address.city}
          required
          onChange={(e) =>
            handleChange("customer.address.city", e.target.value)
          }
        />

        <Input
          label="Street"
          type="text"
          placeholder="Enter the street"
          value={formData.customer.address.street}
          required
          onChange={(e) =>
            handleChange("customer.address.street", e.target.value)
          }
        />

        <Input
          label="Postal Code"
          type="text"
          placeholder="Enter the postal code"
          value={formData.customer.address.postal_code}
          required
          onChange={(e) =>
            handleChange("customer.address.postal_code", e.target.value)
          }
        />

        <Input
          label="Additional Informatiom"
          type="text"
          placeholder="Enter additional information"
          value={formData.customer.address.additional_info}
          onChange={(e) =>
            handleChange("customer.address.additional_info", e.target.value)
          }
        />
        <div className="md:col-span-2 lg:col-span-3 mx-auto">
          <Button text="Submit" type="submit" />
        </div>
      </form>
    </>
  );
};

export default UserForm;
