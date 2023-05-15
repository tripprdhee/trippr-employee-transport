import "./index.css";
import React from "react";

const AppTextInput = (props) => {
  return (
    <input
      type={props.type}
      value={props.value}
      className="input-style"
      placeholder={props.placeholder}
      rows={props.rows}
      cols={props.cols}
      disabled={props.disabled}
      required={props.required}
      id={props.id}
      onChange={props.onChange}
    />
  );
};
export default AppTextInput;
