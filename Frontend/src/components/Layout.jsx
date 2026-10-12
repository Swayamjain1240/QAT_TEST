
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";

function Layout() {
  return (
    <div className="app-layout">
      
      <Navbar />

      
      <main className="main-content">
        <Outlet />
      </main>

     
      <footer className="footer">
        <p>
          © {new Date().getFullYear()} QAT Authentication System
        </p>
      </footer>
    </div>
  );
}

export default Layout;
