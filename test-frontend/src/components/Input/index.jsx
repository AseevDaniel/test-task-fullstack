import PropTypes from "prop-types";
import "./input.scss";

export const Input = ({ isError, innerRef, ...props }) => {
  return (
    <>
      <input
        className={`input ${isError ? "input-error" : ""}`}
        {...props}
        ref={innerRef}
      />
    </>
  );
};

Input.propTypes = {
  isError: PropTypes.bool,
  innerRef: PropTypes.object,
};
