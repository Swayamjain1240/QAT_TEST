
import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import api from "../api/axios.js";


const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    let active = true;

    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          return;
        }

   
        const { data } = await api.get("/auth/me");

        if (active) {
          setUser(data.user);
        }
      } catch (error) {
        if (active) {
          localStorage.removeItem("token");
          setUser(null);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    checkAuth();

    return () => {
      active = false;
    };
  }, []);


  const register = async (name, email, password) => {
    const { data } = await api.post("/auth/register", {
      name,
      email,
      password
    });

    localStorage.setItem("token", data.token);
    setUser(data.user);

    return data;
  };


  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", {
      email,
      password
    });

    localStorage.setItem("token", data.token);
    setUser(data.user);

    return data;
  };


  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}
