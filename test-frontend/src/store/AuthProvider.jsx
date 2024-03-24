import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { ROUTES } from "@/constants/routes.js";
import { usePageState } from "./PageStateProvider.jsx";
import { loginRequest, registerRequest, updateRequest } from "@/api/auth";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const { setIsLoading, callActionStatusPopup } = usePageState();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null,
  );
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const navigate = useNavigate();

  const authUserSharedOperation = (data, isNewData = false) => {
    console.log(data);

    if (data?.status === "error") {
      callActionStatusPopup(false, data.message);
      return;
    }

    callActionStatusPopup(true, data.message);

    if (isNewData) {
      logOut();
      return;
    }

    const {user, token} = data

    setUser(user);
    setToken(token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    navigate(ROUTES.HOME);
  };

  const onActionShared = () => {
    setIsLoading(true);
  };
  const onFinally = () => {
    setIsLoading(false);
  };

  const onCatch = (err) => {
    callActionStatusPopup(false, err.response.data.message || err.message);
  };

  const loginAction = async (data) => {
    onActionShared();
    loginRequest({
      data,
      onPost: (res) => {
        authUserSharedOperation(res);
      },
      onFinally,
      onCatch,
    });
  };

  const updateAction = async (data) => {
    onActionShared();
    updateRequest({
      data,
      onPost: (res) => {
        authUserSharedOperation(res, true);
      },
      onFinally,
      onCatch,
    });
  };

  const registerAction = async (data) => {
    onActionShared();
    registerRequest({
      data,
      onPost: (res) => {
        console.log(res);

        authUserSharedOperation(res, true);
      },
      onFinally,
      onCatch,
    });
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate(ROUTES.LOGIN);
  };

  return (
    <AuthContext.Provider
      value={{ token, user, loginAction, updateAction, registerAction, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

AuthProvider.propTypes = {
  children: PropTypes.element,
};

export default AuthProvider;
