
import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext.jsx";
import api from "../api/axios.js";

function Dashboard() {
  const { user } = useAuth();

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const fetchDashboard = async () => {
      try {
        const { data } = await api.get("/auth/user");

        if (active) {
          setMessage(data.message);
        }
      } catch (err) {
        if (active) {
          setError(
            err.response?.data?.message ||
            "Failed to load dashboard"
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchDashboard();

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>User Dashboard</h1>
        <p>Welcome back, {user?.name}!</p>
        <span className="role-badge">
          {user?.role?.toUpperCase()}
        </span>
      </div>

      <div className="dashboard-grid">
        <div className="info-card">
          <h3>Full Name</h3>
          <p>{user?.name}</p>
        </div>

        <div className="info-card">
          <h3>Email Address</h3>
          <p>{user?.email}</p>
        </div>

        <div className="info-card">
          <h3>Account Role</h3>
          <p>{user?.role}</p>
        </div>
      </div>

      <div className="info-card">
        <h3>Authentication Status</h3>

        {loading && <p>Loading dashboard...</p>}

        {!loading && error && (
          <p className="error" role="alert">
            {error}
          </p>
        )}

        {!loading && !error && (
          <p className="success">
            {message || "Authenticated successfully"}
          </p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
