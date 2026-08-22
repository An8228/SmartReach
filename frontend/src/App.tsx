import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Campaigns from "./pages/Campaigns";
import Insights from "./pages/Insights";
import ComingSoon from "./pages/ComingSoon";
import NotFound from "./pages/NotFound";
export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-background text-text-primary">
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/campaigns" element={<ProtectedRoute><Campaigns /></ProtectedRoute>} />
          <Route path="/insights" element={<ProtectedRoute><Insights /></ProtectedRoute>} />
          <Route path="/audiences" element={<ProtectedRoute><ComingSoon title="Audiences" /></ProtectedRoute>} />
          <Route path="/reports" element={<ProtectedRoute><ComingSoon title="Reports" /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}