import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { DashboardLayout } from "@/components/DashboardLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Attendance from "./pages/Attendance";
import Activities from "./pages/Activities";
import Analytics from "./pages/Analytics";
import QRAttendance from "./pages/QRAttendance";
import CreateSession from "./pages/CreateSession";
import AttendanceMonitor from "./pages/AttendanceMonitor";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/attendance" element={<ProtectedRoute allowedRole="student"><Attendance /></ProtectedRoute>} />
              <Route path="/qr-attendance" element={<ProtectedRoute allowedRole="teacher"><QRAttendance /></ProtectedRoute>} />
              <Route path="/qr-attendance/:sessionId" element={<ProtectedRoute allowedRole="teacher"><QRAttendance /></ProtectedRoute>} />
              <Route path="/create-session" element={<ProtectedRoute allowedRole="teacher"><CreateSession /></ProtectedRoute>} />
              <Route path="/attendance-monitor" element={<ProtectedRoute allowedRole="teacher"><AttendanceMonitor /></ProtectedRoute>} />
              <Route path="/activities" element={<ProtectedRoute allowedRole="student"><Activities /></ProtectedRoute>} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;