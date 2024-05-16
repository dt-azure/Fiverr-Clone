import { Switch } from "antd";
import React from "react";
import "./input.scss";

const SwitchCustom = ({
  label,
  name,
  value,
  defaultCheck = true,
  switchOff = "",
  setFieldValue,
  className="mr-5"
}) => {
  return (
    <div className={`flex items-center ${className}`}>
      <label className="text-right pr-5 w-1/2 md:w-auto" htmlFor="">
        {label}
      </label>
      <div className={`w-1/2 md:w-auto ${switchOff}`}>
        <Switch
          id={name}
          onChange={(checked, event) => {
            // console.log(checked);
            setFieldValue(name, checked);
          }}
          defaultChecked={defaultCheck}
          value={value}
        />
      </div>
    </div>
  );
};

export default SwitchCustom;
