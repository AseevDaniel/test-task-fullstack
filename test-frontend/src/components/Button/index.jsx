import PropTypes from "prop-types";
import "./button.scss";

export const Button = ({ children, ...props }) => {
  return (
    <button className="button" {...props}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.string,
};
