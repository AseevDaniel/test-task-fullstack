import PropTypes from "prop-types";
import "./error-permissions.scss";

export const ErrorPermissions = ({
  title,
  currentPermissions,
  errorMessages,
}) => {
  return (
    <div className="error-field">
      <h3>{title}</h3>
      <ul>
        {errorMessages?.map((error) => {
          const isValidCurrentPermission = currentPermissions[error.name];

          return (
            <li
              className={`permission ${isValidCurrentPermission ? "permission--valid" : ""}`}
              key={error.name}
            >
              {error.message}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

ErrorPermissions.propTypes = {
  title: PropTypes.string,
  currentPermissions: PropTypes.object,
  errorMessages: PropTypes.array,
};
