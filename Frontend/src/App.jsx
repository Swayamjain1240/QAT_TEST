
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes
} from "react-router-dom";

import { AuthProvider } from "./context/authContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Layout from "./components/Layout.jsx";
import AuthForm from "./pages/AuthForm.jsx";
import RoleDashboard from "./pages/RoleDashborad.jsx";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>

          {/* Public Routes */}
          <Route
            path="/login"
            element={<AuthForm mode="login" />}
          />

          <Route
            path="/register"
            element={<AuthForm mode="register" />}
          />

          {/* All authenticated users */}
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>

              {/* User Dashboard */}
              <Route
                path="/dashboard"
                element={<RoleDashboard role="user" />}
              />

              {/* Manager and Admin Dashboard */}
              <Route
                element={
                  <ProtectedRoute
                    allowedRoles={["manager", "admin"]}
                  />
                }
              >
                <Route
                  path="/manager"
                  element={
                    <RoleDashboard role="manager" />
                  }
                />
              </Route>

              {/* Admin Dashboard */}
              <Route
                element={
                  <ProtectedRoute
                    allowedRoles={["admin"]}
                  />
                }
              >
                <Route
                  path="/admin"
                  element={
                    <RoleDashboard role="admin" />
                  }
                />
              </Route>

            </Route>
          </Route>

          {/* Unknown routes */}
          <Route
            path="*"
            element={
              <Navigate to="/dashboard" replace />
            }
          />

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
