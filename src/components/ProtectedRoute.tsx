import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useUserProfile } from "@/hooks/useUserProfile";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRole?: "student" | "teacher";
}

export function ProtectedRoute({ children, allowedRole }: ProtectedRouteProps) {
  const { user, loading: authLoading } = useAuth();
  const { profile, loading: profileLoading } = useUserProfile(user?.id);

  if (authLoading || profileLoading) {
    return <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", color: "#fff" }}>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && profile) {
    if (profile.role !== allowedRole) {
      if (allowedRole === "student" && profile.role === "teacher") {
        return <Navigate to="/qr-attendance" replace />;
      }
      if (allowedRole === "teacher" && profile.role === "student") {
        return <Navigate to="/attendance" replace />;
      }
      return <Navigate to="/dashboard" replace />;
    }
  }

  return <>{children}</>;
}
