import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await signUp(email, password, name);
    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
    }
    setLoading(false);
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-border bg-muted/30 font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30";

  if (success) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-md text-center">
        <h1 className="herb-section-title mb-4">Check Your Email</h1>
        <p className="font-body text-muted-foreground">We've sent you a confirmation email. Please verify your email to continue.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-md">
      <h1 className="herb-section-title text-center mb-8">Create Account</h1>
      <form onSubmit={handleSubmit} className="herb-card p-6 space-y-4">
        {error && <p className="text-sm text-destructive font-body">{error}</p>}
        <input required placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} className={inputClass} />
        <input required type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className={inputClass} />
        <input required type="password" placeholder="Password (min 6 chars)" minLength={6} value={password} onChange={e => setPassword(e.target.value)} className={inputClass} />
        <button type="submit" disabled={loading} className="herb-btn-primary w-full">
          {loading ? "Creating..." : "Create Account"}
        </button>
        <p className="text-center font-body text-sm text-muted-foreground">
          Already have an account? <Link to="/login" className="text-primary hover:underline">Sign In</Link>
        </p>
      </form>
    </div>
  );
};

export default SignupPage;
