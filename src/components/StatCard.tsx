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
      className={`stat-card ${gradient ? "gradient-primary text-primary-foreground border-0" : ""}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className={`text-sm font-medium ${gradient ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
            {title}
          </p>
          <p className="text-3xl font-display font-bold mt-1">{value}</p>
          {subtitle && (
            <p className={`text-sm mt-1 ${gradient ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
              {subtitle}
            </p>
          )}
          {trend && (
            <p className={`text-sm mt-2 font-medium ${trend.positive ? "text-success" : "text-destructive"}`}>
              {trend.positive ? "↑" : "↓"} {trend.value}
            </p>
          )}
        </div>
        <div className={`rounded-xl p-3 ${gradient ? "bg-primary-foreground/20" : "bg-secondary"}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </motion.div>
  );
}
