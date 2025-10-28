"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        // Successful authentication — toast and redirect to admin
        toast.success("Signed in — redirecting to admin");
        window.location.href = "/admin";
        return;
      }

      const data = await res.json();
      const msg = data?.error ?? "Invalid credentials";
      setError(msg);
      toast.error(msg);
    } catch (err: any) {
      const msg = err?.message ?? String(err);
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Admin Login</h2>

        {error ? <p className="text-sm text-red-600 mb-3">{error}</p> : null}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 mb-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 mb-4 rounded"
          required
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Signing in..." : "Login"}
        </Button>

        <div className="mt-3 text-center">
          <a href="/" className="text-sm text-slate-600 hover:underline inline-flex items-center gap-2">
            <ArrowLeft size={14} /> Back to shop
          </a>
        </div>
      </form>
    </div>
  );
}
