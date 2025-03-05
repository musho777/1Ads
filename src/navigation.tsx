import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import { Navigate } from "react-router-dom";
import Dashboard from './components/Dashboard';
import { useAuth } from './contexts/AuthContext';

export const Navigation = () => {
  const { isAuthenticated } = useAuth()
  // const isAuthenticated = !!localStorage.getItem("token");
  return <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={!isAuthenticated ? <Home /> : <Navigate to="/dashboard" replace />}
      />
      <Route
        path="/dashboard"
        element={isAuthenticated ? <Dashboard /> : <Navigate to="/" replace />}
      />
    </Routes>
  </BrowserRouter>
}