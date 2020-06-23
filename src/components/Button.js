import React from "react";

const Button = ({ btnClass, clickEvent, text, type }) => {
  return (
    <button type={type} className={btnClass} onClick={clickEvent}>
      {text}
    </button>
  );
};

export default Button;
