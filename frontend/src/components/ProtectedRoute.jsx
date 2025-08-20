import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();

  // user မရှိရင် Login သို့ပို့မယ်
  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }



  return children;
}
