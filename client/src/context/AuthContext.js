import React, { createContext, useState, useContext, useEffect } from "react";
import { trackDetailedUserAction } from "../utils/analytics";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser && storedUser !== "undefined") {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setToken(storedToken);
      } catch (error) {
        console.error("Error parsing stored user:", error);
        // fallback: clear local storage data if corrupted
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }
    setIsLoading(false);
  }, []);

  const login = (userData, authToken) => {
    console.log("userDat", userData);
    setUser(userData);
    setToken(authToken);
    localStorage.setItem("token", authToken);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("userId", userData._id);
    sessionStorage.setItem("sessionId", Date.now().toString());

    // Track login event
    trackDetailedUserAction("user_login", {
      user_id: userData.id,
      user_role: userData.role,
      login_method: "email",
    });
  };

  const logout = async () => {
    try {
      // Call logout endpoint to invalidate token
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Logout error:", error);
    }

    // Track logout event
    if (user) {
      trackDetailedUserAction("user_logout", {
        user_id: user.id,
        session_duration:
          Date.now() - parseInt(sessionStorage.getItem("sessionId")),
      });
    }

    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    sessionStorage.removeItem("sessionId");
  };

  const value = {
    user,
    token,
    setUser,
    isLoading,
    login,
    logout,
    isAuthenticated: !!token,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
