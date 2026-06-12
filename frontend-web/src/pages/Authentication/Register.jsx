import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
  AtSign,
} from "lucide-react";
import api from "../../api";
const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Username validation
    if (!formData.username.trim()) newErrors.username = "Username is required";
    else if (formData.username.length < 3)
      newErrors.username = "Username must be at least 3 characters";
    else if (!/^[a-zA-Z0-9_]+$/.test(formData.username))
      newErrors.username =
        "Username can only contain letters, numbers, and underscores";

    // Name validation
    if (!formData.fullname.trim()) newErrors.name = "Full name is required";

    // Email validation
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";

    // Password validation
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    // Confirm password validation
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    const data = {
      fullname: formData.fullname,
      username: formData.username,
      email: formData.email,
      password: formData.password,
      confirmed_password: formData.confirmPassword,
    };

    try {
      const response = await api.post("/users/register/", { ...data });

      const { access, refresh } = response.data;

      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);

      setLoading(false);
      navigate("/dashboard");
    } catch (err) {
      if (err.response) {
        console.log("Validation Errors:", err.response.data);
      } else {
        console.error("Error:", err.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-bg-main flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Card with border */}
        <div className="bg-bg-card rounded-2xl border border-tx-main/8 shadow-sm p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-primary/10 mb-4">
              <Sparkles size={20} className="text-brand-primary" />
            </div>
            <h1 className="text-2xl font-semibold text-tx-main tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-tx-muted mt-1.5">
              Start your learning journey today
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-xs font-medium text-tx-muted mb-1.5">
                Username
              </label>
              <div className="relative">
                <AtSign
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-tx-muted/40"
                />
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  className={`w-full pl-9 pr-4 py-2.5 rounded-lg border bg-bg-card text-tx-main placeholder:text-tx-muted/30 focus:outline-none focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/20 transition-all ${
                    errors.username ? "border-red-500" : "border-tx-main/10"
                  }`}
                  placeholder="e.g., john_doe"
                />
              </div>
              {errors.username && (
                <p className="text-xs text-red-500 mt-1.5">{errors.username}</p>
              )}
              <p className="text-xs text-tx-muted/50 mt-1.5">
                Only letters, numbers, and underscores
              </p>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-xs font-medium text-tx-muted mb-1.5">
                Full name
              </label>
              <div className="relative">
                <User
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-tx-muted/40"
                />
                <input
                  type="text"
                  value={formData.fullname}
                  onChange={(e) =>
                    setFormData({ ...formData, fullname: e.target.value })
                  }
                  className={`w-full pl-9 pr-4 py-2.5 rounded-lg border bg-bg-card text-tx-main placeholder:text-tx-muted/30 focus:outline-none focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/20 transition-all ${
                    errors.name ? "border-red-500" : "border-tx-main/10"
                  }`}
                  placeholder="Enter your full name"
                />
              </div>
              {errors.name && (
                <p className="text-xs text-red-500 mt-1.5">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-tx-muted mb-1.5">
                Email address
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-tx-muted/40"
                />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className={`w-full pl-9 pr-4 py-2.5 rounded-lg border bg-bg-card text-tx-main placeholder:text-tx-muted/30 focus:outline-none focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/20 transition-all ${
                    errors.email ? "border-red-500" : "border-tx-main/10"
                  }`}
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-500 mt-1.5">{errors.email}</p>
              )}
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
                  className={`w-full pl-9 pr-10 py-2.5 rounded-lg border bg-bg-card text-tx-main placeholder:text-tx-muted/30 focus:outline-none focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/20 transition-all ${
                    errors.password ? "border-red-500" : "border-tx-main/10"
                  }`}
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-tx-muted/40 hover:text-tx-muted/60 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500 mt-1.5">{errors.password}</p>
              )}
              <p className="text-xs text-tx-muted/50 mt-1.5">
                Must be at least 6 characters
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-medium text-tx-muted mb-1.5">
                Confirm password
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-tx-muted/40"
                />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className={`w-full pl-9 pr-10 py-2.5 rounded-lg border bg-bg-card text-tx-main placeholder:text-tx-muted/30 focus:outline-none focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/20 transition-all ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-tx-main/10"
                  }`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-tx-muted/40 hover:text-tx-muted/60 transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-xs text-red-500 mt-1.5">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg bg-brand-primary text-white text-sm font-medium hover:bg-brand-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating account...
                </>
              ) : (
                <>
                  Create account
                  <ArrowRight size={14} />
                </>
              )}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center text-sm text-tx-muted mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-brand-primary hover:underline transition-colors font-medium"
            >
              Sign in
            </Link>
          </p>

          {/* Terms */}
          <p className="text-center text-[10px] text-tx-muted/40 mt-6 pt-4 border-t border-tx-main/5">
            By creating an account, you agree to our{" "}
            <button className="text-brand-primary/70 hover:text-brand-primary transition-colors">
              Terms
            </button>{" "}
            and{" "}
            <button className="text-brand-primary/70 hover:text-brand-primary transition-colors">
              Privacy Policy
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
