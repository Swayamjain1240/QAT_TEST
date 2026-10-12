
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx";

function ProtectedRoute({ allowedRoles }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading">
        <h3>Checking authentication...</h3>
        <p>Please wait while we verify your session.</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (
    allowedRoles &&
    !allowedRoles.includes(user.role)
  ) {
    return <Navigate to="/dashboard" replace />;
  }
  return <Outlet />;
}

export default ProtectedRoute;
