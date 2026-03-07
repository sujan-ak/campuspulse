import { useState } from "react";
import { GlowCard } from "@/components/GlowCard";

export default function ODForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [draftSaved, setDraftSaved] = useState(false);
  const [formData, setFormData] = useState({
    name: "", roll: "", dept: "", year: "", section: "", email: "", phone: "", studentNote: "",
    event: "", odType: "", partType: "", venue: "", from: "", to: "", reason: "",
    subjects: [] as string[], classCount: "", faculty: "", notes: "",
    file1: null as File | null, file2: null as File | null, declaration: false, signature: ""
  });

  const totalSteps = 4;

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
    else submitForm();
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const submitForm = () => {
    setShowSuccess(true);
  };

  const saveAsDraft = () => {
    setDraftSaved(true);
    setTimeout(() => setDraftSaved(false), 2000);
  };

  const resetForm = () => {
    setFormData({
      name: "", roll: "", dept: "", year: "", section: "", email: "", phone: "", studentNote: "",
      event: "", odType: "", partType: "", venue: "", from: "", to: "", reason: "",
      subjects: [], classCount: "", faculty: "", notes: "",
      file1: null, file2: null, declaration: false, signature: ""
    });
    setCurrentStep(1);
    setShowSuccess(false);
  };

  const toggleSubject = (subject: string) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter(s => s !== subject)
        : [...prev.subjects, subject]
    }));
  };

  if (showSuccess) {
    return (
      <GlowCard style={{ background: "rgba(255,255,255,.055)", border: "1px solid rgba(255,255,255,.11)", borderRadius: "16px", padding: "60px 40px", textAlign: "center" }}>
        <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: "rgba(34,197,94,.15)", border: "2px solid rgba(34,197,94,.4)", display: "grid", placeItems: "center", margin: "0 auto 20px" }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: "22px", fontWeight: 800, marginBottom: "8px" }}>OD Request Submitted! 🎉</h2>
        <p style={{ color: "rgba(255,255,255,.6)", fontSize: "14px", maxWidth: "340px", margin: "0 auto", lineHeight: 1.6 }}>Your request has been forwarded to your faculty coordinator and HOD for approval.</p>
        <div style={{ marginTop: "20px", padding: "14px 24px", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: "10px" }}>
          <span style={{ fontSize: "11px", display: "block", color: "rgba(255,255,255,.5)", marginBottom: "4px" }}>Reference Number</span>
          <span style={{ fontFamily: "'Sora', sans-serif", fontSize: "18px", fontWeight: 700, letterSpacing: ".12em", color: "#0fb8c9" }}>OD-2026-{Math.floor(1000 + Math.random() * 9000)}</span>
        </div>
        <div style={{ display: "flex", gap: "10px", marginTop: "24px", justifyContent: "center" }}>
          <button onClick={resetForm} style={{ padding: "9px 18px", borderRadius: "10px", border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.05)", color: "rgba(255,255,255,.6)", fontSize: "13.5px", fontWeight: 500, cursor: "pointer" }}>New Request</button>
          <button style={{ padding: "9px 18px", borderRadius: "10px", border: "none", background: "#0fb8c9", color: "#fff", fontSize: "13.5px", fontWeight: 500, cursor: "pointer", boxShadow: "0 0 16px rgba(15,184,201,.4)" }}>Download PDF</button>
        </div>
      </GlowCard>
    );
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "18px", alignItems: "start" }}>
      {/* Form */}
      <GlowCard style={{ background: "rgba(255,255,255,.055)", border: "1px solid rgba(255,255,255,.11)", borderRadius: "16px", padding: "24px" }}>
        
        {/* Steps */}
        <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: "28px" }}>
          {[
            { num: 1, label: "Student Info", sub: "Personal details" },
            { num: 2, label: "OD Details", sub: "Event & duration" },
            { num: 3, label: "Classes Missed", sub: "Subjects affected" },
            { num: 4, label: "Supporting Docs", sub: "Proof & sign-off" }
          ].map((item, i) => (
            <div key={item.num} style={{ display: "flex", alignItems: "center", flex: i < 3 ? 1 : 0 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "50%", display: "grid", placeItems: "center", fontFamily: "'Sora', sans-serif", fontSize: "13px", fontWeight: 700, border: "2px solid", borderColor: item.num < currentStep ? "#0fb8c9" : item.num === currentStep ? "#0fb8c9" : "rgba(255,255,255,.1)", background: item.num < currentStep ? "#0fb8c9" : item.num === currentStep ? "transparent" : "rgba(255,255,255,.05)", color: item.num <= currentStep ? "#0fb8c9" : "rgba(255,255,255,.5)", boxShadow: item.num === currentStep ? "0 0 0 4px rgba(15,184,201,.15)" : "none" }}>
                  {item.num < currentStep ? "✓" : item.num}
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: i === 0 ? "flex-start" : i === 3 ? "flex-end" : "center", minWidth: i < 3 ? "80px" : "auto" }}>
                  <span style={{ fontSize: "12px", fontWeight: 600, color: "#fff", whiteSpace: "nowrap" }}>{item.label}</span>
                  <span style={{ fontSize: "11px", color: "rgba(255,255,255,.5)", whiteSpace: "nowrap" }}>{item.sub}</span>
                </div>
              </div>
              {i < 3 && <div style={{ flex: 1, height: "2px", background: "rgba(255,255,255,.1)", margin: "0 8px", borderRadius: "2px", overflow: "hidden" }}><div style={{ height: "100%", background: "#0fb8c9", width: item.num < currentStep ? "100%" : "0%", transition: "width .5s" }}/></div>}
            </div>
          ))}
        </div>

        {/* Step 1 */}
        {currentStep === 1 && (
          <div>
            <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: "14px", fontWeight: 700, color: "#0fb8c9", textTransform: "uppercase", marginBottom: "16px" }}>Student Information</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
              <div><label style={{ fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,.6)", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>Full Name *</label><input type="text" value={formData.name} onChange={e => updateField("name", e.target.value)} placeholder="e.g. Priya Sharma" style={{ width: "100%", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: "9px", color: "#fff", fontSize: "13.5px", padding: "11px 14px", outline: "none" }}/></div>
              <div><label style={{ fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,.6)", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>Roll Number *</label><input type="text" value={formData.roll} onChange={e => updateField("roll", e.target.value)} placeholder="e.g. 22CS1045" style={{ width: "100%", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: "9px", color: "#fff", fontSize: "13.5px", padding: "11px 14px", outline: "none" }}/></div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "16px" }}>
              <div><label style={{ fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,.6)", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>Department *</label><select value={formData.dept} onChange={e => updateField("dept", e.target.value)} style={{ width: "100%", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: "9px", color: formData.dept ? "#fff" : "rgba(255,255,255,.5)", fontSize: "13.5px", padding: "11px 14px", outline: "none", cursor: "pointer" }}><option value="" style={{ background: "#1a2436", color: "rgba(255,255,255,.5)" }}>Select</option><option style={{ background: "#1a2436", color: "#fff" }}>Computer Science</option><option style={{ background: "#1a2436", color: "#fff" }}>Electronics</option><option style={{ background: "#1a2436", color: "#fff" }}>Mechanical</option></select></div>
              <div><label style={{ fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,.6)", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>Year *</label><select value={formData.year} onChange={e => updateField("year", e.target.value)} style={{ width: "100%", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: "9px", color: formData.year ? "#fff" : "rgba(255,255,255,.5)", fontSize: "13.5px", padding: "11px 14px", outline: "none", cursor: "pointer" }}><option value="" style={{ background: "#1a2436", color: "rgba(255,255,255,.5)" }}>Select</option><option style={{ background: "#1a2436", color: "#fff" }}>1st Year</option><option style={{ background: "#1a2436", color: "#fff" }}>2nd Year</option><option style={{ background: "#1a2436", color: "#fff" }}>3rd Year</option><option style={{ background: "#1a2436", color: "#fff" }}>4th Year</option></select></div>
              <div><label style={{ fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,.6)", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>Section</label><select value={formData.section} onChange={e => updateField("section", e.target.value)} style={{ width: "100%", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: "9px", color: formData.section ? "#fff" : "rgba(255,255,255,.5)", fontSize: "13.5px", padding: "11px 14px", outline: "none", cursor: "pointer" }}><option value="" style={{ background: "#1a2436", color: "rgba(255,255,255,.5)" }}>Select</option><option style={{ background: "#1a2436", color: "#fff" }}>A</option><option style={{ background: "#1a2436", color: "#fff" }}>B</option><option style={{ background: "#1a2436", color: "#fff" }}>C</option></select></div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div><label style={{ fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,.6)", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>Email *</label><input type="email" value={formData.email} onChange={e => updateField("email", e.target.value)} placeholder="student@college.edu" style={{ width: "100%", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: "9px", color: "#fff", fontSize: "13.5px", padding: "11px 14px", outline: "none" }}/></div>
              <div><label style={{ fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,.6)", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>Phone</label><input type="text" value={formData.phone} onChange={e => updateField("phone", e.target.value)} placeholder="+91 9876543210" style={{ width: "100%", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: "9px", color: "#fff", fontSize: "13.5px", padding: "11px 14px", outline: "none" }}/></div>
            </div>
            <div style={{ marginTop: "16px" }}><label style={{ fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,.6)", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>Brief Note (Why are you filling this OD form?)</label><textarea value={formData.studentNote} onChange={e => updateField("studentNote", e.target.value)} placeholder="e.g. I am participating in a national-level hackathon..." maxLength={200} style={{ width: "100%", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: "9px", color: "#fff", fontSize: "13.5px", padding: "11px 14px", outline: "none", minHeight: "80px", resize: "vertical" }}/><div style={{ fontSize: "11px", color: "rgba(255,255,255,.5)", marginTop: "4px", textAlign: "right" }}>{formData.studentNote.length} / 200</div></div>
          </div>
        )}

        {/* Step 2 */}
        {currentStep === 2 && (
          <div>
            <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: "14px", fontWeight: 700, color: "#0fb8c9", textTransform: "uppercase", marginBottom: "16px" }}>OD Details</h3>
            <div style={{ marginBottom: "16px" }}><label style={{ fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,.6)", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>Event Name *</label><input type="text" value={formData.event} onChange={e => updateField("event", e.target.value)} placeholder="e.g. National Hackathon 2026" style={{ width: "100%", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: "9px", color: "#fff", fontSize: "13.5px", padding: "11px 14px", outline: "none" }}/></div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
              <div><label style={{ fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,.6)", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>OD Type *</label><div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>{["Academic", "Cultural", "Sports", "Technical", "Other"].map(type => (<button key={type} onClick={() => updateField("odType", type)} style={{ padding: "9px 14px", borderRadius: "8px", border: "1px solid", borderColor: formData.odType === type ? "#0fb8c9" : "rgba(255,255,255,.1)", background: formData.odType === type ? "rgba(15,184,201,.15)" : "rgba(255,255,255,.05)", color: formData.odType === type ? "#0fb8c9" : "rgba(255,255,255,.6)", fontSize: "13px", cursor: "pointer", transition: "all .2s" }}>{type}</button>))}</div></div>
              <div><label style={{ fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,.6)", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>Participation Type</label><div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>{["Participant", "Volunteer", "Organiser"].map(type => (<button key={type} onClick={() => updateField("partType", type)} style={{ padding: "9px 14px", borderRadius: "8px", border: "1px solid", borderColor: formData.partType === type ? "#0fb8c9" : "rgba(255,255,255,.1)", background: formData.partType === type ? "rgba(15,184,201,.15)" : "rgba(255,255,255,.05)", color: formData.partType === type ? "#0fb8c9" : "rgba(255,255,255,.6)", fontSize: "13px", cursor: "pointer", transition: "all .2s" }}>{type}</button>))}</div></div>
            </div>
            <div style={{ marginBottom: "16px" }}><label style={{ fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,.6)", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>Venue *</label><input type="text" value={formData.venue} onChange={e => updateField("venue", e.target.value)} placeholder="e.g. IIT Madras, Chennai" style={{ width: "100%", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: "9px", color: "#fff", fontSize: "13.5px", padding: "11px 14px", outline: "none" }}/></div>
            <div style={{ marginBottom: "16px" }}><label style={{ fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,.6)", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>Duration *</label><div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "10px", alignItems: "end" }}><input type="date" value={formData.from} onChange={e => updateField("from", e.target.value)} style={{ width: "100%", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: "9px", color: "#fff", fontSize: "13.5px", padding: "11px 14px", outline: "none" }}/><div style={{ height: "42px", display: "flex", alignItems: "center", color: "rgba(255,255,255,.5)", fontSize: "12px", fontWeight: 600 }}>→</div><input type="date" value={formData.to} onChange={e => updateField("to", e.target.value)} style={{ width: "100%", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: "9px", color: "#fff", fontSize: "13.5px", padding: "11px 14px", outline: "none" }}/></div></div>
            <div><label style={{ fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,.6)", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>Reason *</label><textarea value={formData.reason} onChange={e => updateField("reason", e.target.value)} placeholder="Briefly explain the purpose..." maxLength={400} style={{ width: "100%", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: "9px", color: "#fff", fontSize: "13.5px", padding: "11px 14px", outline: "none", minHeight: "88px", resize: "vertical" }}/><div style={{ fontSize: "11px", color: "rgba(255,255,255,.5)", marginTop: "4px", textAlign: "right" }}>{formData.reason.length} / 400</div></div>
          </div>
        )}

        {/* Step 3 */}
        {currentStep === 3 && (
          <div>
            <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: "14px", fontWeight: 700, color: "#0fb8c9", textTransform: "uppercase", marginBottom: "16px" }}>Classes Missed</h3>
            <p style={{ fontSize: "11.5px", color: "rgba(255,255,255,.5)", marginBottom: "16px" }}>Select all subjects you will miss during the OD period. Your attendance will be protected for these sessions.</p>
            <div style={{ marginBottom: "16px" }}><label style={{ fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,.6)", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>Subjects Missed *</label><div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>{["Data Structures", "Algorithms", "Database Systems", "OS Lab", "Math 101", "Physics Lab", "English"].map(subject => (<button key={subject} onClick={() => toggleSubject(subject)} style={{ padding: "9px 14px", borderRadius: "8px", border: "1px solid", borderColor: formData.subjects.includes(subject) ? "#0fb8c9" : "rgba(255,255,255,.1)", background: formData.subjects.includes(subject) ? "rgba(15,184,201,.15)" : "rgba(255,255,255,.05)", color: formData.subjects.includes(subject) ? "#0fb8c9" : "rgba(255,255,255,.6)", fontSize: "13px", cursor: "pointer" }}>{subject}</button>))}</div></div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
              <div><label style={{ fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,.6)", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>Total Classes</label><input type="number" value={formData.classCount} onChange={e => updateField("classCount", e.target.value)} placeholder="e.g. 3" style={{ width: "100%", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: "9px", color: "#fff", fontSize: "13.5px", padding: "11px 14px", outline: "none" }}/></div>
              <div><label style={{ fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,.6)", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>Faculty Coordinator</label><input type="text" value={formData.faculty} onChange={e => updateField("faculty", e.target.value)} placeholder="e.g. Dr. Ramesh Kumar" style={{ width: "100%", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: "9px", color: "#fff", fontSize: "13.5px", padding: "11px 14px", outline: "none" }}/></div>
            </div>
            <div><label style={{ fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,.6)", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>Additional Notes</label><textarea value={formData.notes} onChange={e => updateField("notes", e.target.value)} placeholder="Any extra notes for your faculty..." maxLength={200} style={{ width: "100%", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: "9px", color: "#fff", fontSize: "13.5px", padding: "11px 14px", outline: "none", minHeight: "88px", resize: "vertical" }}/><div style={{ fontSize: "11px", color: "rgba(255,255,255,.5)", marginTop: "4px", textAlign: "right" }}>{formData.notes.length} / 200</div></div>
          </div>
        )}

        {/* Step 4 */}
        {currentStep === 4 && (
          <div>
            <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: "14px", fontWeight: 700, color: "#0fb8c9", textTransform: "uppercase", marginBottom: "16px" }}>Supporting Documents</h3>
            <div style={{ marginBottom: "18px" }}><label style={{ fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,.6)", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>Event Proof / Invitation Letter *</label><div style={{ background: "rgba(255,255,255,.05)", border: "2px dashed rgba(255,255,255,.1)", borderRadius: "10px", padding: "28px 20px", textAlign: "center", cursor: "pointer" }}><div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(255,255,255,.05)", display: "grid", placeItems: "center", color: "#0fb8c9", margin: "0 auto 10px" }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/></svg></div><div style={{ fontSize: "13.5px", fontWeight: 500, marginBottom: "4px" }}>Drag & drop or click to upload</div><div style={{ fontSize: "12px", color: "rgba(255,255,255,.5)" }}>PDF, JPG, PNG · Max 5 MB</div></div></div>
            <div style={{ marginBottom: "18px" }}><label style={{ fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,.6)", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>Permission / NOC from HOD</label><div style={{ background: "rgba(255,255,255,.05)", border: "2px dashed rgba(255,255,255,.1)", borderRadius: "10px", padding: "28px 20px", textAlign: "center", cursor: "pointer" }}><div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(255,255,255,.05)", display: "grid", placeItems: "center", color: "#0fb8c9", margin: "0 auto 10px" }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/></svg></div><div style={{ fontSize: "13.5px", fontWeight: 500, marginBottom: "4px" }}>Drag & drop or click to upload</div><div style={{ fontSize: "12px", color: "rgba(255,255,255,.5)" }}>PDF, JPG, PNG · Max 5 MB</div></div></div>
            <div style={{ marginBottom: "18px" }}><label style={{ fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,.6)", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>Declaration</label><button onClick={() => updateField("declaration", !formData.declaration)} style={{ width: "100%", display: "flex", alignItems: "center", gap: "8px", background: formData.declaration ? "rgba(15,184,201,.15)" : "rgba(255,255,255,.05)", border: "1px solid", borderColor: formData.declaration ? "#0fb8c9" : "rgba(255,255,255,.1)", borderRadius: "8px", padding: "9px 14px", cursor: "pointer", fontSize: "13px", color: formData.declaration ? "#0fb8c9" : "rgba(255,255,255,.6)", textAlign: "left" }}><div style={{ width: "16px", height: "16px", borderRadius: "4px", border: "2px solid", borderColor: formData.declaration ? "#0fb8c9" : "rgba(255,255,255,.5)", background: formData.declaration ? "#0fb8c9" : "transparent", display: "grid", placeItems: "center", flexShrink: 0, fontSize: "10px", color: "#fff" }}>{formData.declaration && "✓"}</div><span style={{ lineHeight: 1.5 }}>I hereby declare that the information provided is true and accurate. I understand that any false information may result in disciplinary action.</span></button></div>
            <div><label style={{ fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,.6)", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>Digital Signature (Type full name)</label><input type="text" value={formData.signature} onChange={e => updateField("signature", e.target.value)} placeholder="Type your full name as signature" style={{ width: "100%", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: "9px", color: "#fff", fontSize: "13.5px", padding: "11px 14px", outline: "none", fontStyle: "italic" }}/></div>
          </div>
        )}

        {/* Nav */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "28px", paddingTop: "20px", borderTop: "1px solid rgba(255,255,255,.1)" }}>
          {currentStep > 1 ? <button onClick={prevStep} style={{ padding: "9px 18px", borderRadius: "10px", border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.05)", color: "rgba(255,255,255,.6)", fontSize: "13.5px", fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: "7px" }}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>Back</button> : <div/>}
          <div style={{ display: "flex", gap: "10px", marginLeft: "auto" }}>
            <button onClick={saveAsDraft} style={{ padding: "9px 18px", borderRadius: "10px", border: "1px solid rgba(255,255,255,.1)", background: draftSaved ? "rgba(15,184,201,.15)" : "rgba(255,255,255,.05)", color: draftSaved ? "#0fb8c9" : "rgba(255,255,255,.6)", fontSize: "13.5px", fontWeight: 500, cursor: "pointer", borderColor: draftSaved ? "rgba(15,184,201,.3)" : "rgba(255,255,255,.1)", transition: "all .2s" }}>{draftSaved ? "Saved!" : "Save Draft"}</button>
            <button onClick={nextStep} style={{ padding: "9px 18px", borderRadius: "10px", border: "none", background: "#0fb8c9", color: "#fff", fontSize: "13.5px", fontWeight: 500, cursor: "pointer", boxShadow: "0 0 16px rgba(15,184,201,.4)", display: "flex", alignItems: "center", gap: "7px" }}>{currentStep === totalSteps ? (<><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>Submit OD</>) : (<>Continue<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg></>)}</button>
          </div>
        </div>
      </GlowCard>

      {/* Summary */}
      <div>
        <GlowCard style={{ background: "rgba(255,255,255,.055)", border: "1px solid rgba(255,255,255,.11)", borderRadius: "16px", overflow: "hidden", marginBottom: "14px" }} glowColor="rgba(15, 184, 201, 0.3)">
          <div style={{ padding: "18px 20px", background: "linear-gradient(135deg, rgba(15,184,201,.18), rgba(37,99,235,.12))", borderBottom: "1px solid rgba(255,255,255,.1)", display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#0fb8c9", display: "grid", placeItems: "center" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            </div>
            <div>
              <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: "14px", fontWeight: 700 }}>OD Summary</h3>
              <div style={{ fontSize: "11px", color: "rgba(255,255,255,.6)" }}>Live preview of your request</div>
            </div>
          </div>
          <div style={{ padding: "16px 20px" }}>
            {[
              { key: "Student", val: formData.name || "—" },
              { key: "Roll No.", val: formData.roll || "—" },
              { key: "Dept / Year", val: formData.dept && formData.year ? `${formData.dept} · ${formData.year}` : formData.dept || formData.year || "—" },
              { key: "Event", val: formData.event || "—" },
              { key: "Duration", val: formData.from && formData.to ? `${formData.from} → ${formData.to}` : "—" },
              { key: "Venue", val: formData.venue || "—" }
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: i < 5 ? "1px solid rgba(255,255,255,.05)" : "none", fontSize: "13px" }}>
                <span style={{ color: "rgba(255,255,255,.6)", fontSize: "12px" }}>{item.key}</span>
                <span style={{ fontWeight: 500, textAlign: "right", maxWidth: "160px", wordBreak: "break-word", color: item.val === "—" ? "rgba(255,255,255,.3)" : "#fff", fontStyle: item.val === "—" ? "italic" : "normal", fontSize: item.val === "—" ? "12px" : "13px" }}>{item.val}</span>
              </div>
            ))}
          </div>
        </GlowCard>

        {/* Approval Pipeline */}
        <GlowCard style={{ background: "rgba(255,255,255,.055)", border: "1px solid rgba(255,255,255,.11)", borderRadius: "16px", padding: "20px", marginBottom: "14px" }} glowColor="rgba(139, 92, 246, 0.3)">
          <div style={{ fontFamily: "'Sora', sans-serif", fontSize: "14px", fontWeight: 700, marginBottom: "16px" }}>Approval Pipeline</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {[
              { num: "1", label: "Form Submitted", meta: currentStep === 4 ? "Ready to submit" : "Filling in progress" },
              { num: "2", label: "Faculty Review", meta: "Pending submission" },
              { num: "3", label: "HOD Approval", meta: "Awaiting faculty sign-off" },
              { num: "✓", label: "OD Granted", meta: "Attendance marked safe" }
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start", paddingBottom: i < 3 ? "16px" : 0, position: "relative" }}>
                {i < 3 && <div style={{ content: "", position: "absolute", left: "11px", top: "24px", width: "2px", height: "calc(100% - 8px)", background: "rgba(255,255,255,.1)" }}/>
                }
                <div style={{ width: "24px", height: "24px", borderRadius: "50%", flexShrink: 0, display: "grid", placeItems: "center", fontSize: "11px", border: "2px solid", borderColor: i === 0 && currentStep === 4 ? "#0fb8c9" : "rgba(255,255,255,.1)", background: i === 0 && currentStep === 4 ? "transparent" : "rgba(255,255,255,.05)", color: i === 0 && currentStep === 4 ? "#0fb8c9" : "rgba(255,255,255,.5)", boxShadow: i === 0 && currentStep === 4 ? "0 0 0 3px rgba(15,184,201,.15)" : "none", zIndex: 1 }}>{item.num}</div>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 500 }}>{item.label}</div>
                  <div style={{ fontSize: "11px", color: "rgba(255,255,255,.5)", marginTop: "2px" }}>{item.meta}</div>
                </div>
              </div>
            ))}
          </div>
        </GlowCard>

        {/* Quick Tip */}
        <GlowCard style={{ background: "linear-gradient(135deg, rgba(168,85,247,.1), rgba(14,165,200,.08))", border: "1px solid rgba(168,85,247,.2)", borderRadius: "16px", padding: "18px" }} glowColor="rgba(168, 85, 247, 0.3)">
          <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "#a855f7", marginBottom: "8px" }}>✦ Quick Tip</div>
          <div style={{ fontSize: "12.5px", color: "rgba(255,255,255,.7)", lineHeight: 1.6 }}>
            {currentStep === 1 && "Fill in your name and roll number exactly as they appear in the college portal to avoid rejection."}
            {currentStep === 2 && "Upload the official event invitation letter — screenshot emails are not accepted."}
            {currentStep === 3 && "Select all subjects you'll miss, including labs. Faculty verify this list against your timetable."}
            {currentStep === 4 && "Your digital signature must match your full name as registered in the system."}
          </div>
        </GlowCard>
      </div>
    </div>
  );
}
