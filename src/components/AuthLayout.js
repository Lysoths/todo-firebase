import { Outlet, Navigate } from "react-router-dom";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
const AuthLayout = () => {
  const [user, isLoading] = useAuthState(auth);
  if (isLoading) {
    return <h1>Lütfen Bekleyiniz...</h1>;
  }
  if (user) {
    return <Navigate to='/' replace />;
  }
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
