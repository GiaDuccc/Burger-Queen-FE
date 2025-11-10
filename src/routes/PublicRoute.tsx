import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoute() {
  const token = localStorage.getItem("accessTokenAdmin");
  if (!token) {
    return <Outlet />;
  }
  const employee = jwtDecode(token || "") as { branchId: string, role: string };
  if (employee?.role !== 'manager') {
    return <Navigate to={`/admin/branch/${employee.branchId}`} replace />;
  }
  return <Navigate to="/admin/dashboard" replace />;
}
