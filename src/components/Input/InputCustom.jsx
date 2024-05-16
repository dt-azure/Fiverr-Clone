import React from "react";

const InputCustom = ({
  id,
  label,
  placeholder,
  className = "",
  name,
  onChange,
  value,
  error,
  touched,
  onBlur,
  readOnly,
  type = "text",
  labelClassName = "",
  disabled = false
}) => {
  return (
    <div className={`flex ${error && touched ? "items-start" : "items-center" }`}>
      <div className={labelClassName}>
        <label
          htmlFor={id}
          className="text-sm font-medium text-gray-900"
        >
          {label}
        </label>
      </div>
      <div className="w-full">
        <input
          type={type}
          name={name}
          id={id}
          className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${className} ${
            error && touched ? "border-red-500" : ""
          }`}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          onBlur={onBlur}
          readOnly={readOnly ? true : false}
          disabled={disabled}
        />

        {error && touched ? (
          <p className="text-red-500 text-sm mt-3">{error}</p>
        ) : null}
      </div>
    </div>
  );
};

export default InputCustom;
