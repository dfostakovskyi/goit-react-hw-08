// src\components\contactForm\ContactForm.jsx

import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contacts/slice";
import { useState } from "react";

export const ContactForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [errors, setErrors] = useState({});

  const validateName = (value) => {
    const pattern = /^[A-Za-z][A-Za-z0-9\-]*$/;
    if (value.length < 3 || value.length > 30) {
      return "Must be 3 to 30 characters";
    } else if (!pattern.test(value)) {
      return "Only letters, numbers, or dash";
    }
    return "";
  };

  const validateNumber = (value) => {
    const pattern = /^[0-9]{10}$/;
    if (!pattern.test(value)) {
      return "Must be 10 digits";
    }
    return "";
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (errors.name) {
      setErrors((prevErrors) => ({ ...prevErrors, name: "" }));
    }
  };

  const handleNumberChange = (e) => {
    setNumber(e.target.value);
    if (errors.number) {
      setErrors((prevErrors) => ({ ...prevErrors, number: "" }));
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Stop event propagation

    const nameError = validateName(name);
    const numberError = validateNumber(number);

    if (nameError || numberError) {
      setErrors({ name: nameError, number: numberError });
      return;
    }

    const newContact = {
      name,
      number,
    };
    dispatch(addContact(newContact));

    // Clear input fields and errors
    setName("");
    setNumber("");
    setErrors({});
  };

  return (
    <div className="max-w-3/4 mx-auto my-4">
      <form
        className="bg-white shadow-md rounded  mb-4 px-6 pt-4 pb-6"
        onSubmit={onSubmit}
        noValidate
      >
        <div className="mb-4 flex flex-row items-center">
          <label
            className="block text-gray-700 text-sm font-bold mb-2 mr-4 text-center"
            htmlFor="name"
          >
            Name
          </label>
          <input
            type="text"
            className={`appearance-none border ${
              errors.name ? "border-red-500" : "border-gray-300"
            } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            placeholder="Enter name"
            pattern="[A-Za-z][A-Za-z0-9\-]*"
            minLength="3"
            maxLength="30"
            title="Only letters, numbers or dash"
            id="name"
            name="name"
            value={name}
            onChange={handleNameChange}
          />
          {errors.name && (
            <p className="text-red-500 text-xs italic mt-1">{errors.name}</p>
          )}
        </div>
        <div className="mb-6 flex flex-row items-center">
          <label
            className="block text-gray-700 text-sm font-bold mb-2 mr-4 text-center"
            htmlFor="number"
          >
            Phone Number
          </label>
          <input
            type="tel"
            className={`appearance-none border ${
              errors.number ? "border-red-500" : "border-gray-300"
            } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            placeholder="Enter phone number"
            pattern="[0-9]{10}"
            minLength="10"
            maxLength="10"
            title="Must be 10 digits"
            id="number"
            name="number"
            value={number}
            onChange={handleNumberChange}
          />
          {errors.number && (
            <p className="text-red-500 text-xs italic mt-1">{errors.number}</p>
          )}
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="btn rounded-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 px-3 rounded focus:outline-none focus:shadow-outline"
          >
            Add Contact
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
