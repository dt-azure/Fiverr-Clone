import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input } from "antd";
import React from "react";

const InputCustom = ({
  id,
  label,
  placeholder,
  className = "",
  labelClassName = "w-1/4 text-right pr-5",
  name,
  onChange,
  value,
  error,
  touched,
  onBlur,
  readOnly,
  type = "text",
}) => {
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  return (
    <div className="flex">
      <label
        htmlFor={id}
        className={`block mb-2 mt-2 text-sm font-medium text-gray-900 ${labelClassName}`}
      >
        {label}
      </label>
      <div className="w-full">
        <Input.Password
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
          readOnly={readOnly}
          disabled={readOnly}
          iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        />

        {error && touched ? (
          <p className="text-red-500 text-sm mt-3">{error}</p>
        ) : null}
      </div>
    </div>
  );
};

export default InputCustom;
