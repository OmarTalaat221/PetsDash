import React from "react";
import "./style.css";

const CustomInput = ({
  w100,
  textarea,
  inRow,
  label,
  required,
  type,
  ...props
}) => {
  return (
    <>
      <div className={`custom_input ${inRow ? "inRow" : ""} `}>
        <label>
          {label || ""}
          {required && <span>(*)</span>}
        </label>
        {textarea ? (
          // <textarea className='custom_input' {...props}/>
          <textarea
            {...props}
            className="custom_input"
            rows={1}
            name="textarea"
            id=""
          />
        ) : (
          <input className="custom_input" type={type || "text"} {...props}  />
        )}
      </div>
    </>
  );
};

export default CustomInput;
