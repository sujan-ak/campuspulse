import {
  LayoutDashboard,
  QrCode,
  CalendarCheck,
  Activity,
  BarChart3,
  Settings,
  LogOut,
  GraduationCap,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Attendance", url: "/attendance", icon: QrCode },
  { title: "Activities", url: "/activities", icon: Activity },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  return (
    <Sidebar collapsible="icon" style={{ background: "rgba(255,255,255,0.03)", borderRight: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(20px)" }}>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg" style={{ background: "linear-gradient(135deg, #1a6ef5, #0fb8c9)" }}>
            <GraduationCap className="h-5 w-5" style={{ color: "#fff" }} />
          </div>
          {!collapsed && (
            <span className="font-display text-lg font-bold" style={{ color: "#fff" }}>
              CampusPulse
            </span>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="uppercase text-xs tracking-wider" style={{ color: "rgba(255,255,255,0.5)" }}>
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        end
                        className="transition-all"
                        style={{
                          color: isActive ? "#fff" : "rgba(255,255,255,0.6)",
                          background: isActive ? "linear-gradient(135deg, rgba(26,110,245,0.3), rgba(15,184,201,0.2))" : "transparent",
                          borderLeft: isActive ? "3px solid #1a6ef5" : "3px solid transparent",
                          boxShadow: isActive ? "0 0 20px rgba(26,110,245,0.4), inset 0 0 20px rgba(26,110,245,0.1)" : "none",
                          fontWeight: isActive ? 600 : 400
                        }}
                      >
                        <item.icon className="mr-2 h-4 w-4" />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink
                to="/"
                className="transition-colors"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                {!collapsed && <span>Logout</span>}
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
