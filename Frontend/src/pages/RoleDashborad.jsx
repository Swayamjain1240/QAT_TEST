
import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext.jsx";
import api from "../api/axios.js";

const roleConfig = {
  user: {
    title: "User Dashboard",
    description: "Welcome to your personal dashboard.",
    endpoint: "/auth/user"
  },
  manager: {
    title: "Manager Dashboard",
    description: "Welcome to the management dashboard.",
    endpoint: "/auth/manager"
  },
  admin: {
    title: "Admin Dashboard",
    description: "Welcome to the administration dashboard.",
    endpoint: "/auth/admin"
  }
};

function RoleDashboard({ role = "user" }) {
  const { user } = useAuth();

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const config = roleConfig[role];

  useEffect(() => {
    if (!config) return;

    const controller = new AbortController();

    const fetchDashboard = async () => {
      setLoading(true);
      setError("");
      setMessage("");

      try {
        const { data } = await api.get(config.endpoint, {
          signal: controller.signal
        });

        if (!controller.signal.aborted) {
          setMessage(data.message);
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(
            err.response?.data?.message ||
            "Failed to load dashboard"
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchDashboard();

    return () => controller.abort();
  }, [config]);

  if (!config) {
    return <p className="error">Invalid dashboard role.</p>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>{config.title}</h1>

        <p>{config.description}</p>

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
        <h3>Dashboard Access Status</h3>

        {loading && <p>Verifying access...</p>}

        {!loading && error && (
          <p className="error" role="alert">
            {error}
          </p>
        )}

        {!loading && !error && (
          <p className="success">
            {message || "Access granted"}
          </p>
        )}
      </div>
    </div>
  );
}

export default RoleDashboard;
