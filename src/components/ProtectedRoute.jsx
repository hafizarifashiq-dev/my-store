import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({
  children,
  allowedRoles = [],
}) {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return (
      <Navigate
        to="/signin"
        replace
      />
    );
  }

  if (
    allowedRoles.length > 0 &&
    !allowedRoles.includes(
      currentUser.role
    )
  ) {
    return (
      <Navigate
        to="/access-denied"
        replace
      />
    );
  }

  return children;
}

export default ProtectedRoute;