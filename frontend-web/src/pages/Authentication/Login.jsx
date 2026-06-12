import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User2, Lock, Eye, EyeOff, Sparkles, ArrowRight } from "lucide-react";
import api from "../../api";
const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const response = await api.post("/token/", {
      username: formData.username,
      password: formData.password,
    });
    localStorage.setItem("access_token", response.data.access);
    localStorage.setItem("refresh_token", response.data.refresh);

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-bg-main flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Card with border */}
        <div className="bg-[var(--color-bg-card)] rounded-2xl border border-[var(--color-tx-main)]/8 shadow-sm p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-primary/10 mb-4">
              <Sparkles size={20} className="text-brand-primary" />
            </div>
            <h1 className="text-2xl font-semibold text-tx-main tracking-tight">
              Welcome back
            </h1>
            <p className="text-sm text-tx-muted mt-1.5">
              Sign in to continue your journey
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-tx-muted mb-1.5">
                Username
              </label>
              <div className="relative">
                <User2
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-tx-muted/40"
                />
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-[var(--color-tx-main)]/10 bg-[var(--color-bg-card)] text-tx-main placeholder:text-tx-muted/30 focus:outline-none focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/20 transition-all"
                  placeholder="@bbb"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-medium text-tx-muted mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-tx-muted/40"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full pl-9 pr-10 py-2.5 rounded-lg border border-[var(--color-tx-main)]/10 bg-[var(--color-bg-card)] text-tx-main placeholder:text-tx-muted/30 focus:outline-none focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/20 transition-all"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-tx-muted/40 hover:text-tx-muted/60 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <button className="text-xs text-brand-primary hover:underline transition-colors">
                Forgot password?
              </button>
            </div>

            {/* Error */}
            {error && (
              <div className="text-sm text-red-500 text-center bg-red-50 dark:bg-red-950/20 py-2 rounded-lg">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg bg-brand-primary text-white text-sm font-medium hover:bg-brand-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing in...
                </>
              ) : (
                <>
                  Sign in
                  <ArrowRight size={14} />
                </>
              )}
            </button>
          </form>

          {/* Register Link */}
          <p className="text-center text-sm text-tx-muted mt-6">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-brand-primary hover:underline transition-colors font-medium"
            >
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
