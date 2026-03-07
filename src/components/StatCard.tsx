import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  trend?: { value: string; positive: boolean };
  gradient?: boolean;
}

export function StatCard({ title, value, subtitle, icon: Icon, trend, gradient }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`stat-card ${gradient ? "border-0" : ""}`}
      style={gradient ? {
        background: "linear-gradient(135deg, #1a6ef5, #2d8cf0)",
        color: "#fff"
      } : {}}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium" style={{ color: gradient ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.6)" }}>
            {title}
          </p>
          <p className="text-3xl font-display font-bold mt-1" style={{ color: "#fff" }}>{value}</p>
          {subtitle && (
            <p className="text-sm mt-1" style={{ color: gradient ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.6)" }}>
              {subtitle}
            </p>
          )}
          {trend && (
            <p className={`text-sm mt-2 font-medium`} style={{ color: trend.positive ? "#22c55e" : "#ef4444" }}>
              {trend.positive ? "↑" : "↓"} {trend.value}
            </p>
          )}
        </div>
        <div className="rounded-xl p-3" style={{ background: gradient ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.05)" }}>
          <Icon className="h-5 w-5" style={{ color: "#fff" }} />
        </div>
      </div>
    </motion.div>
  );
}
