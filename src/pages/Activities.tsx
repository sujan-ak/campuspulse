import { useState } from "react";
import { GlowCard } from "@/components/GlowCard";

const activities = [
  { id: 1, name: "AI Workshop 2026", type: "Workshop", date: "Feb 20, 2026", participants: 120, points: 50, status: "Completed" },
  { id: 2, name: "Hackathon Spring", type: "Event", date: "Feb 15, 2026", participants: 200, points: 80, status: "Completed" },
  { id: 3, name: "Tech Talk: Cloud Computing", type: "Seminar", date: "Mar 1, 2026", participants: 85, points: 30, status: "Completed" },
  { id: 4, name: "Cultural Fest", type: "Event", date: "Mar 5, 2026", participants: 300, points: 40, status: "Ongoing" },
  { id: 5, name: "Research Symposium", type: "Seminar", date: "Mar 10, 2026", participants: null, points: 60, status: "Upcoming" },
  { id: 6, name: "Sports Tournament", type: "Event", date: "Mar 15, 2026", participants: null, points: 45, status: "Upcoming" },
];

const TYPE_STYLES = {
  Workshop: { bg: "rgba(59, 130, 246, 0.1)", color: "#60A5FA", border: "rgba(59, 130, 246, 0.3)" },
  Event: { bg: "rgba(249, 115, 22, 0.1)", color: "#FB923C", border: "rgba(249, 115, 22, 0.3)" },
  Seminar: { bg: "rgba(34, 197, 94, 0.1)", color: "#4ADE80", border: "rgba(34, 197, 94, 0.3)" },
};

const STATUS_STYLES = {
  Completed: { bg: "rgba(34, 197, 94, 0.1)", color: "#4ADE80", dot: "#22C55E" },
  Ongoing: { bg: "rgba(249, 115, 22, 0.1)", color: "#FB923C", dot: "#F97316" },
  Upcoming: { bg: "rgba(148, 163, 184, 0.1)", color: "#94A3B8", dot: "#64748B" },
};

const NAV_ITEMS = [
  { label: "Dashboard", icon: GridIcon },
  { label: "Attendance", icon: CalCheckIcon },
  { label: "Activities", icon: ActivityIcon, active: true },
  { label: "Analytics", icon: BarIcon },
];

function GridIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
    </svg>
  );
}
function CalCheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" /><polyline points="9 16 11 18 15 14" />
    </svg>
  );
}
function ActivityIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}
function BarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" /><line x1="2" y1="20" x2="22" y2="20" />
    </svg>
  );
}
function FilterIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}
function StarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
function CalIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}
function UsersIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
function LogoutIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

const FILTERS = ["All", "Workshop", "Event", "Seminar"];
const STATUS_FILTERS = ["All", "Completed", "Ongoing", "Upcoming"];

export default function ActivitiesPage() {
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showFilter, setShowFilter] = useState(false);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const filtered = activities.filter(a => {
    const matchType = typeFilter === "All" || a.type === typeFilter;
    const matchStatus = statusFilter === "All" || a.status === statusFilter;
    return matchType && matchStatus;
  });

  const totalPoints = activities.filter(a => a.status === "Completed").reduce((s, a) => s + a.points, 0);
  const eventsAttended = activities.filter(a => a.status === "Completed").length;
  const activitiesJoined = activities.length;

  return (
    <div style={{ width: "100%", fontFamily: "'Sora', 'Inter', sans-serif", color: "#fff" }}>

      {/* Header row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: "#fff", letterSpacing: "-0.5px" }}>Activities</h1>
          <p style={{ margin: "4px 0 0", color: "rgba(255,255,255,0.6)", fontSize: 14 }}>Track your participation in events and workshops</p>
        </div>

        {/* Filter button */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setShowFilter(!showFilter)}
            style={{
              display: "flex", alignItems: "center", gap: 7,
              padding: "9px 16px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)",
              background: showFilter ? "rgba(26, 110, 245, 0.2)" : "rgba(255,255,255,0.05)", color: "#fff",
              fontWeight: 500, fontSize: 14, cursor: "pointer",
              backdropFilter: "blur(10px)", transition: "all 0.15s"
            }}
          >
            <FilterIcon /> Filter
          </button>

          {showFilter && (
            <div style={{
              position: "absolute", top: "calc(100% + 8px)", right: 0, zIndex: 100,
              background: "rgba(15, 23, 42, 0.95)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 8px 30px rgba(0,0,0,0.5)", padding: 16, width: 220, backdropFilter: "blur(20px)"
            }}>
              <p style={{ margin: "0 0 8px", fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Activity Type</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                {FILTERS.map(f => (
                  <button key={f} onClick={() => setTypeFilter(f)} style={{
                    padding: "5px 12px", borderRadius: 20, border: "1px solid",
                    borderColor: typeFilter === f ? "#1a6ef5" : "rgba(255,255,255,0.1)",
                    background: typeFilter === f ? "rgba(26, 110, 245, 0.2)" : "rgba(255,255,255,0.05)",
                    color: typeFilter === f ? "#60A5FA" : "rgba(255,255,255,0.6)",
                    fontSize: 12, fontWeight: 500, cursor: "pointer"
                  }}>{f}</button>
                ))}
              </div>
              <p style={{ margin: "0 0 8px", fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Status</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {STATUS_FILTERS.map(f => (
                  <button key={f} onClick={() => setStatusFilter(f)} style={{
                    padding: "5px 12px", borderRadius: 20, border: "1px solid",
                    borderColor: statusFilter === f ? "#1a6ef5" : "rgba(255,255,255,0.1)",
                    background: statusFilter === f ? "rgba(26, 110, 245, 0.2)" : "rgba(255,255,255,0.05)",
                    color: statusFilter === f ? "#60A5FA" : "rgba(255,255,255,0.6)",
                    fontSize: 12, fontWeight: 500, cursor: "pointer"
                  }}>{f}</button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── STAT CARDS ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20, marginBottom: 28 }}>
        {/* Total Points */}
        <GlowCard style={{
          background: "linear-gradient(135deg, #1D4ED8 0%, #3B82F6 100%)",
          borderRadius: 16, padding: "28px 28px", color: "#fff",
          boxShadow: "0 8px 24px rgba(59,130,246,0.35)", position: "relative", overflow: "hidden"
        }}>
          <div style={{ position: "absolute", right: -20, top: -20, width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
          <div style={{ position: "absolute", right: 20, bottom: -30, width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
          <div style={{ marginBottom: 12, opacity: 0.9 }}><StarIcon /></div>
          <div style={{ fontSize: 38, fontWeight: 800, letterSpacing: "-1px", lineHeight: 1 }}>{totalPoints}</div>
          <div style={{ fontSize: 13, fontWeight: 500, opacity: 0.85, marginTop: 6 }}>Total Points</div>
        </GlowCard>

        {/* Events Attended */}
        <GlowCard style={{
          background: "linear-gradient(135deg, #0F766E 0%, #14B8A6 100%)",
          borderRadius: 16, padding: "28px 28px", color: "#fff",
          boxShadow: "0 8px 24px rgba(20,184,166,0.3)", position: "relative", overflow: "hidden"
        }} glowColor="rgba(20, 184, 166, 0.4)">
          <div style={{ position: "absolute", right: -20, top: -20, width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
          <div style={{ marginBottom: 12, opacity: 0.9 }}><CalIcon /></div>
          <div style={{ fontSize: 38, fontWeight: 800, letterSpacing: "-1px", lineHeight: 1 }}>{eventsAttended}</div>
          <div style={{ fontSize: 13, fontWeight: 500, opacity: 0.85, marginTop: 6 }}>Events Attended</div>
        </GlowCard>

        {/* Activities Joined */}
        <GlowCard style={{
          background: "linear-gradient(135deg, #C2410C 0%, #F97316 100%)",
          borderRadius: 16, padding: "28px 28px", color: "#fff",
          boxShadow: "0 8px 24px rgba(249,115,22,0.3)", position: "relative", overflow: "hidden"
        }} glowColor="rgba(249, 115, 22, 0.4)">
          <div style={{ position: "absolute", right: -20, top: -20, width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
          <div style={{ marginBottom: 12, opacity: 0.9 }}><UsersIcon /></div>
          <div style={{ fontSize: 38, fontWeight: 800, letterSpacing: "-1px", lineHeight: 1 }}>{activitiesJoined}</div>
          <div style={{ fontSize: 13, fontWeight: 500, opacity: 0.85, marginTop: 6 }}>Activities Joined</div>
        </GlowCard>
      </div>

      {/* ── TABLE ── */}
      <div style={{
        background: "rgba(255,255,255,0.03)", borderRadius: 16, border: "1px solid rgba(255,255,255,0.08)",
        overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.3)", backdropFilter: "blur(20px)"
      }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "rgba(255,255,255,0.02)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
              {["Activity", "Type", "Date", "Participants", "Points", "Status"].map(col => (
                <th key={col} style={{
                  padding: "14px 20px", textAlign: "left",
                  fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.5)",
                  textTransform: "uppercase", letterSpacing: "0.07em"
                }}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((activity, idx) => {
              const ts = TYPE_STYLES[activity.type as keyof typeof TYPE_STYLES];
              const ss = STATUS_STYLES[activity.status as keyof typeof STATUS_STYLES];
              const isHovered = hoveredRow === activity.id;
              return (
                <tr
                  key={activity.id}
                  onMouseEnter={() => setHoveredRow(activity.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                  style={{
                    borderBottom: idx < filtered.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                    background: isHovered ? "rgba(255,255,255,0.05)" : "transparent",
                    transition: "background 0.12s ease", cursor: "pointer"
                  }}
                >
                  <td style={{ padding: "16px 20px", fontSize: 14, fontWeight: 500, color: "#fff" }}>
                    {activity.name}
                  </td>
                  <td style={{ padding: "16px 20px" }}>
                    <span style={{
                      display: "inline-block", padding: "3px 12px", borderRadius: 20,
                      background: ts.bg, color: ts.color,
                      border: `1px solid ${ts.border}`,
                      fontSize: 12, fontWeight: 500
                    }}>{activity.type}</span>
                  </td>
                  <td style={{ padding: "16px 20px", fontSize: 13, color: "rgba(255,255,255,0.6)" }}>{activity.date}</td>
                  <td style={{ padding: "16px 20px", fontSize: 14, color: "rgba(255,255,255,0.7)" }}>
                    {activity.participants != null ? activity.participants.toLocaleString() : <span style={{ color: "rgba(255,255,255,0.3)" }}>—</span>}
                  </td>
                  <td style={{ padding: "16px 20px" }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: "#60A5FA" }}>+{activity.points}</span>
                  </td>
                  <td style={{ padding: "16px 20px" }}>
                    <span style={{
                      display: "inline-flex", alignItems: "center", gap: 6,
                      padding: "4px 12px", borderRadius: 20,
                      background: ss.bg, color: ss.color,
                      fontSize: 12, fontWeight: 500
                    }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: ss.dot, flexShrink: 0 }} />
                      {activity.status}
                    </span>
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} style={{ padding: "48px 20px", textAlign: "center", color: "rgba(255,255,255,0.4)", fontSize: 14 }}>
                  No activities match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
