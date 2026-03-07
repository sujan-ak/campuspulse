import { useAuth } from "@/contexts/AuthContext";
import { useUserProfile } from "@/hooks/useUserProfile";
import StudentDashboard from "./StudentDashboard";
import TeacherDashboard from "./TeacherDashboard";

const Dashboard = () => {
  const { user } = useAuth();
  const { profile, loading } = useUserProfile(user?.id);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", width: "100%" }}>
        <div style={{ width: "24px", height: "24px", border: "3px solid rgba(26,110,245,.3)", borderTopColor: "#1a6ef5", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const role = profile?.role || "student";

  return (
    <div style={{ width: "100%" }}>
      {/* Dashboard Content */}
      {role === "student" ? <StudentDashboard /> : <TeacherDashboard />}
    </div>
  );
};

export default Dashboard;
