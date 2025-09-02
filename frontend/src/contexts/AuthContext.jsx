"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { loginApi, signupApi } from "../api/authApi"; // Import API functions
import { Navigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem("user-token");
    const userData = sessionStorage.getItem("user-data");

    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setIsLoading(false);
  }, []);

  const login = async (identifier, password) => {
    const result = await loginApi(identifier, password);

    if (result.success && result.token) {
      const { token, user } = result;
      sessionStorage.setItem("user-token", token);
      sessionStorage.setItem("user-data", JSON.stringify(user));
      setUser(user);
      return { success: true };
    }

    return { success: false, error: result.error };
  };

  const signup = async ( name, email, phone, password,role ) => {
    // console.log(name,email,phone,password,role)
  // Prepare payload with only the fields provided
  const payload = { name, password,role };

  if (email) {
    payload.email = email;
  }
  if (phone) {
    payload.phone = phone;
  }



  const result = await signupApi(payload);

  if (result.success && result.token) {
    const { token, user } = result;
    sessionStorage.setItem("user-token", token);
    sessionStorage.setItem("user-data", JSON.stringify(user));
    setUser(user);
    return { success: true };
  }

  return { success: false, error: result.error };
};


  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("user-token");
    sessionStorage.removeItem("user-data");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
