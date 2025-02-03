// src/components/searchBox/SearchBox.jsx
// src/components/searchBox/SearchBox.jsx

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeFilter } from "../../redux/filters/slice";

export const SearchBox = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");

  const handleChange = (event) => {
    console.log("handleChange викликано");
    const inputValue = event.target.value;
    setQuery(inputValue);
    const trimmedValue = inputValue.trim();
    console.log("inputValue:", inputValue);
    console.log("trimmedValue:", trimmedValue);

    const isPhoneNumber = /^\+?[\d\s\-]+$/.test(trimmedValue);
    console.log("isPhoneNumber:", isPhoneNumber);

    if (isPhoneNumber) {
      console.log("dispatching phone filter");
      dispatch(changeFilter({ field: "number", value: trimmedValue }));
      dispatch(changeFilter({ field: "name", value: "" }));
    } else {
      console.log("dispatching name filter");
      dispatch(changeFilter({ field: "name", value: trimmedValue }));
      dispatch(changeFilter({ field: "number", value: "" }));
    }
  };

  const handleClear = () => {
    setQuery("");
    dispatch(changeFilter({ field: "name", value: "" }));
    dispatch(changeFilter({ field: "number", value: "" }));
  };

  return (
    <div className="flex items-center flex-wrap place-content-center gap-2 mt-4">
      <p className="mb-0">Search for contacts by name or phone number</p>
      <label className="input mt-0 w-1/2">
        <svg
          className="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input
          type="text"
          placeholder="Search..."
          onChange={handleChange}
          value={query}
        />
        {query && (
          <button onClick={handleClear} className="clear-button">
            Clear
          </button>
        )}
      </label>
    </div>
  );
};

export default SearchBox;
