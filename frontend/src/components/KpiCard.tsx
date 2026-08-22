import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

interface KpiCardProps {
  label: string;
  sublabel: string;
  value: string;
  accent?: "primary" | "accent" | "success";
}

const ACCENT_CLASSES: Record<string, string> = {
  primary: "text-primary bg-primary/15",
  accent: "text-accent bg-accent/15",
  success: "text-success bg-success/15",
};

function AnimatedNumber({ value }: { value: string }) {
  const match = value.match(/^([$]?[\d,]+\.?\d*)(.*)$/);
  const numericPart = match ? match[1] : value;
  const suffix = match ? match[2] : "";
  const numericValue = parseFloat(numericPart.replace(/[$,]/g, "")) || 0;
  const prefix = numericPart.startsWith("$") ? "$" : "";

  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v).toLocaleString());

  useEffect(() => {
    const controls = animate(count, numericValue, { duration: 1, ease: "easeOut" });
    return controls.stop;
  }, [numericValue]);

  return (
    <span>
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

export default function KpiCard({ label, sublabel, value, accent = "primary" }: KpiCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(0,0,0,0.25)" }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="glass-card p-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold ${ACCENT_CLASSES[accent]}`}>
          {label.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-medium text-text-primary">{label}</p>
          <p className="text-xs text-text-secondary">{sublabel}</p>
        </div>
      </div>
      <p className="text-3xl font-extrabold tracking-tight">
        <AnimatedNumber value={value} />
      </p>
    </motion.div>
  );
}