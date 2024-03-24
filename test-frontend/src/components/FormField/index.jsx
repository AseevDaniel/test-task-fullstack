import { useState } from "react";
import PropTypes from "prop-types";
import { Input } from "../Input";
import { EyeHideIcon, EyeShownIcon } from "@/assets/icons";
import "./form-field.scss";

export const FormField = ({ name, ...props }) => {
  const isPasswordInput = props.type === "password";
  const [isShowValue, setIsShowValue] = useState(!isPasswordInput);

  return (
    <div className="formField">
      <Input
        {...props}
        name={name}
        placeholder=" "
        type={isShowValue ? "text" : "password"}
      />
      <label>{name}</label>

      {isPasswordInput ? (
        <span
          className="passwordEyeIcon"
          onClick={() => setIsShowValue((prevValue) => !prevValue)}
        >
          {isShowValue ? <EyeShownIcon /> : <EyeHideIcon />}
        </span>
      ) : null}
    </div>
  );
};

FormField.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
};
