import { useState } from "react";
import { GlowCard } from "@/components/GlowCard";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CreateSession = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [sessionColor, setSessionColor] = useState("#0fb8c9");
  const [sessionType, setSessionType] = useState("Lecture");
  const [attMode, setAttMode] = useState("QR Scan");
  const [tags, setTags] = useState(["Arrays", "Linked Lists"]);
  const [tagInput, setTagInput] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);
  const [launchedCode, setLaunchedCode] = useState("");

  const [formData, setFormData] = useState({
    title: "", subject: "", dept: "", year: "", section: "", room: "", strength: 42,
    date: new Date().toISOString().split('T')[0], startTime: "", endTime: "",
    qrInterval: "30", lateThreshold: "15", notes: ""
  });

  const [toggles, setToggles] = useState({
    allowLate: true, geoLocation: false, proxyDetection: true,
    notifications: false, visibleBefore: true, recordLog: true, addCalendar: true
  });

  const colors = ["#0fb8c9", "#2563eb", "#22c55e", "#f59e0b", "#ef4444", "#a855f7", "#ec4899", "#f97316"];

  const calcDuration = () => {
    if (!formData.startTime || !formData.endTime) return "Duration";
    const [sh, sm] = formData.startTime.split(':').map(Number);
    const [eh, em] = formData.endTime.split(':').map(Number);
    const mins = (eh * 60 + em) - (sh * 60 + sm);
    if (mins <= 0) return "Invalid";
    const h = Math.floor(mins / 60), m = mins % 60;
    return h > 0 ? (m > 0 ? `${h}h ${m}m` : `${h}h`) : `${m}m`;
  };

  const handleLaunch = async () => {
    if (!formData.title || !formData.subject || !formData.room || !formData.date || !formData.startTime || !formData.endTime || !formData.dept) {
      toast.error("Please fill all required fields marked with *");
      return;
    }

    if (!user) {
      toast.error("You must be logged in to create a session");
      return;
    }

    setIsLaunching(true);
    let lat = null;
    let lon = null;

    if (toggles.geoLocation) {
      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          });
        });
        lat = position.coords.latitude;
        lon = position.coords.longitude;
      } catch (err) {
        console.error("Geolocation error:", err);
        toast.error("Could not capture your location. Geofencing may not work correctly.");
        // Continue anyway or block? Let's allow but notify.
      }
    }

    const code = Array.from({ length: 6 }, () => 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'[Math.floor(Math.random() * 33)]).join('');

    try {
      const { data, error } = await supabase
        .from('sessions')
        .insert([{
          teacher_id: user.id,
          title: formData.title,
          subject: formData.subject,
          room: formData.room,
          date: formData.date,
          start_time: formData.startTime,
          end_time: formData.endTime,
          code: code,
          status: 'active',
          latitude: lat,
          longitude: lon,
          geofencing_enabled: toggles.geoLocation,
          radius_meters: 100, // Default 100m
          section: formData.section || 'All'
        }])
        .select()
        .single();

      if (error) throw error;

      setLaunchedCode(code);
      setShowSuccess(true);
    } catch (error: any) {
      console.error("Error creating session:", error);
      toast.error(error.message || "Failed to launch session");
    } finally {
      setIsLaunching(false);
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  return (
    <div style={{ width: "100%", fontFamily: "'Sora', 'Inter', sans-serif", color: "#fff" }}>
      <div style={{ marginBottom: "26px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: "1.45rem", fontWeight: 800, margin: 0, marginBottom: "3px" }}>
            Create <span style={{ color: "#0fb8c9" }}>Session</span>
          </h1>
          <p style={{ fontSize: ".83rem", color: "rgba(255,255,255,.65)", margin: 0 }}>Configure and launch a new class session</p>
        </div>
        <button onClick={handleLaunch} disabled={isLaunching} style={{ padding: "10px 20px", borderRadius: "10px", border: "none", background: "linear-gradient(135deg, #0fb8c9, #1d4ed8)", color: "#fff", fontSize: "14px", fontWeight: 600, cursor: isLaunching ? "not-allowed" : "pointer", boxShadow: "0 0 18px rgba(15,184,201,.4)", opacity: isLaunching ? 0.7 : 1 }}>
          {isLaunching ? "Launching..." : "Launch Session"}
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "18px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Basic Info */}
          <GlowCard style={{ background: "rgba(255,255,255,.055)", border: "1px solid rgba(255,255,255,.11)", borderRadius: "16px", padding: "24px" }}>
            <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: "13px", fontWeight: 700, color: "#0fb8c9", textTransform: "uppercase", marginBottom: "18px" }}>Basic Information</h3>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
              <div>
                <label style={{ fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,.7)", display: "block", marginBottom: "6px" }}>Session Title <span style={{ color: "#0fb8c9" }}>*</span></label>
                <input type="text" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="e.g. Data Structures – Unit 4" style={{ width: "100%", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: "9px", color: "#fff", padding: "11px 14px", fontSize: "13.5px", outline: "none" }} />
              </div>
              <div>
                <label style={{ fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,.7)", display: "block", marginBottom: "6px" }}>Subject <span style={{ color: "#0fb8c9" }}>*</span></label>
                <select value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })} style={{ width: "100%", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: "9px", color: "#fff", padding: "11px 14px", fontSize: "13.5px", outline: "none" }}>
                  <option value="">Select subject</option>
                  <option>Data Structures</option>
                  <option>Algorithms</option>
                  <option>Database Systems</option>
                  <option>OS Lab</option>
                  <option>Computer Networks</option>
                </select>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "14px", marginBottom: "14px" }}>
              <div>
                <label style={{ fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,.7)", display: "block", marginBottom: "6px" }}>Department <span style={{ color: "#0fb8c9" }}>*</span></label>
                <select value={formData.dept} onChange={e => setFormData({ ...formData, dept: e.target.value })} style={{ width: "100%", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: "9px", color: "#fff", padding: "11px 14px", fontSize: "13.5px", outline: "none" }}>
                  <option value="">Select dept.</option>
                  <option>Computer Science</option>
                  <option>Electronics</option>
                  <option>Mechanical</option>
                  <option>Information Technology</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,.7)", display: "block", marginBottom: "6px" }}>Year / Semester</label>
                <select value={formData.year} onChange={e => setFormData({ ...formData, year: e.target.value })} style={{ width: "100%", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: "9px", color: "#fff", padding: "11px 14px", fontSize: "13.5px", outline: "none" }}>
                  <option value="">Select year</option>
                  <option>1st Year – Sem 1</option>
                  <option>2nd Year – Sem 3</option>
                  <option>3rd Year – Sem 5</option>
                  <option>4th Year – Sem 7</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,.7)", display: "block", marginBottom: "6px" }}>Section</label>
                <select value={formData.section} onChange={e => setFormData({ ...formData, section: e.target.value })} style={{ width: "100%", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: "9px", color: "#fff", padding: "11px 14px", fontSize: "13.5px", outline: "none" }}>
                  <option value="">All sections</option>
                  <option>Section A</option>
                  <option>Section B</option>
                  <option>Section C</option>
                </select>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
              <div>
                <label style={{ fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,.7)", display: "block", marginBottom: "6px" }}>Room / Venue <span style={{ color: "#0fb8c9" }}>*</span></label>
                <input type="text" value={formData.room} onChange={e => setFormData({ ...formData, room: e.target.value })} placeholder="e.g. Room 204" style={{ width: "100%", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: "9px", color: "#fff", padding: "11px 14px", fontSize: "13.5px", outline: "none" }} />
              </div>
              <div>
                <label style={{ fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,.7)", display: "block", marginBottom: "6px" }}>Class Strength</label>
                <input type="number" value={formData.strength} onChange={e => setFormData({ ...formData, strength: parseInt(e.target.value) })} min="1" max="200" style={{ width: "100%", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: "9px", color: "#fff", padding: "11px 14px", fontSize: "13.5px", outline: "none" }} />
              </div>
            </div>

            <div>
              <label style={{ fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,.7)", display: "block", marginBottom: "6px" }}>Session Colour</label>
              <div style={{ display: "flex", gap: "8px" }}>
                {colors.map(c => (
                  <div key={c} onClick={() => setSessionColor(c)} style={{ width: "28px", height: "28px", borderRadius: "7px", background: c, cursor: "pointer", border: sessionColor === c ? "2px solid #fff" : "2px solid transparent", transform: sessionColor === c ? "scale(1.1)" : "scale(1)", transition: "all .2s" }} />
                ))}
              </div>
            </div>
          </GlowCard>

          {/* Schedule */}
          <GlowCard style={{ background: "rgba(255,255,255,.055)", border: "1px solid rgba(255,255,255,.11)", borderRadius: "16px", padding: "24px" }}>
            <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: "13px", fontWeight: 700, color: "#0fb8c9", textTransform: "uppercase", marginBottom: "18px" }}>Schedule</h3>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
              <div>
                <label style={{ fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,.7)", display: "block", marginBottom: "6px" }}>Date <span style={{ color: "#0fb8c9" }}>*</span></label>
                <input type="date" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} style={{ width: "100%", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: "9px", color: "#fff", padding: "11px 14px", fontSize: "13.5px", outline: "none" }} />
              </div>
              <div>
                <label style={{ fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,.7)", display: "block", marginBottom: "6px" }}>Session Type</label>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {["Lecture", "Lab", "Tutorial"].map(t => (
                    <div key={t} onClick={() => setSessionType(t)} style={{ padding: "8px 16px", borderRadius: "8px", border: "1px solid rgba(255,255,255,.1)", background: sessionType === t ? "rgba(15,184,201,.13)" : "rgba(255,255,255,.05)", color: sessionType === t ? "#0fb8c9" : "rgba(255,255,255,.6)", fontSize: "13px", cursor: "pointer", fontWeight: sessionType === t ? 600 : 400, transition: "all .2s" }}>{t}</div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: "14px" }}>
              <div>
                <label style={{ fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,.7)", display: "block", marginBottom: "6px" }}>Start Time <span style={{ color: "#0fb8c9" }}>*</span></label>
                <input type="time" value={formData.startTime} onChange={e => setFormData({ ...formData, startTime: e.target.value })} style={{ width: "100%", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: "9px", color: "#fff", padding: "11px 14px", fontSize: "13.5px", outline: "none" }} />
              </div>
              <div>
                <label style={{ fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,.7)", display: "block", marginBottom: "6px" }}>End Time <span style={{ color: "#0fb8c9" }}>*</span></label>
                <input type="time" value={formData.endTime} onChange={e => setFormData({ ...formData, endTime: e.target.value })} style={{ width: "100%", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: "9px", color: "#fff", padding: "11px 14px", fontSize: "13.5px", outline: "none" }} />
              </div>
              <div style={{ display: "flex", alignItems: "flex-end" }}>
                <div style={{ padding: "11px 14px", borderRadius: "9px", background: "rgba(15,184,201,.13)", border: "1px solid rgba(15,184,201,.28)", color: "#0fb8c9", fontSize: "13px", fontWeight: 600, whiteSpace: "nowrap" }}>
                  {calcDuration()}
                </div>
              </div>
            </div>
          </GlowCard>

          {/* Attendance */}
          <GlowCard style={{ background: "rgba(255,255,255,.055)", border: "1px solid rgba(255,255,255,.11)", borderRadius: "16px", padding: "24px" }}>
            <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: "13px", fontWeight: 700, color: "#0fb8c9", textTransform: "uppercase", marginBottom: "18px" }}>Attendance Configuration</h3>

            <div style={{ marginBottom: "18px" }}>
              <label style={{ fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,.7)", display: "block", marginBottom: "10px" }}>Attendance Mode</label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
                {[{ name: "QR Scan", desc: "Students scan QR code" }, { name: "Manual", desc: "Teacher marks manually" }, { name: "Self Mark", desc: "Students mark in app" }].map(m => (
                  <div key={m.name} onClick={() => setAttMode(m.name)} style={{ border: "1px solid rgba(255,255,255,.1)", borderRadius: "10px", padding: "14px", cursor: "pointer", background: attMode === m.name ? "rgba(15,184,201,.13)" : "rgba(255,255,255,.05)", borderColor: attMode === m.name ? "#0fb8c9" : "rgba(255,255,255,.1)", transition: "all .2s" }}>
                    <div style={{ fontSize: "13px", fontWeight: 600, color: attMode === m.name ? "#0fb8c9" : "#fff", marginBottom: "3px" }}>{m.name}</div>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,.6)" }}>{m.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "18px" }}>
              <div>
                <label style={{ fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,.7)", display: "block", marginBottom: "6px" }}>QR Refresh Interval</label>
                <select value={formData.qrInterval} onChange={e => setFormData({ ...formData, qrInterval: e.target.value })} style={{ width: "100%", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: "9px", color: "#fff", padding: "11px 14px", fontSize: "13.5px", outline: "none" }}>
                  <option value="30">Every 30 seconds</option>
                  <option value="60">Every 1 minute</option>
                  <option value="120">Every 2 minutes</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,.7)", display: "block", marginBottom: "6px" }}>Late Threshold (mins)</label>
                <input type="number" value={formData.lateThreshold} onChange={e => setFormData({ ...formData, lateThreshold: e.target.value })} min="0" max="60" style={{ width: "100%", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: "9px", color: "#fff", padding: "11px 14px", fontSize: "13.5px", outline: "none" }} />
              </div>
            </div>

            {Object.entries({ allowLate: "Allow Late Entry", geoLocation: "Geo-Location Verification", proxyDetection: "Proxy Detection", notifications: "Send Absentee Notifications" }).map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "13px 0", borderBottom: "1px solid rgba(255,255,255,.1)" }}>
                <span style={{ fontSize: "13.5px", color: "#fff" }}>{v}</span>
                <label style={{ position: "relative", width: "40px", height: "22px", cursor: "pointer" }}>
                  <input type="checkbox" checked={toggles[k]} onChange={e => setToggles({ ...toggles, [k]: e.target.checked })} style={{ display: "none" }} />
                  <div style={{ width: "40px", height: "22px", borderRadius: "11px", background: toggles[k] ? "#0fb8c9" : "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.1)", transition: "all .25s", position: "relative" }}>
                    <div style={{ position: "absolute", top: "3px", left: toggles[k] ? "21px" : "3px", width: "14px", height: "14px", borderRadius: "50%", background: toggles[k] ? "#fff" : "rgba(255,255,255,.6)", transition: "all .25s" }} />
                  </div>
                </label>
              </div>
            ))}
          </GlowCard>

          {/* Advanced */}
          <GlowCard style={{ background: "rgba(255,255,255,.055)", border: "1px solid rgba(255,255,255,.11)", borderRadius: "16px", padding: "24px" }}>
            <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: "13px", fontWeight: 700, color: "#0fb8c9", textTransform: "uppercase", marginBottom: "18px" }}>Advanced Settings</h3>

            <div style={{ marginBottom: "16px" }}>
              <label style={{ fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,.7)", display: "block", marginBottom: "6px" }}>Topics to Cover</label>
              <div style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: "9px", padding: "8px 10px", display: "flex", flexWrap: "wrap", gap: "6px", alignItems: "center", minHeight: "44px" }}>
                {tags.map(t => (
                  <div key={t} style={{ display: "inline-flex", alignItems: "center", gap: "5px", background: "rgba(15,184,201,.13)", border: "1px solid rgba(15,184,201,.28)", borderRadius: "6px", padding: "3px 8px", fontSize: "12.5px", color: "#0fb8c9", fontWeight: 500 }}>
                    {t}
                    <button onClick={() => setTags(tags.filter(tag => tag !== t))} style={{ background: "none", border: "none", color: "#0fb8c9", cursor: "pointer", fontSize: "14px", padding: 0 }}>×</button>
                  </div>
                ))}
                <input type="text" value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())} placeholder="Type and press Enter..." style={{ background: "none", border: "none", outline: "none", color: "#fff", fontSize: "13px", minWidth: "120px", flex: 1 }} />
              </div>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={{ fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,.7)", display: "block", marginBottom: "6px" }}>Session Notes / Agenda</label>
              <textarea value={formData.notes} onChange={e => setFormData({ ...formData, notes: e.target.value })} maxLength={500} placeholder="Add notes visible to students..." style={{ width: "100%", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: "9px", color: "#fff", padding: "11px 14px", fontSize: "13.5px", outline: "none", minHeight: "80px", resize: "vertical" }} />
              <div style={{ fontSize: "11px", color: "rgba(255,255,255,.6)", textAlign: "right", marginTop: "3px" }}>{formData.notes.length} / 500</div>
            </div>

            {Object.entries({ visibleBefore: "Visible to Students Before Session", recordLog: "Record Session Activity Log", addCalendar: "Add to Class Calendar" }).map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "13px 0", borderBottom: "1px solid rgba(255,255,255,.1)" }}>
                <span style={{ fontSize: "13.5px", color: "#fff" }}>{v}</span>
                <label style={{ position: "relative", width: "40px", height: "22px", cursor: "pointer" }}>
                  <input type="checkbox" checked={toggles[k]} onChange={e => setToggles({ ...toggles, [k]: e.target.checked })} style={{ display: "none" }} />
                  <div style={{ width: "40px", height: "22px", borderRadius: "11px", background: toggles[k] ? "#0fb8c9" : "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.1)", transition: "all .25s", position: "relative" }}>
                    <div style={{ position: "absolute", top: "3px", left: toggles[k] ? "21px" : "3px", width: "14px", height: "14px", borderRadius: "50%", background: toggles[k] ? "#fff" : "rgba(255,255,255,.6)", transition: "all .25s" }} />
                  </div>
                </label>
              </div>
            ))}
          </GlowCard>
        </div>

        {/* Right: Preview */}
        <div>
          <GlowCard style={{ background: "rgba(255,255,255,.055)", border: "1px solid rgba(255,255,255,.11)", borderRadius: "16px", overflow: "hidden" }}>
            <div style={{ height: "4px", background: sessionColor }} />
            <div style={{ padding: "20px" }}>
              <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: "14px", fontWeight: 700, marginBottom: "16px" }}>Session Preview</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "13px" }}>
                {[
                  ["Title", formData.title],
                  ["Subject", formData.subject],
                  ["Room", formData.room],
                  ["Date", formData.date],
                  ["Time", formData.startTime && formData.endTime ? `${formData.startTime} - ${formData.endTime}` : ""],
                  ["Duration", calcDuration()],
                  ["Strength", `${formData.strength} students`]
                ].map(([k, v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", paddingBottom: "8px", borderBottom: "1px solid rgba(255,255,255,.1)" }}>
                    <span style={{ color: "rgba(255,255,255,.6)" }}>{k}</span>
                    <span style={{ fontWeight: 500, color: v ? "#fff" : "rgba(255,255,255,.4)", fontStyle: v ? "normal" : "italic" }}>{v || "—"}</span>
                  </div>
                ))}
              </div>
            </div>
          </GlowCard>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div onClick={() => setShowSuccess(false)} style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,.65)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div onClick={e => e.stopPropagation()} style={{ background: "rgba(255,255,255,.055)", border: "1px solid rgba(15,184,201,.3)", borderRadius: "20px", padding: "40px 44px", textAlign: "center", maxWidth: "420px", width: "90%", boxShadow: "0 24px 64px rgba(0,0,0,.5)" }}>
            <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "rgba(34,197,94,.12)", border: "2px solid rgba(34,197,94,.4)", display: "grid", placeItems: "center", margin: "0 auto 18px" }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
            </div>
            <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: "20px", fontWeight: 800, marginBottom: "8px" }}>Session Launched! 🚀</h2>
            <p style={{ fontSize: "13.5px", color: "rgba(255,255,255,.7)", lineHeight: 1.6, maxWidth: "300px", margin: "0 auto 22px" }}>Your session is live. Students can now mark attendance.</p>
            <button onClick={() => setShowSuccess(false)} style={{ padding: "10px 20px", borderRadius: "10px", border: "none", background: "linear-gradient(135deg, #0fb8c9, #1d4ed8)", color: "#fff", fontSize: "14px", fontWeight: 600, cursor: "pointer", boxShadow: "0 0 18px rgba(15,184,201,.4)" }}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateSession;
