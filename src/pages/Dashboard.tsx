import { useState } from "react";
import { Button } from "@/components/ui/button";
import StudentDashboard from "./StudentDashboard";
import TeacherDashboard from "./TeacherDashboard";

const Dashboard = () => {
  const [role, setRole] = useState<"student" | "teacher">("student");

  return (
    <div className="space-y-6">
      {/* Role toggle for demo */}
      <div className="flex items-center gap-2 bg-secondary rounded-xl p-1 w-fit">
        {(["student", "teacher"] as const).map((r) => (
          <Button
            key={r}
            variant={role === r ? "default" : "ghost"}
            size="sm"
            className="rounded-lg capitalize"
            onClick={() => setRole(r)}
          >
            {r} View
          </Button>
        ))}
      </div>

      {role === "student" ? <StudentDashboard /> : <TeacherDashboard />}
    </div>
  );
};

export default Dashboard;
