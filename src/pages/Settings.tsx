import { useState } from "react";
import { GlowCard } from "@/components/GlowCard";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useUserProfile } from "@/hooks/useUserProfile";

export default function Settings() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { profile, loading } = useUserProfile(user?.id);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(profile?.name || "");
  const [email, setEmail] = useState(profile?.email || "");
  const [studentId, setStudentId] = useState(profile?.student_id || profile?.teacher_id || "");
  const [role, setRole] = useState<string>(profile?.role || "student");

  const handleSave = () => {
    setEditing(false);
    // Save logic here
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      // Delete account logic
      navigate("/");
    }
  };

  return (
    <div style={{ width: "100%", fontFamily: "'Sora', 'Inter', sans-serif", color: "#fff" }}>
      
      {/* Header */}
      <div style={{ marginBottom: "26px" }}>
        <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: "1.45rem", fontWeight: 800, margin: 0, marginBottom: "3px" }}>
          Settings & <span style={{ color: "#0fb8c9" }}>Preferences</span>
        </h1>
        <p style={{ fontSize: ".83rem", color: "rgba(255,255,255,.65)", margin: 0 }}>
          Manage your account settings and preferences
        </p>
      </div>

      <div style={{ maxWidth: "800px", display: "flex", flexDirection: "column", gap: "20px" }}>
        
        {/* Profile Section */}
        <GlowCard style={{ background: "rgba(255,255,255,.055)", border: "1px solid rgba(255,255,255,.11)", borderRadius: "16px", overflow: "hidden" }}>
          <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,.08)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0fb8c9" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: "1rem", fontWeight: 700, margin: 0 }}>Profile</h2>
            </div>
            {!editing && (
              <button onClick={() => setEditing(true)} style={{ padding: "8px 16px", borderRadius: "8px", border: "1px solid rgba(26,110,245,0.3)", background: "rgba(26,110,245,0.15)", color: "#60a5fa", fontSize: "13px", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
                Edit Profile
              </button>
            )}
          </div>
          <div style={{ padding: "24px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} disabled={!editing} style={{ background: editing ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "9px", color: "#fff", fontSize: "14px", padding: "10px 13px", outline: "none" }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={!editing} style={{ background: editing ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "9px", color: "#fff", fontSize: "14px", padding: "10px 13px", outline: "none" }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>{role === "Student" ? "Student ID" : "Teacher ID"}</label>
                <input type="text" value={studentId} onChange={(e) => setStudentId(e.target.value)} disabled={!editing} style={{ background: editing ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "9px", color: "#fff", fontSize: "14px", padding: "10px 13px", outline: "none" }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>Role</label>
                <select value={role} onChange={(e) => setRole(e.target.value)} disabled={!editing} style={{ background: editing ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "9px", color: "#fff", fontSize: "14px", padding: "10px 13px", outline: "none", cursor: editing ? "pointer" : "not-allowed" }}>
                  <option value="Student">Student</option>
                  <option value="Teacher">Teacher</option>
                </select>
              </div>
            </div>
            {editing && (
              <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                <button onClick={handleSave} style={{ flex: 1, padding: "11px", borderRadius: "9px", border: "none", background: "linear-gradient(135deg, #0fb8c9, #1d4ed8)", color: "#fff", fontSize: "14px", fontWeight: 600, cursor: "pointer", boxShadow: "0 0 16px rgba(15,184,201,0.4)" }}>
                  Save Changes
                </button>
                <button onClick={() => setEditing(false)} style={{ flex: 1, padding: "11px", borderRadius: "9px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.7)", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}>
                  Cancel
                </button>
              </div>
            )}
          </div>
        </GlowCard>

        {/* Account Section */}
        <GlowCard style={{ background: "rgba(255,255,255,.055)", border: "1px solid rgba(255,255,255,.11)", borderRadius: "16px", overflow: "hidden" }} glowColor="rgba(245, 158, 11, 0.3)">
          <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,.08)", display: "flex", alignItems: "center", gap: "10px" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: "1rem", fontWeight: 700, margin: 0 }}>Account</h2>
          </div>
          <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "12px" }}>
            <button style={{ width: "100%", padding: "12px 16px", borderRadius: "9px", border: "1px solid rgba(245,158,11,0.25)", background: "rgba(245,158,11,0.12)", color: "#fbbf24", fontSize: "14px", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", textAlign: "left" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              Change Password
            </button>
            <button onClick={handleLogout} style={{ width: "100%", padding: "12px 16px", borderRadius: "9px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.7)", fontSize: "14px", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", textAlign: "left" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Logout
            </button>
          </div>
        </GlowCard>

        {/* Optional - Delete Account */}
        <GlowCard style={{ background: "rgba(239,68,68,.08)", border: "1px solid rgba(239,68,68,.2)", borderRadius: "16px", overflow: "hidden" }} glowColor="rgba(239, 68, 68, 0.3)">
          <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(239,68,68,.15)", display: "flex", alignItems: "center", gap: "10px" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: "1rem", fontWeight: 700, margin: 0, color: "#ef4444" }}>Danger Zone</h2>
          </div>
          <div style={{ padding: "24px" }}>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", marginBottom: "16px", lineHeight: 1.6 }}>
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <button onClick={handleDeleteAccount} style={{ width: "100%", padding: "12px 16px", borderRadius: "9px", border: "1px solid rgba(239,68,68,0.3)", background: "rgba(239,68,68,0.15)", color: "#ef4444", fontSize: "14px", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", justifyContent: "center" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                <line x1="10" y1="11" x2="10" y2="17"/>
                <line x1="14" y1="11" x2="14" y2="17"/>
              </svg>
              Delete Account
            </button>
          </div>
        </GlowCard>

      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap');
        input:disabled, select:disabled { cursor: not-allowed; opacity: 0.6; }
      `}</style>
    </div>
  );
}
