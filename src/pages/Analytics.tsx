import { motion } from "framer-motion";
import { TrendingUp, Users, CalendarCheck, Activity } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const attendanceTrend = [
  { month: "Sep", rate: 82 },
  { month: "Oct", rate: 85 },
  { month: "Nov", rate: 79 },
  { month: "Dec", rate: 88 },
  { month: "Jan", rate: 84 },
  { month: "Feb", rate: 87 },
  { month: "Mar", rate: 91 },
];

const participationData = [
  { month: "Sep", workshops: 3, events: 5, seminars: 2 },
  { month: "Oct", workshops: 4, events: 3, seminars: 4 },
  { month: "Nov", workshops: 2, events: 6, seminars: 3 },
  { month: "Dec", workshops: 5, events: 4, seminars: 1 },
  { month: "Jan", workshops: 3, events: 7, seminars: 5 },
  { month: "Feb", workshops: 6, events: 5, seminars: 4 },
];

const engagementData = [
  { name: "Workshops", value: 35 },
  { name: "Events", value: 40 },
  { name: "Seminars", value: 25 },
];

const COLORS = [
  "hsl(195, 85%, 35%)",
  "hsl(165, 60%, 40%)",
  "hsl(38, 92%, 50%)",
];

const chartTooltipStyle = {
  background: "hsl(var(--card))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "0.75rem",
  fontSize: "0.875rem",
};

const Analytics = () => {
  return (
    <div className="max-w-7xl space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold" style={{ color: "#fff" }}>Analytics</h1>
        <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.65)" }}>Insights into attendance and participation trends</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Overall Attendance" value="87%" icon={CalendarCheck} trend={{ value: "4% up", positive: true }} gradient />
        <StatCard title="Total Activities" value="42" icon={Activity} trend={{ value: "6 this month", positive: true }} />
        <StatCard title="Active Students" value="186" icon={Users} />
        <StatCard title="Engagement Rate" value="76%" icon={TrendingUp} trend={{ value: "8% up", positive: true }} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance trend */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="stat-card"
        >
          <h3 className="font-display font-semibold mb-4" style={{ color: "#fff" }}>Attendance Trend</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={attendanceTrend}>
              <defs>
                <linearGradient id="attendanceGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(195, 85%, 35%)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(195, 85%, 35%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[70, 100]} />
              <Tooltip contentStyle={chartTooltipStyle} />
              <Area
                type="monotone"
                dataKey="rate"
                stroke="hsl(195, 85%, 35%)"
                strokeWidth={2.5}
                fill="url(#attendanceGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Participation breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="stat-card"
        >
          <h3 className="font-display font-semibold mb-4" style={{ color: "#fff" }}>Participation Trends</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={participationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip contentStyle={chartTooltipStyle} />
              <Legend />
              <Bar dataKey="workshops" fill={COLORS[0]} radius={[4, 4, 0, 0]} />
              <Bar dataKey="events" fill={COLORS[1]} radius={[4, 4, 0, 0]} />
              <Bar dataKey="seminars" fill={COLORS[2]} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Engagement pie */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="stat-card max-w-lg"
      >
        <h3 className="font-display font-semibold mb-4" style={{ color: "#fff" }}>Event Engagement</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={engagementData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={4}
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {engagementData.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
            </Pie>
            <Tooltip contentStyle={chartTooltipStyle} />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

export default Analytics;
