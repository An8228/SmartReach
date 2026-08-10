import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-24 text-center">
      <h1 className="text-6xl font-extrabold mb-4 gradient-text">404</h1>
      <p className="text-text-secondary mb-8">This page doesn't exist.</p>
      <Link to="/" className="text-primary hover:underline font-medium">Back to home</Link>
    </div>
  );
}
