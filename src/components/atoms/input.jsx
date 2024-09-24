import React, { useState } from "react";

const Input = ({ label, type, value, onChange, placeholder, readOnly }) => {
  const handleChange = (event) => {
    const newValue = event.target.value;
    onChange(newValue);
  };

  return (
    <div>
      <label className="input-label">
        {label}
        <input
          className="input-In-Cards"
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          readOnly={readOnly ? "true" : ""}
        />
      </label>
    </div>
  );
};

export default Input;
