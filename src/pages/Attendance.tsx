import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QrCode, Camera, CheckCircle2, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Attendance = () => {
  const [scanning, setScanning] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const handleScan = () => {
    setScanning(true);
    // Simulate scan
    setTimeout(() => {
      setScanning(false);
      setConfirmed(true);
    }, 3000);
  };

  const reset = () => {
    setConfirmed(false);
    setScanning(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Mark Attendance</h1>
        <p className="text-muted-foreground text-sm mt-1">Scan the QR code displayed by your teacher</p>
      </div>

      <AnimatePresence mode="wait">
        {!scanning && !confirmed && (
          <motion.div
            key="start"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="stat-card text-center py-12"
          >
            <div className="mx-auto w-24 h-24 rounded-3xl gradient-primary flex items-center justify-center mb-6 shadow-glow">
              <QrCode className="h-12 w-12 text-primary-foreground" />
            </div>
            <h2 className="text-xl font-display font-semibold text-foreground mb-2">
              Ready to Scan
            </h2>
            <p className="text-muted-foreground text-sm mb-6 max-w-sm mx-auto">
              Point your camera at the QR code to instantly mark your attendance
            </p>
            <Button variant="gradient" size="lg" className="rounded-xl gap-2" onClick={handleScan}>
              <Camera className="h-5 w-5" /> Open Scanner
            </Button>
          </motion.div>
        )}

        {scanning && (
          <motion.div
            key="scanning"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="stat-card text-center py-8"
          >
            <div className="relative mx-auto w-64 h-64 rounded-2xl bg-foreground/5 border-2 border-dashed border-primary/30 flex items-center justify-center mb-6 overflow-hidden">
              {/* Scanner animation */}
              <motion.div
                className="absolute inset-x-0 h-0.5 gradient-primary"
                animate={{ top: ["10%", "90%", "10%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="absolute inset-4 border-2 border-primary/20 rounded-xl" />
              <Camera className="h-10 w-10 text-muted-foreground animate-pulse-soft" />
            </div>
            <p className="text-sm text-muted-foreground mb-4">Scanning QR code...</p>
            <Button variant="outline" className="rounded-xl gap-2" onClick={reset}>
              <X className="h-4 w-4" /> Cancel
            </Button>
          </motion.div>
        )}

        {confirmed && (
          <motion.div
            key="confirmed"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="stat-card text-center py-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
              className="mx-auto w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mb-6"
            >
              <CheckCircle2 className="h-10 w-10 text-success" />
            </motion.div>
            <h2 className="text-xl font-display font-semibold text-foreground mb-2">
              Attendance Recorded!
            </h2>
            <p className="text-muted-foreground text-sm mb-1">Data Structures — Section A</p>
            <p className="text-xs text-muted-foreground mb-6">March 6, 2026 · 10:15 AM</p>
            <Button variant="outline" className="rounded-xl" onClick={reset}>
              Scan Another
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Attendance;
