import { motion } from "framer-motion";
import { Award, Calendar, Users, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

const activities = [
  { name: "AI Workshop 2026", type: "Workshop", date: "Feb 20, 2026", participants: 120, points: 50, status: "Completed" },
  { name: "Hackathon Spring", type: "Event", date: "Feb 15, 2026", participants: 200, points: 80, status: "Completed" },
  { name: "Tech Talk: Cloud Computing", type: "Seminar", date: "Mar 1, 2026", participants: 85, points: 30, status: "Completed" },
  { name: "Cultural Fest", type: "Event", date: "Mar 5, 2026", participants: 300, points: 40, status: "Ongoing" },
  { name: "Research Symposium", type: "Seminar", date: "Mar 10, 2026", participants: 0, points: 60, status: "Upcoming" },
  { name: "Sports Tournament", type: "Event", date: "Mar 15, 2026", participants: 0, points: 45, status: "Upcoming" },
];

const typeColors: Record<string, string> = {
  Workshop: "bg-primary/10 text-primary",
  Event: "bg-warning/10 text-warning",
  Seminar: "bg-info/10 text-info",
};

const statusColors: Record<string, string> = {
  Completed: "bg-success/10 text-success",
  Ongoing: "bg-warning/10 text-warning",
  Upcoming: "bg-muted text-muted-foreground",
};

const Activities = () => {
  return (
    <div className="max-w-7xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Activities</h1>
          <p className="text-muted-foreground text-sm mt-1">Track your participation in events and workshops</p>
        </div>
        <Button variant="outline" className="rounded-xl gap-2 w-fit">
          <Filter className="h-4 w-4" /> Filter
        </Button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: Award, label: "Total Points", value: "340", color: "gradient-primary" },
          { icon: Calendar, label: "Events Attended", value: "8", color: "gradient-accent" },
          { icon: Users, label: "Activities Joined", value: "12", color: "gradient-warm" },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`rounded-xl p-5 ${item.color} text-primary-foreground`}
          >
            <item.icon className="h-6 w-6 mb-2 opacity-80" />
            <p className="text-2xl font-display font-bold">{item.value}</p>
            <p className="text-sm opacity-80">{item.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Activities table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="stat-card overflow-x-auto"
      >
        <table className="w-full text-sm">
          <thead>
            <tr className="text-muted-foreground border-b border-border">
              <th className="text-left pb-3 font-medium">Activity</th>
              <th className="text-left pb-3 font-medium">Type</th>
              <th className="text-left pb-3 font-medium">Date</th>
              <th className="text-left pb-3 font-medium">Participants</th>
              <th className="text-left pb-3 font-medium">Points</th>
              <th className="text-right pb-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((a, i) => (
              <tr key={i} className="border-b border-border/50 last:border-0 hover:bg-secondary/30 transition-colors">
                <td className="py-3.5 font-medium text-foreground">{a.name}</td>
                <td className="py-3.5">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${typeColors[a.type]}`}>
                    {a.type}
                  </span>
                </td>
                <td className="py-3.5 text-muted-foreground">{a.date}</td>
                <td className="py-3.5 text-foreground">{a.participants || "—"}</td>
                <td className="py-3.5 font-semibold text-primary">+{a.points}</td>
                <td className="py-3.5 text-right">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[a.status]}`}>
                    {a.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default Activities;
