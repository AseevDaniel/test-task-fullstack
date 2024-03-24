import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./link-item.scss";

export const LinkItem = ({ children, ...props }) => {
  return (
    <Link className="linkItem" {...props}>
      {children}
    </Link>
  );
};

LinkItem.propTypes = {
  children: PropTypes.string,
};
