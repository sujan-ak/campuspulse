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
  "#1a6ef5",
  "#0fb8c9",
  "#f59e0b",
];

const chartTooltipStyle = {
  background: "rgba(15, 23, 42, 0.95)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: "0.75rem",
  fontSize: "0.875rem",
  color: "#fff",
  backdropFilter: "blur(10px)"
};

const Analytics = () => {
  return (
    <div className="max-w-7xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display text-white">Analytics</h1>
        <p className="mt-1 text-sm text-gray-300">Insights into attendance and participation trends</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Overall Attendance" value="87%" icon={CalendarCheck} trend={{ value: "4% up", positive: true }} />
        <StatCard title="Total Activities" value="42" icon={Activity} trend={{ value: "6 this month", positive: true }} />
        <StatCard title="Active Students" value="186" icon={Users} />
        <StatCard title="Engagement Rate" value="76%" icon={TrendingUp} trend={{ value: "8% up", positive: true }} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Attendance trend */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="stat-card"
        >
          <h3 className="mb-4 font-display font-semibold text-white">Attendance Trend</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={attendanceTrend}>
              <defs>
                <linearGradient id="attendanceGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1a6ef5" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#1a6ef5" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
              <XAxis dataKey="month" stroke="#cbd5e1" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#cbd5e1" fontSize={12} tickLine={false} axisLine={false} domain={[70, 100]} />
              <Tooltip contentStyle={chartTooltipStyle} />
              <Area
                type="monotone"
                dataKey="rate"
                stroke="#1a6ef5"
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
          <h3 className="mb-4 font-display font-semibold text-white">Participation Trends</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={participationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
              <XAxis dataKey="month" stroke="#cbd5e1" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#cbd5e1" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={chartTooltipStyle} />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px', color: '#cbd5e1' }} />
              <Bar dataKey="workshops" name="Workshops" fill="#1a6ef5" radius={[4, 4, 0, 0]} />
              <Bar dataKey="events" name="Events" fill="#0fb8c9" radius={[4, 4, 0, 0]} />
              <Bar dataKey="seminars" name="Seminars" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
};

export default Analytics;
