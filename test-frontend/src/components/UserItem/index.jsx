import PropTypes from "prop-types";
import { useState } from "react";
import { useAuth } from "@/store/AuthProvider.jsx";
import { LogoutIcon, SettingsIcon } from "@/assets/icons";
import { UserSettings } from "./components/UserSettings/index.jsx";
import "./user-item.scss";

export const UserItem = ({ user }) => {
  const [isUserSettingsActive, setIsUserSettingsActive] = useState(false);
  const { logOut } = useAuth();

  if (!user) return null;

  return (
    <div className="userItem">
      <div className="userField">
        <SettingsIcon
          onClick={() => setIsUserSettingsActive(!isUserSettingsActive)}
          title="User Settings"
          className="userField--icon settingsIcon"
        />
        <span>{user?.email}</span>
        <LogoutIcon onClick={logOut} className="userField--icon logoutIcon" />
      </div>
      <UserSettings isActive={isUserSettingsActive} />
    </div>
  );
};

UserItem.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
  }),
};
