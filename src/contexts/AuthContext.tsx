import React, { useState, useEffect, createContext, useContext, ReactNode } from "react";
import axios from "axios";

// Define the types for the user and response data
interface User {
  id: string;
  username: string;
  email: string;
  data: any,
  allTimeStatistic: any,
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
  loadingEdit: boolean;
  login: (email: string, password: string) => Promise<{ message: any; status: boolean }>;
  register: (data: any) => Promise<{ message: any; status: boolean }>;
  editAccaunt: (data: any) => Promise<{ message: any; status: any }>;
  logout: () => void;
  token: string;
  id: string;
  successEdit: boolean,
  ChaneUserData: any,
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
  const [id, setId] = useState(null)
  const [loadingEdit, setLoadingEdit] = useState(false)
  const API_URL = import.meta.env.VITE_URL;

  // const getUser = async () => {
  //   setLoading(true)
  //   const local_token = localStorage.getItem("token");
  //   const id = localStorage.getItem("id");
  //   try {
  //     const response = await axios.get<User>(`/api/getProfileInfo?token=${local_token}&&user_id=${id}`);
  //     setUser(response.data);
  //   } catch (error: any) {
  //     if (error.response?.status === 403) localStorage.removeItem("token");
  //     setUser(null);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const getUser = async () => {
    setLoading(true);
    const local_token = localStorage.getItem("token");
    const id = localStorage.getItem("id");

    try {
      const res = await fetch(`${API_URL}/api/getProfileInfo?token=${local_token}&&user_id=${id}`);
      if (res.status === 403) {
        localStorage.removeItem("token");
        setUser(null);
      } else if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      } else {
        const data = await res.json();
        setUser(data);
      }
    } catch (error) {
      console.error(error);
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
      const response = await fetch(`${API_URL}/api/login`, requestOptions);
      const result: AuthResponse = await response.json();

      responseData = { message: result.message, status: result.status };
      if (!result.message) {
        setToken(result.token);
        setId(result.user.id)
        localStorage.setItem("token", result.token);
        localStorage.setItem("id", result.user.id);

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
    setLoadingEdit(true)
    const id = localStorage.getItem("id")
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    let responseData: { message: string; status: boolean } = { message: "", status: false };
    try {
      const response = await fetch(`${API_URL}/api/editProfileInfo?token=${token}&&user_id=${id}`, requestOptions);
      const result: any = await response.json();
      let item = { ...user }
      item.data.username = result.data.username
      setUser(item)
      responseData = { message: result.errors, status: result.status };
      // getUser()
      if (!result.errors) {
        return { message: "success", status: true }
      }
    } catch (error) {
      responseData = { message: "", status: false };
    } finally {
      setLoadingEdit(false)
    }
    return responseData;
  };

  const ChaneUserData = (key: any, value: any) => {
    let item = { ...user }
    if (key == "balance") {
      let budget_balance = +item.data.get_budget[0].budget_balance
      // let budget = +item.data.get_budget[0].budget
      budget_balance -= value
      // budget += +value
      item.data.get_budget[0].budget_balance = budget_balance
      // item.data.get_budget[0].budget = budget

    }
    else {
      item.data.get_profile_setting[0].notify_by_email = value.notifcation
      item.data.get_profile_setting[0].automatically_increase_CPM = value.autoNotifcation
    }
    setUser(item)
  }


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
      const response = await fetch(`${API_URL}/api/register`, requestOptions);
      const result: any = await response.json();
      responseData = { message: result.errors, status: result.status };
      if (response.ok) {
        setToken(result.token);
        setId(result.user.id)
        localStorage.setItem("token", result.token);
        localStorage.setItem("id", result.user.id);

        setUser(result.user);
        setIsAuthenticated(true);
      }
      else {
        responseData = { message: result.message, status: false };
        setIsAuthenticated(false);
        setUser(null);

      }
    } catch (error) {
      responseData = { message: "Server Error", status: false };
    } finally {
      setLoading(false)
    }
    return responseData;
  };

  const logout = async () => {
    const id = localStorage.getItem("id")
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setToken("");
    setId("")
    setUser(null);
    await fetch(`${API_URL}/api/logout?token=${token}&user_id=${id}`);
  };

  useEffect(() => {
    const local_token = localStorage.getItem("token");
    const ids = localStorage.getItem("id");
    setToken(local_token || "");
    setId(ids || "")
    if (local_token) setIsAuthenticated(true);
    else setIsAuthenticated(false);
    if (local_token && ids) {
      getUser();
    }
  }, [isAuthenticated, token]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, login, logout, token, register, editAccaunt, loadingEdit, ChaneUserData }}>
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
