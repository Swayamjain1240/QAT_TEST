
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <nav className="navbar">
      
      <NavLink to="/dashboard" className="brand">
        QAT Auth System
      </NavLink>

  
      <div className="nav-links">
        
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          User Dashboard
        </NavLink>

        
        {["manager", "admin"].includes(user?.role) && (
          <NavLink
            to="/manager"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Manager Dashboard
          </NavLink>
        )}

        
        {user?.role === "admin" && (
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Admin Dashboard
          </NavLink>
        )}

        
        <span className="nav-user">
          {user?.name}
        </span>

      
        <button
          type="button"
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
