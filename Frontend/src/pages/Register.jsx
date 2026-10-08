import { useState } from "react";
import {
  ArrowRight,
  Lock,
  Mail,
  User,
  Wallet
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../services/authService";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const data = await registerUser(form);

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      navigate("/dashboard");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Registration failed"
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
          Get Started
        </p>

        <h1>Create account</h1>

        <p className="auth-description">
          Start tracking your spending today.
        </p>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>

            <div className="input-with-icon">
              <User size={18} />

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                required
              />
            </div>
          </div>

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
                placeholder="Minimum 6 characters"
                minLength={6}
                required
              />
            </div>
          </div>

          <button
            className="primary-button full-width"
            disabled={loading}
          >
            {loading
              ? "Creating..."
              : "Create Account"}

            <ArrowRight size={18} />
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?{" "}
          <Link to="/login">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}