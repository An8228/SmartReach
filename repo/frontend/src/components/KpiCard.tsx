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

export default function KpiCard({ label, sublabel, value, accent = "primary" }: KpiCardProps) {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold ${ACCENT_CLASSES[accent]}`}>
          {label.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-medium text-text-primary">{label}</p>
          <p className="text-xs text-text-secondary">{sublabel}</p>
        </div>
      </div>
      <p className="text-3xl font-extrabold tracking-tight">{value}</p>
    </div>
  );
}
