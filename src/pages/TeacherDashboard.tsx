import { motion } from "framer-motion";
import {
  Users,
  QrCode,
  CalendarCheck,
  TrendingUp,
  Plus,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/StatCard";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const attendanceData = [
  { day: "Mon", present: 42, absent: 5 },
  { day: "Tue", present: 38, absent: 9 },
  { day: "Wed", present: 44, absent: 3 },
  { day: "Thu", present: 40, absent: 7 },
  { day: "Fri", present: 35, absent: 12 },
];

const activeSessions = [
  { subject: "Data Structures", time: "10:00 AM", students: 42, status: "Active" },
  { subject: "Algorithms", time: "12:00 PM", students: 38, status: "Upcoming" },
  { subject: "Database Systems", time: "2:30 PM", students: 0, status: "Upcoming" },
];

const topStudents = [
  { name: "Priya Sharma", attendance: 98, activities: 15 },
  { name: "Alex Johnson", attendance: 95, activities: 12 },
  { name: "Sam Wilson", attendance: 93, activities: 10 },
  { name: "Maya Chen", attendance: 91, activities: 14 },
];

const TeacherDashboard = () => {
  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Teacher Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage sessions and track student progress</p>
        </div>
        <div className="flex gap-3">
          <Button variant="gradient" className="rounded-xl gap-2">
            <Plus className="h-4 w-4" /> Create Session
          </Button>
          <Button variant="outline" className="rounded-xl gap-2">
            <QrCode className="h-4 w-4" /> Generate QR
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Students" value="186" subtitle="Across 4 classes" icon={Users} gradient />
        <StatCard title="Avg. Attendance" value="89%" subtitle="This week" icon={CalendarCheck} trend={{ value: "2% up", positive: true }} />
        <StatCard title="Active Sessions" value="1" subtitle="Right now" icon={Clock} />
        <StatCard title="Participation" value="76%" subtitle="Activities rate" icon={TrendingUp} trend={{ value: "5% up", positive: true }} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="stat-card"
        >
          <h3 className="font-display font-semibold text-foreground mb-4">Weekly Attendance</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                contentStyle={{
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "0.75rem",
                  fontSize: "0.875rem",
                }}
              />
              <Bar dataKey="present" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
              <Bar dataKey="absent" fill="hsl(var(--destructive))" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Active Sessions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="stat-card"
        >
          <h3 className="font-display font-semibold text-foreground mb-4">Today's Sessions</h3>
          <div className="space-y-3">
            {activeSessions.map((session, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">{session.subject}</p>
                  <p className="text-xs text-muted-foreground">{session.time} · {session.students} students</p>
                </div>
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                    session.status === "Active"
                      ? "bg-success/10 text-success"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {session.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Student participation */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="stat-card"
      >
        <h3 className="font-display font-semibold text-foreground mb-4">Top Students</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-muted-foreground border-b border-border">
                <th className="text-left pb-3 font-medium">Name</th>
                <th className="text-left pb-3 font-medium">Attendance</th>
                <th className="text-left pb-3 font-medium">Activities</th>
                <th className="text-right pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {topStudents.map((s, i) => (
                <tr key={i} className="border-b border-border/50 last:border-0">
                  <td className="py-3 font-medium text-foreground">{s.name}</td>
                  <td className="py-3 text-foreground">{s.attendance}%</td>
                  <td className="py-3 text-foreground">{s.activities}</td>
                  <td className="py-3 text-right">
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-success/10 text-success">
                      Excellent
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default TeacherDashboard;
