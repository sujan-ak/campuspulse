import { useState } from "react";
import { GlowCard } from "@/components/GlowCard";
import ODForm from "@/components/ODForm";
import { Scanner } from "@yudiel/react-qr-scanner";

const Attendance = () => {
  const [activeTab, setActiveTab] = useState<"scan" | "od">("scan");
  const [scanning, setScanning] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [scannedData, setScannedData] = useState<any>(null);

  const handleScan = (result: any) => {
    if (result?.[0]?.rawValue) {
      setScannedData(result[0].rawValue);
      setScanning(false);
      setConfirmed(true);
    }
  };

  const handleError = (err: any) => {
    if (err?.name === 'NotAllowedError') {
      setScanning(false);
    }
  };

  const openScanner = () => {
    setScanning(true);
  };

  const reset = () => {
    setConfirmed(false);
    setScanning(false);
  };

  return (
    <div style={{ width: "100%", fontFamily: "'Sora', 'Inter', sans-serif", color: "#fff" }}>
      
      {/* Header */}
      <div style={{ marginBottom: "26px" }}>
        <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: "1.45rem", fontWeight: 800, margin: 0, marginBottom: "3px" }}>Attendance & <span style={{ color: "#0fb8c9" }}>OD Management</span></h1>
        <p style={{ fontSize: ".83rem", color: "rgba(255,255,255,.65)", margin: 0 }}>Mark your attendance or submit an on-duty request</p>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "2px", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: "10px", padding: "3px", marginBottom: "20px", width: "fit-content" }}>
        <button
          onClick={() => setActiveTab("scan")}
          style={{
            padding: "6px 18px", borderRadius: "8px", border: "none", cursor: "pointer",
            fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 500,
            background: activeTab === "scan" ? "#0fb8c9" : "transparent",
            color: activeTab === "scan" ? "#fff" : "rgba(255,255,255,.6)",
            boxShadow: activeTab === "scan" ? "0 0 12px rgba(15,184,201,.4)" : "none",
            transition: "all .2s"
          }}
        >
          QR Scan
        </button>
        <button
          onClick={() => setActiveTab("od")}
          style={{
            padding: "6px 18px", borderRadius: "8px", border: "none", cursor: "pointer",
            fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 500,
            background: activeTab === "od" ? "#0fb8c9" : "transparent",
            color: activeTab === "od" ? "#fff" : "rgba(255,255,255,.6)",
            boxShadow: activeTab === "od" ? "0 0 12px rgba(15,184,201,.4)" : "none",
            transition: "all .2s"
          }}
        >
          OD Request
        </button>
      </div>

      {/* Content */}
      {activeTab === "scan" ? (
        <div style={{ maxWidth: "600px" }}>
          {!scanning && !confirmed && (
            <GlowCard style={{ background: "rgba(255,255,255,.055)", border: "1px solid rgba(255,255,255,.11)", borderRadius: "16px", padding: "48px", textAlign: "center" }}>
              <div style={{ width: "96px", height: "96px", borderRadius: "24px", background: "linear-gradient(135deg, #0fb8c9, #1d4ed8)", display: "grid", placeItems: "center", margin: "0 auto 24px", boxShadow: "0 0 24px rgba(15,184,201,.4)" }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="17" y="17" width="4" height="4" rx=".5"/></svg>
              </div>
              <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: "1.25rem", fontWeight: 700, marginBottom: "8px" }}>Ready to Scan</h2>
              <p style={{ color: "rgba(255,255,255,.6)", fontSize: "14px", marginBottom: "24px", maxWidth: "400px", margin: "0 auto 24px" }}>Point your camera at the QR code displayed by your teacher to mark attendance</p>
              <button onClick={openScanner} style={{ padding: "12px 24px", borderRadius: "10px", border: "none", background: "linear-gradient(135deg, #0fb8c9, #1d4ed8)", color: "#fff", fontSize: "14px", fontWeight: 600, cursor: "pointer", boxShadow: "0 0 16px rgba(15,184,201,.4)", display: "inline-flex", alignItems: "center", gap: "8px" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>
                Open Scanner
              </button>
            </GlowCard>
          )}

          {scanning && (
            <GlowCard style={{ background: "rgba(255,255,255,.055)", border: "1px solid rgba(255,255,255,.11)", borderRadius: "16px", padding: "32px", textAlign: "center" }}>
              <div style={{ position: "relative", width: "100%", maxWidth: "400px", height: "400px", borderRadius: "16px", background: "rgba(255,255,255,.03)", border: "2px solid rgba(15,184,201,.3)", overflow: "hidden", margin: "0 auto 24px" }}>
                <Scanner
                  onScan={handleScan}
                  onError={handleError}
                  constraints={{ facingMode: "environment" }}
                  styles={{ container: { width: "100%", height: "100%" } }}
                />
              </div>
              <p style={{ fontSize: "14px", color: "rgba(255,255,255,.6)", marginBottom: "16px" }}>Position QR code within the frame</p>
              <button onClick={reset} style={{ padding: "9px 18px", borderRadius: "10px", border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.05)", color: "rgba(255,255,255,.6)", fontSize: "13px", fontWeight: 500, cursor: "pointer" }}>Cancel</button>
            </GlowCard>
          )}

          {confirmed && (
            <GlowCard style={{ background: "rgba(255,255,255,.055)", border: "1px solid rgba(255,255,255,.11)", borderRadius: "16px", padding: "48px", textAlign: "center" }}>
              <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "rgba(34,197,94,.15)", display: "grid", placeItems: "center", margin: "0 auto 20px" }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: "1.25rem", fontWeight: 700, marginBottom: "8px" }}>Attendance Recorded!</h2>
              <p style={{ color: "rgba(255,255,255,.6)", fontSize: "14px", marginBottom: "4px" }}>Data Structures — Section A</p>
              <p style={{ fontSize: "12px", color: "rgba(255,255,255,.4)", marginBottom: "24px" }}>March 6, 2026 · 10:15 AM</p>
              <button onClick={reset} style={{ padding: "9px 18px", borderRadius: "10px", border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.05)", color: "rgba(255,255,255,.6)", fontSize: "13px", fontWeight: 500, cursor: "pointer" }}>Scan Another</button>
            </GlowCard>
          )}
        </div>
      ) : (
        <ODForm />
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap');
        @keyframes scan {
          0%, 100% { top: 0; }
          50% { top: calc(100% - 4px); }
        }
      `}</style>
    </div>
  );
};

export default Attendance;
