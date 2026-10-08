import { useState } from "react";
import {
  ArrowRight,
  Lock,
  Mail,
  Wallet
} from "lucide-react";
import {
  Link,
  useNavigate
} from "react-router-dom";

import { loginUser } from "../services/authService";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setForm((previous) => ({
      ...previous,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      console.log("LOGIN START");

      const data = await loginUser(form);

      console.log("LOGIN RESPONSE:", data);

      if (!data?.token) {
        throw new Error(
          "Login successful but token was not received"
        );
      }

      // Save JWT
      localStorage.setItem(
        "token",
        data.token
      );

      // Save user
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      console.log(
        "TOKEN SAVED:",
        localStorage.getItem("token")
      );

      console.log("REDIRECTING TO DASHBOARD");

      // Use React Router navigation
      navigate("/dashboard", {
        replace: true
      });
    } catch (error) {
      console.error(
        "LOGIN ERROR:",
        error
      );

      setError(
        error.response?.data?.message ||
          error.message ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <div className="auth-logo">
          <Wallet size={28} />
        </div>

        <p className="eyebrow">
          Welcome Back
        </p>

        <h1>Sign in</h1>

        <p className="auth-description">
          Manage your expenses and keep your
          finances organized.
        </p>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Email</label>

            <div className="input-with-icon">
              <Mail size={18} />

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>

            <div className="input-with-icon">
              <Lock size={18} />

              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="primary-button full-width"
            disabled={loading}
          >
            {loading
              ? "Signing in..."
              : "Sign In"}

            <ArrowRight size={18} />
          </button>

        </form>

        <p className="auth-footer">
          Don't have an account?{" "}
          <Link to="/register">
            Create one
          </Link>
        </p>

      </div>
    </div>
  );
}