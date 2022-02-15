import { RootState } from "app/reduxStore";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateEntry = () => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  return isAuth ? <Outlet /> : <Navigate to="/auth/login" />;
};

export default PrivateEntry;
