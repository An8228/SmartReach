interface ComingSoonProps { title: string; }

export default function ComingSoon({ title }: ComingSoonProps) {
  return (
    <div className="max-w-3xl mx-auto px-6 py-24 text-center">
      <h1 className="text-3xl font-extrabold mb-3">{title}</h1>
      <p className="text-text-secondary">This section is still being built. Check back soon.</p>
    </div>
  );
}
