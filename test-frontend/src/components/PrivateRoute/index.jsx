import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/store/AuthProvider.jsx";
import { ROUTES } from "@/constants/routes.js";
import { usePageState } from "@/store/PageStateProvider.jsx";
import { PRIVATE_ROUTE_ERROR } from "@/constants/errors.js";

export const PrivateRoute = () => {
  const user = useAuth();
  const { callActionStatusPopup } = usePageState();
  if (!user.token) {
    callActionStatusPopup(false, PRIVATE_ROUTE_ERROR);

    return <Navigate to={ROUTES.LOGIN} />;
  }
  return <Outlet />;
};
