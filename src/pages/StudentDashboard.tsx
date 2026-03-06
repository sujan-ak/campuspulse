import { motion } from "framer-motion";
import {
  CalendarCheck,
  QrCode,
  Trophy,
  Compass,
  Clock,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/StatCard";
import { Progress } from "@/components/ui/progress";

const upcomingEvents = [
  { name: "AI Workshop", date: "Mar 8, 2026", type: "Workshop" },
  { name: "Sports Day", date: "Mar 12, 2026", type: "Event" },
  { name: "Tech Seminar", date: "Mar 15, 2026", type: "Seminar" },
];

const recentActivities = [
  { name: "Data Science Bootcamp", points: 50, date: "Mar 2" },
  { name: "Cultural Fest Volunteer", points: 30, date: "Feb 28" },
  { name: "Hackathon 2026", points: 80, date: "Feb 20" },
];

const StudentDashboard = () => {
  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Welcome back, Alex 👋</h1>
        <p className="text-muted-foreground text-sm mt-1">Here's your campus overview for today</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Attendance"
          value="87%"
          subtitle="This semester"
          icon={CalendarCheck}
          trend={{ value: "3% from last month", positive: true }}
          gradient
        />
        <StatCard
          title="Activities"
          value="12"
          subtitle="Participated"
          icon={Trophy}
          trend={{ value: "2 this week", positive: true }}
        />
        <StatCard
          title="Points Earned"
          value="340"
          subtitle="Co-curricular"
          icon={Star}
        />
        <StatCard
          title="Next Class"
          value="2:30 PM"
          subtitle="Data Structures"
          icon={Clock}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* QR Scan + Career Advisory */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="stat-card text-center"
          >
            <div className="mx-auto w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mb-4 shadow-glow">
              <QrCode className="h-8 w-8 text-primary-foreground" />
            </div>
            <h3 className="font-display font-semibold text-foreground">Mark Attendance</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-4">Scan QR code to check in</p>
            <Button variant="gradient" className="w-full rounded-xl">
              Scan QR Code
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="stat-card"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="rounded-xl p-2.5 gradient-accent">
                <Compass className="h-5 w-5 text-accent-foreground" />
              </div>
              <h3 className="font-display font-semibold text-foreground">Career Advisory</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Based on your profile, explore recommended paths in AI & Machine Learning.
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-foreground">Profile completeness</span>
                <span className="text-primary font-medium">72%</span>
              </div>
              <Progress value={72} className="h-2" />
            </div>
          </motion.div>
        </div>

        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="stat-card"
        >
          <h3 className="font-display font-semibold text-foreground mb-4">Recent Activities</h3>
          <div className="space-y-3">
            {recentActivities.map((activity, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">{activity.name}</p>
                  <p className="text-xs text-muted-foreground">{activity.date}</p>
                </div>
                <span className="text-sm font-semibold text-primary">+{activity.points} pts</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Upcoming Events */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="stat-card"
        >
          <h3 className="font-display font-semibold text-foreground mb-4">Upcoming Events</h3>
          <div className="space-y-3">
            {upcomingEvents.map((event, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">{event.name}</p>
                  <p className="text-xs text-muted-foreground">{event.date}</p>
                </div>
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                  {event.type}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StudentDashboard;
