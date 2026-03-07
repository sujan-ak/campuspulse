import { useState, useEffect, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { GlowCard } from "@/components/GlowCard";

const COLORS = [
  "linear-gradient(135deg,#f59e0b,#ef4444)",
  "linear-gradient(135deg,#3b82f6,#8b5cf6)",
  "linear-gradient(135deg,#10b981,#0ea5c8)",
  "linear-gradient(135deg,#ec4899,#f97316)",
  "linear-gradient(135deg,#6366f1,#0ea5c8)",
];

interface Student {
  name: string;
  roll: string;
  time: string;
  initials: string;
  color: string;
}

export default function QRAttendance() {
  const [sessionActive, setSessionActive] = useState(false);
  const [currentCode, setCurrentCode] = useState("");
  const [qrVersion, setQrVersion] = useState(0);
  const [countdown, setCountdown] = useState(30);
  const [qrTimestamp, setQrTimestamp] = useState(Date.now());
  const [scannedStudents, setScannedStudents] = useState<Student[]>([]);
  const [scannedSet, setScannedSet] = useState(new Set<string>());
  const [refreshCount, setRefreshCount] = useState(0);
  
  const [subject, setSubject] = useState("Data Structures");
  const [room, setRoom] = useState("Room 204");
  const [faculty, setFaculty] = useState("Prof. Williams");
  const [totalEnrolled, setTotalEnrolled] = useState(42);
  const [startTime, setStartTime] = useState("");

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const genCode = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  };

  const issueQR = () => {
    const newVersion = qrVersion + 1;
    setQrVersion(newVersion);
    setRefreshCount(prev => prev + 1);
    const code = genCode();
    setCurrentCode(code);
    setQrTimestamp(Date.now());
    setCountdown(30);
  };

  const startSession = () => {
    setSessionActive(true);
    setQrVersion(0);
    setScannedStudents([]);
    setScannedSet(new Set());
    setRefreshCount(0);
    setStartTime(new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }));
    issueQR();
  };

  const stopSession = () => {
    setSessionActive(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const forceRefresh = () => {
    if (!sessionActive) return;
    issueQR();
  };

  const markAttendance = () => {
    const name = prompt("Enter your name (Student):");
    if (!name?.trim()) return;
    const roll = prompt("Enter your Roll Number:");
    if (!roll?.trim()) return;

    const rollUp = roll.trim().toUpperCase();
    if (scannedSet.has(rollUp)) {
      alert(`⚠️ ${name.trim()} — already marked present!`);
      return;
    }

    const initials = name.split(" ").map(w => w[0].toUpperCase()).join("").slice(0, 2);
    const color = COLORS[scannedStudents.length % COLORS.length];
    const time = new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    
    setScannedSet(prev => new Set(prev).add(rollUp));
    setScannedStudents(prev => [{ name: name.trim(), roll: rollUp, time, initials, color }, ...prev]);
  };

  useEffect(() => {
    if (!sessionActive) return;
    
    timerRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          issueQR();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [sessionActive]);

  const attendanceRate = totalEnrolled > 0 ? Math.round((scannedStudents.length / totalEnrolled) * 100) : 0;

  return (
    <div style={{ width: "100%", minHeight: "100vh", fontFamily: "'Sora', 'Inter', sans-serif" }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: "#fff", letterSpacing: "-0.5px" }}>
          Live QR <span style={{ color: "#0ea5c8" }}>Attendance</span>
        </h1>
        <p style={{ margin: "4px 0 0", color: "rgba(255,255,255,0.6)", fontSize: 14 }}>
          {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })} — QR auto-refreshes every 30 seconds
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
        <GlowCard style={{ background: "linear-gradient(135deg, #0ea5c8, #1d4ed8)", borderRadius: 16, padding: "20px 22px", color: "#fff", boxShadow: "0 8px 24px rgba(14,165,200,0.35)" }}>
          <div style={{ fontSize: 32, fontWeight: 800, letterSpacing: "-1px", lineHeight: 1 }}>{scannedStudents.length}</div>
          <div style={{ fontSize: 12, fontWeight: 500, opacity: 0.85, marginTop: 6 }}>Present Today</div>
        </GlowCard>
        <GlowCard style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "20px 22px" }} glowColor="rgba(59, 130, 246, 0.3)">
          <div style={{ fontSize: 32, fontWeight: 800, letterSpacing: "-1px", lineHeight: 1, color: "#fff" }}>{totalEnrolled}</div>
          <div style={{ fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.6)", marginTop: 6 }}>Total Enrolled</div>
        </GlowCard>
        <GlowCard style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "20px 22px" }} glowColor="rgba(34, 197, 94, 0.3)">
          <div style={{ fontSize: 32, fontWeight: 800, letterSpacing: "-1px", lineHeight: 1, color: "#22c55e" }}>{attendanceRate}%</div>
          <div style={{ fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.6)", marginTop: 6 }}>Attendance Rate</div>
          <div style={{ height: 4, background: "rgba(255,255,255,0.1)", borderRadius: 2, marginTop: 8, overflow: "hidden" }}>
            <div style={{ height: "100%", background: "#22c55e", width: `${Math.min(attendanceRate, 100)}%`, transition: "width 0.5s ease" }} />
          </div>
        </GlowCard>
        <GlowCard style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "20px 22px" }} glowColor="rgba(245, 158, 11, 0.3)">
          <div style={{ fontSize: 32, fontWeight: 800, letterSpacing: "-1px", lineHeight: 1, color: "#f59e0b" }}>{refreshCount}</div>
          <div style={{ fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.6)", marginTop: 6 }}>QR Refreshes</div>
        </GlowCard>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 16 }}>
        {/* Left Panel */}
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, overflow: "hidden", backdropFilter: "blur(20px)" }}>
          <div style={{ padding: "22px 24px" }}>
            {!sessionActive ? (
              <>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700, color: "#0ea5c8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14" /></svg>
                  Session Setup
                  <span style={{ flex: 1, height: 1, background: "rgba(14,165,200,0.13)", display: "block" }} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 18 }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                    <label style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>Subject</label>
                    <select value={subject} onChange={e => setSubject(e.target.value)} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 9, color: "#fff", fontSize: 13.5, padding: "10px 13px", outline: "none" }}>
                      <option>Data Structures</option><option>Algorithms</option><option>Database Systems</option><option>OS Lab</option>
                    </select>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                    <label style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>Room</label>
                    <input type="text" value={room} onChange={e => setRoom(e.target.value)} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 9, color: "#fff", fontSize: 13.5, padding: "10px 13px", outline: "none" }} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                    <label style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>Faculty</label>
                    <input type="text" value={faculty} onChange={e => setFaculty(e.target.value)} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 9, color: "#fff", fontSize: 13.5, padding: "10px 13px", outline: "none" }} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                    <label style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>Class Strength</label>
                    <input type="text" value={totalEnrolled} onChange={e => setTotalEnrolled(parseInt(e.target.value) || 42)} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 9, color: "#fff", fontSize: 13.5, padding: "10px 13px", outline: "none" }} />
                  </div>
                </div>
                <button onClick={startSession} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 7, padding: "13px", borderRadius: 10, border: "none", background: "#0ea5c8", color: "#fff", fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, cursor: "pointer", boxShadow: "0 0 16px rgba(14,165,200,0.32)" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                  Start Live Session
                </button>
              </>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, paddingTop: 10 }}>
                {/* Countdown */}
                <div style={{ position: "relative", width: 100, height: 100 }}>
                  <svg width="100" height="100" style={{ transform: "rotate(-90deg)" }}>
                    <circle cx="50" cy="50" r="43" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="5" />
                    <circle cx="50" cy="50" r="43" fill="none" stroke={countdown <= 10 ? "#ef4444" : countdown <= 20 ? "#f59e0b" : "#0ea5c8"} strokeWidth="5" strokeLinecap="round" strokeDasharray="270.2" strokeDashoffset={270.2 * (1 - countdown / 30)} style={{ transition: "stroke-dashoffset 0.95s linear, stroke 0.4s" }} />
                  </svg>
                  <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 26, fontWeight: 800, color: countdown <= 10 ? "#ef4444" : countdown <= 20 ? "#f59e0b" : "#0ea5c8", lineHeight: 1 }}>{countdown}</div>
                    <div style={{ fontSize: 9, color: "rgba(255,255,255,0.5)", letterSpacing: "0.06em", textTransform: "uppercase", marginTop: 2 }}>seconds</div>
                  </div>
                </div>

                {/* QR Code */}
                <div style={{ position: "relative", padding: 16, borderRadius: 16, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(14,165,200,0.4)", boxShadow: "0 0 50px rgba(14,165,200,0.32)", animation: "glow 2.5s infinite" }}>
                  <div style={{ position: "absolute", top: 5, left: 5, width: 20, height: 20, borderTop: "2px solid #0ea5c8", borderLeft: "2px solid #0ea5c8", borderRadius: "4px 0 0 0" }} />
                  <div style={{ position: "absolute", top: 5, right: 5, width: 20, height: 20, borderTop: "2px solid #0ea5c8", borderRight: "2px solid #0ea5c8", borderRadius: "0 4px 0 0" }} />
                  <div style={{ position: "absolute", bottom: 5, left: 5, width: 20, height: 20, borderBottom: "2px solid #0ea5c8", borderLeft: "2px solid #0ea5c8", borderRadius: "0 0 0 4px" }} />
                  <div style={{ position: "absolute", bottom: 5, right: 5, width: 20, height: 20, borderBottom: "2px solid #0ea5c8", borderRight: "2px solid #0ea5c8", borderRadius: "0 0 4px 0" }} />
                  <QRCodeSVG value={`CAMPUSPULSE|${subject}|${room}|${currentCode}|v${qrVersion}|${qrTimestamp}`} size={220} bgColor="#1a2436" fgColor="#0ea5c8" level="M" />
                </div>

                {/* Session Code */}
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 5 }}>Session Code</div>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 24, fontWeight: 800, letterSpacing: "0.22em", color: "#0ea5c8" }}>{currentCode}</div>
                </div>

                {/* Actions */}
                <div style={{ display: "flex", gap: 10, width: "100%" }}>
                  <button onClick={forceRefresh} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 7, padding: "9px 18px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", color: "rgba(255,255,255,0.7)", fontSize: 13.5, fontWeight: 500, cursor: "pointer" }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 .49-3.5" /></svg>
                    Refresh Now
                  </button>
                  <button onClick={stopSession} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 7, padding: "9px 18px", borderRadius: 10, border: "1px solid rgba(239,68,68,0.22)", background: "rgba(239,68,68,0.12)", color: "#ef4444", fontSize: 13.5, fontWeight: 500, cursor: "pointer" }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /></svg>
                    End Session
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Session Info */}
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, overflow: "hidden" }}>
            <div style={{ padding: "14px 18px", background: "linear-gradient(135deg,rgba(14,165,200,0.16),rgba(37,99,235,0.1))", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, margin: 0, color: "#fff" }}>Session Details</h3>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 12px", borderRadius: 20, background: sessionActive ? "rgba(34,197,94,0.12)" : "rgba(255,255,255,0.05)", color: sessionActive ? "#22c55e" : "rgba(255,255,255,0.5)", border: `1px solid ${sessionActive ? "rgba(34,197,94,0.28)" : "rgba(255,255,255,0.08)"}`, fontSize: 11, fontWeight: 600 }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: sessionActive ? "#22c55e" : "#f59e0b", boxShadow: sessionActive ? "0 0 6px #22c55e" : "none", animation: sessionActive ? "blink 1.4s infinite" : "none" }} />
                {sessionActive ? "Active" : "Not started"}
              </span>
            </div>
            <div style={{ padding: "14px 18px", display: "flex", flexDirection: "column", gap: 0 }}>
              {[
                { label: "Subject", value: subject },
                { label: "Faculty", value: faculty },
                { label: "Room", value: room },
                { label: "Started", value: startTime || "—" },
                { label: "QR Version", value: qrVersion > 0 ? `#${qrVersion}` : "—" },
                { label: "Next refresh", value: sessionActive ? `${countdown}s` : "—" }
              ].map((item, i, arr) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none", fontSize: 13 }}>
                  <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>{item.label}</span>
                  <span style={{ fontWeight: 500, color: item.label === "Next refresh" ? "#0ea5c8" : "#fff" }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Student Scanner */}
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: 18 }}>
            <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700, marginBottom: 12, color: "rgba(255,255,255,0.5)", letterSpacing: "0.05em", textTransform: "uppercase" }}>🎓 Student Scan Portal</h3>
            <button onClick={markAttendance} disabled={!sessionActive} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 7, padding: "9px 18px", borderRadius: 10, border: "1px solid rgba(34,197,94,0.25)", background: sessionActive ? "rgba(34,197,94,0.12)" : "rgba(255,255,255,0.03)", color: sessionActive ? "#22c55e" : "rgba(255,255,255,0.3)", fontSize: 13.5, fontWeight: 500, cursor: sessionActive ? "pointer" : "not-allowed" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
              Mark Attendance
            </button>
          </div>

          {/* Students List */}
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, overflow: "hidden", flex: 1 }}>
            <div style={{ padding: "14px 18px", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, margin: 0, color: "#fff" }}>Marked Present</h3>
              <span style={{ background: "rgba(14,165,200,0.13)", color: "#0ea5c8", border: "1px solid rgba(14,165,200,0.3)", borderRadius: 20, padding: "2px 10px", fontSize: 12, fontWeight: 600 }}>{scannedStudents.length}</span>
            </div>
            <div style={{ maxHeight: 320, overflowY: "auto" }}>
              {scannedStudents.length === 0 ? (
                <div style={{ padding: "28px 18px", textAlign: "center", color: "rgba(255,255,255,0.4)", fontSize: 13, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ opacity: 0.3 }}><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></svg>
                  <span>Start session & scan<br />QR to see students here</span>
                </div>
              ) : (
                scannedStudents.map((student, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 18px", borderBottom: i < scannedStudents.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none", animation: "slideIn 0.35s ease both" }}>
                    <div style={{ width: 30, height: 30, borderRadius: "50%", flexShrink: 0, display: "grid", placeItems: "center", fontSize: 11, fontWeight: 700, color: "#fff", background: student.color }}>{student.initials}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13.5, fontWeight: 500, color: "#fff" }}>{student.name}</div>
                      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 1 }}>{student.roll}</div>
                    </div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", flexShrink: 0 }}>{student.time}</div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" style={{ flexShrink: 0 }}><polyline points="20 6 9 17 4 12" /></svg>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        @keyframes slideIn { from { opacity: 0; transform: translateX(-10px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes glow { 0%, 100% { box-shadow: 0 0 35px rgba(14,165,200,0.32); } 50% { box-shadow: 0 0 60px rgba(14,165,200,0.55); } }
      `}</style>
    </div>
  );
}
