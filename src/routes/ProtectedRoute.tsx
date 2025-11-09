import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const token = localStorage.getItem("accessTokenAdmin");
  return token ? <Outlet /> : <Navigate to="/admin/sign-in" replace />;
}
