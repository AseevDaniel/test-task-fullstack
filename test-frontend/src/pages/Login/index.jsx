import { AuthForm } from "@/components/index.js";
import { ROUTES } from "@/constants/routes.js";
import { LOGIN_TEXT_CONTENT } from "@/constants/textContent.js";
import { useAuth } from "@/store/AuthProvider.jsx";
import "./login.scss";

export const Login = () => {
  const { loginAction } = useAuth();

  const loginFormContent = {
    formDataContent: LOGIN_TEXT_CONTENT,
    isShowFieldsRules: false,
    onSubmit: loginAction,
    redirectLink: ROUTES.REGISTER,
  };

  return (
    <div className="authPage login">
      <AuthForm formContent={loginFormContent} />
    </div>
  );
};
