import React from "react";

// Return Label and Input fields
const FormInput = ({
  text,
  name,
  type,
  iClassName,
  onFieldChange,
  min,
  max,
  placeholder,
}) => {
  return (
    <>
      <label htmlFor={name}>
        <i className={iClassName}></i> {text}
        <span className="isrequired">*</span>
      </label>
      <input
        type={type}
        id={name}
        name={name}
        min={min}
        maxLength={max}
        onChange={onFieldChange}
        placeholder={placeholder}
      />
    </>
  );
};

export default FormInput;
