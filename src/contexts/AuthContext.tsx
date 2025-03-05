import React, { useState, useEffect, createContext, useContext, ReactNode } from "react";
import axios from "axios";

// Define the types for the user and response data
interface User {
  id: string;
  username: string;
  email: string;
  // Add other properties depending on the user object structure
}

interface AuthResponse {
  status: boolean;
  token: string;
  user: User;
  message: any;
}

// Define the Auth context type
interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ message: any; status: boolean }>;
  register: (data: any) => Promise<{ message: any; status: boolean }>;
  editAccaunt: (data: any) => Promise<{ message: any; status: boolean }>;
  logout: () => void;
  token: string;
}

// Create the AuthContext with the type
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");

  const getUser = async () => {
    const local_token = localStorage.getItem("token");
    console.log(local_token)
    try {
      const response = await axios.get<User>(`/api/getProfileInfo`, {
        headers: {
          Authorization: `Bearer ${local_token}`,
        },
      });
      console.log(response.data, 'response')
      setUser(response.data);
    } catch (error: any) {
      if (error.response?.status === 403) localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true)
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    };

    let responseData: { message: string; status: boolean } = { message: "", status: false };
    try {
      const response = await fetch(`${import.meta.env.VITE_URL}/login`, requestOptions);
      const result: AuthResponse = await response.json();

      responseData = { message: result.message, status: result.status };
      console.log(result)
      if (!result.message) {
        setToken(result.token);
        localStorage.setItem("token", result.token);
        setUser(result.user);
        setIsAuthenticated(true);
      }
    } catch (error) {
      responseData = { message: "Server Error", status: false };
    } finally {
      setLoading(false)
    }
    return responseData;
  };

  const editAccaunt = async (data: any) => {
    setLoading(true)
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data),
    };

    let responseData: { message: string; status: boolean } = { message: "", status: false };
    try {
      const response = await fetch(`/api/editProfileInfo`, requestOptions);
      const result: any = await response.json();
      responseData = { message: result.errors, status: result.status };
      if (!result.errors) {
        // setUser(result.user);
      }
    } catch (error) {
      responseData = { message: "Server Error", status: false };
    } finally {
      setLoading(false)
    }
    return responseData;
  };


  const register = async (data: any) => {
    setLoading(true)
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    let responseData: { message: string; status: boolean } = { message: "", status: false };
    try {
      const response = await fetch(`${import.meta.env.VITE_URL}/register`, requestOptions);
      const result: any = await response.json();
      console.log(result, 'response')
      responseData = { message: result.errors, status: result.status };
      if (!result.errors) {
        setToken(result.token);
        localStorage.setItem("token", result.token);
        setUser(result.user);
        setIsAuthenticated(true);
      }
    } catch (error) {
      responseData = { message: "Server Error", status: false };
    } finally {
      setLoading(false)
    }
    return responseData;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setToken("");
    setUser(null);
  };

  useEffect(() => {
    const local_token = localStorage.getItem("token");
    setToken(local_token || "");
    if (local_token) setIsAuthenticated(true);
    else setIsAuthenticated(false);
    getUser();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, login, logout, token, register, editAccaunt }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
