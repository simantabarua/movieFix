import React from "react";
import { Navigate } from "react-router";
import { useAppSelector } from "../redux/hook";

type PrivateRouteProps = {
  children: React.ReactNode;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const user = useAppSelector((state) => state.auth.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
