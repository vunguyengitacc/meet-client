import { RootState } from "app/reduxStore";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AuthEntry = () => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  return !isAuth ? <Outlet /> : <Navigate to="/app" />;
};

export default AuthEntry;
