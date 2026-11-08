import { useState } from "react";
import "./../components/CMSLogin.css";

export default function CMSLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to sign in.");
      }

      sessionStorage.setItem("tmch_cms_token", data.token);
      sessionStorage.setItem("tmch_cms_user", JSON.stringify(data.user));

      window.location.href = "/cms";
    } catch (err) {
      setError(err.message || "Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="cms-login">
      <form className="cms-login__card" onSubmit={handleSubmit}>
        <p className="cms-login__eyebrow">TMCH GROUP</p>
        <h1>CMS Sign in</h1>
        <p>Sign in to manage company content.</p>

        <label htmlFor="cms-email">Email address</label>
        <input
          id="cms-email"
          type="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="cms-password">Password</label>
        <input
          id="cms-password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="cms-login__error">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </button>

        <a href="/" className="cms-login__back">
          Back to TMCH website
        </a>
      </form>
    </main>
  );
}
