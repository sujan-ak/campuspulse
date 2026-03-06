import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  QrCode,
  Activity,
  BarChart3,
  LayoutDashboard,
  ArrowRight,
  CheckCircle2,
  Smartphone,
  Zap,
  Users,
  TrendingUp,
  Calendar,
  Shield,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: QrCode,
      title: "QR-based Attendance",
      description: "Students scan a QR code to mark attendance instantly. No manual roll calls needed.",
    },
    {
      icon: Activity,
      title: "Activity Tracking",
      description: "Track student participation in workshops, seminars, and campus events effortlessly.",
    },
    {
      icon: BarChart3,
      title: "Real-Time Analytics",
      description: "Teachers and administrators can view attendance trends and engagement dashboards.",
    },
    {
      icon: LayoutDashboard,
      title: "Student Dashboard",
      description: "Students can view attendance percentage, activity history, and participation insights.",
    },
  ];

  const steps = [
    {
      number: "01",
      icon: Calendar,
      title: "Create a Session",
      description: "Teacher creates a session and generates a unique QR code.",
    },
    {
      number: "02",
      icon: Smartphone,
      title: "Scan QR Code",
      description: "Students scan the QR code using their device camera.",
    },
    {
      number: "03",
      icon: Zap,
      title: "Instant Analytics",
      description: "Attendance and activity data appear instantly in analytics dashboards.",
    },
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <Zap className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold" style={{ fontFamily: "var(--font-display)" }}>
              CampusPulse
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</a>
            <a href="#preview" className="hover:text-foreground transition-colors">Preview</a>
          </div>
          <Button size="sm" onClick={() => navigate("/login")}>
            Sign In
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="absolute inset-0 gradient-hero opacity-[0.03]" />
        <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-accent/5 blur-3xl" />

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              <motion.div variants={fadeUp} custom={0}>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                  <Shield className="w-3 h-3" />
                  Smart Curriculum Activity & Attendance Platform
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                custom={1}
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Track Attendance.{" "}
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-primary)" }}>
                  Engage Students.
                </span>{" "}
                Build Insights.
              </motion.h1>

              <motion.p variants={fadeUp} custom={2} className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                CampusPulse helps institutions manage attendance, activities, and engagement through QR-based check-ins and real-time analytics dashboards.
              </motion.p>

              <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-4">
                <Button size="lg" variant="gradient" className="gap-2" onClick={() => navigate("/login")}>
                  Get Started <ArrowRight className="w-4 h-4" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate("/dashboard")}>
                  View Demo
                </Button>
              </motion.div>

              <motion.div variants={fadeUp} custom={4} className="flex items-center gap-6 text-sm text-muted-foreground">
                {["No setup required", "Free for educators", "Real-time sync"].map((t) => (
                  <span key={t} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-accent" />
                    {t}
                  </span>
                ))}
              </motion.div>
            </motion.div>

            {/* Dashboard Mock */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <div className="absolute -inset-4 rounded-2xl bg-primary/5 blur-2xl" />
                <div className="relative rounded-2xl border border-border bg-card p-6 shadow-elevated space-y-4">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-destructive/60" />
                      <div className="w-3 h-3 rounded-full bg-warning/60" />
                      <div className="w-3 h-3 rounded-full bg-success/60" />
                    </div>
                    <div className="h-6 flex-1 rounded-md bg-muted" />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: "Attendance", value: "94%", color: "bg-primary/10 text-primary" },
                      { label: "Activities", value: "28", color: "bg-accent/10 text-accent" },
                      { label: "Students", value: "156", color: "bg-info/10 text-info" },
                    ].map((s) => (
                      <div key={s.label} className={`rounded-xl p-4 ${s.color}`}>
                        <p className="text-2xl font-bold" style={{ fontFamily: "var(--font-display)" }}>{s.value}</p>
                        <p className="text-xs opacity-70 mt-1">{s.label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    {[85, 72, 95, 60].map((w, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-20 text-xs text-muted-foreground">Session {i + 1}</div>
                        <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                          <motion.div
                            className="h-full rounded-full gradient-primary"
                            initial={{ width: 0 }}
                            animate={{ width: `${w}%` }}
                            transition={{ duration: 1, delay: 0.8 + i * 0.15 }}
                          />
                        </div>
                        <span className="text-xs font-medium w-8 text-right">{w}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 md:py-28 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16 space-y-4"
          >
            <motion.p variants={fadeUp} custom={0} className="text-sm font-medium text-primary tracking-wide uppercase">
              Features
            </motion.p>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-3xl md:text-4xl font-bold"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Everything you need to manage campus engagement
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-muted-foreground max-w-2xl mx-auto">
              From QR-based attendance to real-time analytics — CampusPulse brings it all together in one platform.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                custom={i}
                variants={fadeUp}
                className="group relative rounded-2xl border border-border bg-card p-6 hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <f.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: "var(--font-display)" }}>
                  {f.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16 space-y-4"
          >
            <motion.p variants={fadeUp} custom={0} className="text-sm font-medium text-primary tracking-wide uppercase">
              How It Works
            </motion.p>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-3xl md:text-4xl font-bold"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Three simple steps to smarter attendance
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-px border-t-2 border-dashed border-primary/20" />
            {steps.map((s, i) => (
              <motion.div
                key={s.number}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                custom={i}
                variants={fadeUp}
                className="text-center relative"
              >
                <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-6 relative z-10">
                  <s.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <span className="text-xs font-bold text-primary/40 tracking-widest uppercase">Step {s.number}</span>
                <h3 className="text-xl font-semibold mt-2 mb-3" style={{ fontFamily: "var(--font-display)" }}>
                  {s.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">{s.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Preview */}
      <section id="preview" className="py-20 md:py-28 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16 space-y-4"
          >
            <motion.p variants={fadeUp} custom={0} className="text-sm font-medium text-primary tracking-wide uppercase">
              Platform Preview
            </motion.p>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-3xl md:text-4xl font-bold"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Designed for modern classrooms
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid md:grid-cols-3 gap-6"
          >
            {[
              {
                title: "Teacher Dashboard",
                icon: Users,
                items: ["Create attendance sessions", "Generate QR codes", "View student participation", "Export reports"],
              },
              {
                title: "Student Dashboard",
                icon: TrendingUp,
                items: ["View attendance %", "Activity history", "Upcoming events", "Career advisory"],
              },
              {
                title: "Analytics & Reports",
                icon: BarChart3,
                items: ["Attendance trends", "Participation heatmaps", "Engagement scores", "Custom date ranges"],
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                custom={i}
                variants={fadeUp}
                className="rounded-2xl border border-border bg-card overflow-hidden group hover:shadow-elevated transition-all duration-300"
              >
                <div className="p-1.5">
                  <div className="rounded-xl gradient-hero p-6 flex items-center justify-center h-40">
                    <card.icon className="w-16 h-16 text-primary/60" />
                  </div>
                </div>
                <div className="p-6 pt-4">
                  <h3 className="text-lg font-semibold mb-3" style={{ fontFamily: "var(--font-display)" }}>
                    {card.title}
                  </h3>
                  <ul className="space-y-2">
                    {card.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="relative rounded-3xl gradient-hero p-12 md:p-16 text-center overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-accent/10 blur-3xl" />

            <motion.div variants={fadeUp} custom={0} className="relative z-10 space-y-6">
              <h2
                className="text-3xl md:text-4xl font-bold text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Ready to modernize your campus?
              </h2>
              <p className="text-white/70 max-w-lg mx-auto">
                Join institutions already using CampusPulse to streamline attendance and boost student engagement.
              </p>
              <Button
                size="lg"
                className="bg-white text-foreground hover:bg-white/90 gap-2 text-base px-8"
                onClick={() => navigate("/login")}
              >
                Start Managing Attendance <ArrowRight className="w-4 h-4" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 text-primary-foreground" />
              </div>
              <span className="font-semibold" style={{ fontFamily: "var(--font-display)" }}>CampusPulse</span>
            </div>
            <div className="flex items-center gap-8 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">About</a>
              <a href="#features" className="hover:text-foreground transition-colors">Features</a>
              <a href="#" className="hover:text-foreground transition-colors">Contact</a>
            </div>
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} CampusPulse</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
