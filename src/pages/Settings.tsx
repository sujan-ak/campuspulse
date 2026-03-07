import { useState, useEffect } from "react";
import { GlowCard } from "@/components/GlowCard";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useUserProfile } from "@/hooks/useUserProfile";
import { supabase } from "@/lib/supabase";
import { User, LogOut, Trash2, Shield, Save, X, Key } from "lucide-react";

export default function Settings() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { profile, loading } = useUserProfile(user?.id);
  const [editing, setEditing] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [studentId, setStudentId] = useState("");
  const [role, setRole] = useState<string>("student");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || "");
      setEmail(profile.email || "");
      setStudentId(profile.student_id || "");
      setRole(profile.role || "student");
    }
  }, [profile]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    setError("");
    try {
      const { error } = await supabase
        .from('users')
        .update({
          full_name: fullName,
          student_id: studentId || null,
          role: role,
        })
        .eq('id', user.id);

      if (error) throw error;
      setEditing(false);
      // Optional: Since there is no global state management like Redux/Zustand that auto-refetches,
      // the useUserProfile hook will still have old data until unmount/remount,
      // but the state inside this component is correctly updated.
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  const handleDeleteAccount = async () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      // In a real app we'd call an edge function since users can't delete themselves easily from client
      // For now, sign out.
      await signOut();
      navigate("/");
    }
  };

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold font-display text-foreground mb-1">
          Settings & <span className="text-primary">Preferences</span>
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          {/* Profile Section */}
          <GlowCard className="overflow-hidden bg-white/5 border border-white/10 rounded-2xl h-full">
            <div className="flex items-center justify-between border-b border-white/10 p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 text-primary">
                  <User size={18} />
                </div>
                <h2 className="font-display text-lg font-semibold text-foreground">Profile</h2>
              </div>
              {!editing && (
                <button
                  onClick={() => setEditing(true)}
                  className="flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary/20"
                >
                  Edit Profile
                </button>
              )}
            </div>
            <div className="p-6">
              {error && (
                <div className="mb-4 rounded-lg bg-destructive/10 p-3 text-sm text-destructive border border-destructive/20">
                  {error}
                </div>
              )}
              <div className="grid gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    disabled={!editing}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-60 transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={true}
                    title="Email cannot be changed"
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-foreground outline-none disabled:cursor-not-allowed disabled:opacity-60"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Student ID</label>
                  <input
                    type="text"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    disabled={!editing || role !== 'student'}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-60 transition-colors"
                    placeholder={role !== 'student' ? 'Not applicable' : 'Enter ID'}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Account Role</label>
                  <div className="flex h-[42px] items-center rounded-lg border border-white/10 bg-white/10 px-3 py-2.5 text-sm font-medium capitalize text-primary">
                    {role}
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1 italic">* Roles are managed by administrators</p>
                </div>
              </div>
              {editing && (
                <div className="mt-6 flex gap-3">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-primary px-4 py-2.5 text-sm font-semibold text-white shadow-glow transition-all hover:opacity-90 disabled:cursor-default disabled:opacity-50"
                  >
                    {saving ? (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                    ) : (
                      <Save size={16} />
                    )}
                    Save Changes
                  </button>
                  <button
                    onClick={() => {
                      setEditing(false);
                      setError("");
                      setFullName(profile?.full_name || "");
                      setStudentId(profile?.student_id || "");
                      setRole(profile?.role || "student");
                    }}
                    disabled={saving}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-muted-foreground transition-all hover:bg-white/10 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <X size={16} />
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </GlowCard>
        </div>

        <div className="space-y-6">
          {/* Account Section */}
          <GlowCard className="overflow-hidden bg-white/5 border border-white/10 rounded-2xl" glowColor="hsl(38 92% 50% / 0.3)">
            <div className="flex items-center gap-3 border-b border-warning/10 p-5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-warning/20 text-warning">
                <Shield size={18} />
              </div>
              <h2 className="font-display text-lg font-semibold text-foreground">Security</h2>
            </div>
            <div className="flex flex-col gap-3 p-6">
              <button
                onClick={() => supabase.auth.resetPasswordForEmail(email)}
                className="flex w-full items-center gap-3 rounded-lg border border-primary/20 bg-primary/10 px-4 py-3 text-left text-sm font-semibold text-primary transition-colors hover:bg-primary/20"
              >
                <Key size={16} />
                Send Password Reset Link
              </button>
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-left text-sm font-semibold text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </GlowCard>

          {/* Danger Zone */}
          <GlowCard className="overflow-hidden bg-white/5 border border-white/10 rounded-2xl" glowColor="hsl(0 72% 51% / 0.3)">
            <div className="flex items-center gap-3 border-b border-destructive/10 p-5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-destructive/20 text-destructive">
                <Trash2 size={18} />
              </div>
              <h2 className="font-display text-lg font-semibold text-destructive">Danger Zone</h2>
            </div>
            <div className="p-6">
              <p className="mb-4 text-xs leading-relaxed text-muted-foreground">
                Once you delete your account, there is no going back. Please be certain.
              </p>
              <button
                onClick={handleDeleteAccount}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm font-semibold text-destructive transition-colors hover:bg-destructive/20"
              >
                <Trash2 size={16} />
                Delete Account
              </button>
            </div>
          </GlowCard>
        </div>
      </div>
    </div>
  );
}
