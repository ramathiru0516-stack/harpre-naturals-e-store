import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await signIn(email, password);
    if (error) {
      setError(error.message);
    } else {
      navigate("/");
    }
    setLoading(false);
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-border bg-muted/30 font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30";

  return (
    <div className="container mx-auto px-4 py-16 max-w-md">
      <h1 className="herb-section-title text-center mb-8">Sign In</h1>
      <form onSubmit={handleSubmit} className="herb-card p-6 space-y-4">
        {error && <p className="text-sm text-destructive font-body">{error}</p>}
        <input required type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className={inputClass} />
        <input required type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className={inputClass} />
        <button type="submit" disabled={loading} className="herb-btn-primary w-full">
          {loading ? "Signing in..." : "Sign In"}
        </button>
        <p className="text-center font-body text-sm text-muted-foreground">
          Don't have an account? <Link to="/signup" className="text-primary hover:underline">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
