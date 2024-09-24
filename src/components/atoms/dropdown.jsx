import React from "react";

const Dropdown = ({
  label,
  options,
  value,
  onChange,
  placeholder,
  disabled,
}) => {
  const handleChange = (event) => {
    const newValue = event.target.value;
    onChange(newValue);
  };

  return (
    <div>
      <label className="dropdown-label">
        {label}
        <select
          className="dropdown-select"
          value={value}
          onChange={handleChange}
          disabled={disabled}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default Dropdown;
