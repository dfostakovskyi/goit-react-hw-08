// src\components\contactForm\ContactForm.jsx

// src/components/contactForm/ContactForm.jsx

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contacts/slice";

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
    <div className="max-w-md mx-auto my-8">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={onSubmit}
        noValidate
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Contact</h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
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
            title="Only letters, numbers, or dash"
            id="name"
            name="name"
            value={name}
            onChange={handleNameChange}
          />
          {errors.name && (
            <p className="text-red-500 text-xs italic mt-1">{errors.name}</p>
          )}
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2 "
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
            className="btn rounded-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Contact
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
