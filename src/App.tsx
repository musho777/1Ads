import Dashboard from './components/Dashboard';
import Home from './pages/home/index'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from "./contexts/AuthContext";


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" >
            <Route index element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;