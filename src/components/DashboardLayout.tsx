import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Outlet, useLocation } from "react-router-dom";

export function DashboardLayout() {
  const location = useLocation();
  const pageNames: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/attendance": "Attendance",
    "/qr-attendance": "QR Attendance",
    "/activities": "Activities",
    "/analytics": "Analytics",
    "/settings": "Settings"
  };
  const currentPage = pageNames[location.pathname] || "CampusPulse";
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full" style={{ background: "linear-gradient(135deg, #061428 0%, #0b2045 35%, #0a2e3a 70%, #071830 100%)", position: "relative", overflow: "hidden" }}>
        {/* Animated Blobs */}
        <div style={{ position: "absolute", top: "10%", left: "5%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(26,110,245,0.15) 0%, transparent 70%)", filter: "blur(60px)", animation: "float 20s ease-in-out infinite" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "10%", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(15,184,201,0.12) 0%, transparent 70%)", filter: "blur(50px)", animation: "float 25s ease-in-out infinite reverse" }} />
        <div style={{ position: "absolute", top: "50%", left: "50%", width: "350px", height: "350px", borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)", filter: "blur(55px)", animation: "float 18s ease-in-out infinite" }} />
        
        {/* Grid Overlay */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "50px 50px", pointerEvents: "none", opacity: 0.4 }} />
        
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0" style={{ position: "relative", zIndex: 1 }}>
          <header className="h-14 flex items-center px-4 sticky top-0 z-10" style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
            <SidebarTrigger className="mr-4" style={{ color: "#fff" }} />
            <h2 className="font-display font-semibold" style={{ color: "#fff" }}>CampusPulse</h2>
            <div style={{ marginLeft: "auto", padding: "6px 16px", borderRadius: "8px", background: "linear-gradient(135deg, rgba(26,110,245,0.2), rgba(15,184,201,0.15))", border: "1px solid rgba(26,110,245,0.3)", boxShadow: "0 0 15px rgba(26,110,245,0.3)", color: "#fff", fontSize: "14px", fontWeight: 600, animation: "glow 2s ease-in-out infinite" }}>
              {currentPage}
            </div>
          </header>
          <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
            <Outlet />
          </main>
        </div>
        
        <style>{`
          @keyframes float {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(30px, -30px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
          }
          @keyframes glow {
            0%, 100% { box-shadow: 0 0 15px rgba(26,110,245,0.3), 0 0 30px rgba(26,110,245,0.2); }
            50% { box-shadow: 0 0 25px rgba(26,110,245,0.6), 0 0 50px rgba(26,110,245,0.4); }
          }
        `}</style>
      </div>
    </SidebarProvider>
  );
}
