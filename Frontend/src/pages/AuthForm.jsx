
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx";

function AuthForm({ mode = "login" }) {
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const isRegister = mode === "register";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle login and registration
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let result;

      if (isRegister) {
        result = await register(
          formData.name,
          formData.email,
          formData.password
        );
      } else {
        result = await login(
          formData.email,
          formData.password
        );
      }

      // Navigate according to authenticated role
      const role = result.user.role;

      if (role === "admin") {
        navigate("/admin", { replace: true });
      } else if (role === "manager") {
        navigate("/manager", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-container">
      <div className="auth-card">
        <h1>
          {isRegister ? "Create Account" : "Welcome Back"}
        </h1>

        <p>
          {isRegister
            ? "Register to access your dashboard"
            : "Login to your QAT account"}
        </p>

        <form onSubmit={handleSubmit}>

          {isRegister && (
            <>
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                maxLength={80}
                required
              />
            </>
          )}

          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            autoComplete={
              isRegister ? "new-password" : "current-password"
            }
            minLength={isRegister ? 8 : undefined}
            maxLength={isRegister ? 72 : undefined}
            required
          />

          {error && (
            <p className="error" role="alert">
              {error}
            </p>
          )}

          <button type="submit" disabled={loading}>
            {loading
              ? "Please wait..."
              : isRegister
              ? "Create Account"
              : "Login"}
          </button>
        </form>

        <p className="auth-switch">
          {isRegister ? (
            <>
              Already have an account?{" "}
              <Link to="/login">Login</Link>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <Link to="/register">Register</Link>
            </>
          )}
        </p>
      </div>
    </main>
  );
}

export default AuthForm;
