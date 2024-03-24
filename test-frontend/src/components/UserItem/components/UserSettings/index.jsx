import { useState } from "react";
import PropTypes from "prop-types";
import { AuthForm } from "@/components/AuthForm/index.jsx";
import { useDelayedUnmount } from "@/hooks/useDelayedUnmount.jsx";
import { UPDATE_DATA_TEXT_CONTENT } from "@/constants/textContent.js";
import { useAuth } from "@/store/AuthProvider.jsx";
import { usePageState } from "@/store/PageStateProvider.jsx";
import { ConfirmPassword } from "../ConfirmPassword/index.jsx";
import "./user-settings.scss";

export const UserSettings = ({ isActive }) => {
  const { user } = useAuth();
  const { updateAction } = useAuth();
  const { setModalData } = usePageState();
  const { isHide, isComponentShown } = useDelayedUnmount(isActive);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const setNewUserData = (newInput) => {
    // console.log(newInput);
    setInput(newInput);
    setModalData(<ConfirmPassword onEnter={confirmUserPassword} />);
  };

  const confirmUserPassword = (oldPassword) => {
    setModalData(null);
    updateAction({ ...input, oldPassword, userEmail: user.email});
  };

  if (!isComponentShown) return null;

  const updateDataFormContent = {
    formDataContent: UPDATE_DATA_TEXT_CONTENT,
    isShowFieldsRules: false,
    onSubmit: setNewUserData,
    submitButtonText: "Update info",
  };

  return (
    <div className={`userSettings ${isHide ? "hideBlock" : ""}`}>
      <AuthForm formContent={updateDataFormContent} />
    </div>
  );
};

UserSettings.propTypes = {
  isActive: PropTypes.bool,
};
