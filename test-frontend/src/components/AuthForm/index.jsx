import PropTypes from "prop-types";
import { useState } from "react";
import {
  emailPattern,
  getIsSuccsessPattern,
  passwordPattern,
} from "@/helpers/patterns.js";
import { EMAIL_ERRORS, PASSWORD_ERRORS } from "@/constants/errors.js";
import { FormField } from "../FormField";
import { ErrorPermissions } from "../ErrorPermissions";
import { Button } from "../Button";
import { LinkItem } from "../LinkItem/";
import "./auth-form.scss";

export const AuthForm = ({ formContent }) => {
  const { formDataContent, isShowFieldsRules, onSubmit, redirectLink } =
    formContent;

  const [isFirstSubmit, setIsFirstSubmit] = useState(true);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const isEmailCorrect = getIsSuccsessPattern(emailPattern(input.email));
  const isPasswordCorrect = getIsSuccsessPattern(
    passwordPattern(input.password),
  );

  const isEmailError = !isEmailCorrect && !isFirstSubmit;
  const isPasswordError = !isPasswordCorrect && !isFirstSubmit;
  const isDisableSubmit = isEmailError | isPasswordError;

  const isShownErrorField = isShowFieldsRules || isDisableSubmit;

  const handleSubmitEvent = (e) => {
    e.preventDefault();

    setIsFirstSubmit(false);
    if (isEmailCorrect && isPasswordCorrect) {
      console.log(input);
      onSubmit(input);
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="authForm">
      <h2>{formDataContent.title}</h2>
      <form className="form" onSubmit={handleSubmitEvent}>
        <div className="formControl">
          <FormField
            name="email"
            onChange={handleInput}
            isError={isEmailError}
          />
          {isShownErrorField ? (
            <ErrorPermissions
              currentPermissions={emailPattern(input.email)}
              errorMessages={EMAIL_ERRORS}
            />
          ) : null}
        </div>
        <div className="formControl">
          <FormField
            name="password"
            type="password"
            onChange={handleInput}
            isError={isPasswordError}
          />
          {isShownErrorField ? (
            <ErrorPermissions
              title="Your password should:"
              currentPermissions={passwordPattern(input.password)}
              errorMessages={PASSWORD_ERRORS}
            />
          ) : null}
        </div>
        <Button disabled={isDisableSubmit} type="submit">
          {formContent.submitButtonText || "Submit"}
        </Button>

        {redirectLink ? (
          <span className="anotherPageLink">
            {formDataContent?.linkText}{" "}
            <LinkItem to={redirectLink}>{formDataContent?.linkValue}</LinkItem>
          </span>
        ) : null}
      </form>
    </div>
  );
};

AuthForm.propTypes = {
  formContent: PropTypes.shape({
    formDataContent: PropTypes.object,
    isShowFieldsRules: PropTypes.bool,
    onSubmit: PropTypes.func,
    redirectLink: PropTypes.string,
    submitButtonText: PropTypes.string,
  }),
};
