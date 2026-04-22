import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Phone, Loader, Check, X } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import { useRocketDrop } from '../hooks/useRocketDrop';
import Button from '../components/Button';

const isAdminUser = (user) => {
  const role = String(user?.role || '').toUpperCase();
  return role === 'ADMIN' || role === 'ROLE_ADMIN';
};

const RegisterPage = () => {
  const { currentUser, actions } = useRocketDrop();
  const [values, setValues] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const parseApiError = (err, fallback) => {
    const payload = err?.response?.data;
    if (typeof payload === 'string' && payload.trim()) return payload;
    if (payload?.message) return payload.message;
    if (Array.isArray(payload?.errors) && payload.errors.length > 0) {
      return payload.errors.map((item) => item.defaultMessage || item.message).filter(Boolean).join(', ');
    }
    if (err?.message) return err.message;
    return fallback;
  };

  if (currentUser) {
    return <Navigate to={isAdminUser(currentUser) ? '/admin' : '/'} replace />;
  }

  const getPasswordStrength = (password) => {
    if (!password) return null;
    if (password.length < 8) return { text: 'Too short', color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30', strength: 1 };
    if (!/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) return { text: 'Fair', color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', strength: 2 };
    return { text: 'Strong', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', strength: 3 };
  };

  const passwordStrength = getPasswordStrength(values.password);
  const passwordsMatch = values.password && values.confirmPassword && values.password === values.confirmPassword;

  const validateForm = () => {
    const errors = {};
    const email = values.email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!values.name.trim()) errors.name = 'Full name is required';
    if (!email) errors.email = 'Email is required';
    else if (!emailRegex.test(email)) errors.email = 'Enter a valid email address';

    if (values.phone && !/^\+?[0-9\s-]{8,15}$/.test(values.phone.trim())) {
      errors.phone = 'Enter a valid phone number';
    }

    if (!values.password) errors.password = 'Password is required';
    else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(values.password)) {
      errors.password = 'Password must include uppercase, lowercase and number';
    }

    if (!values.confirmPassword) errors.confirmPassword = 'Please confirm password';
    else if (values.password !== values.confirmPassword) errors.confirmPassword = 'Passwords do not match';

    return errors;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const errors = validateForm();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setLoading(true);
    setError('');
    try {
      const payload = { ...values };
      delete payload.confirmPassword;
      await actions.register({
        ...payload,
        name: payload.name.trim(),
        email: payload.email.trim().toLowerCase(),
        phone: payload.phone.trim(),
      });
      navigate('/login', { state: { message: 'Account created. Please sign in.' } });
    } catch (err) {
      setError(parseApiError(err, 'Registration failed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
            {/* Header */}
            <div className="mb-8 text-center">
              <div className="inline-block bg-[#1E1B6A] p-3 rounded-xl mb-4">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold mb-1 text-[#1E1B6A]">
                Join RocketDrop
              </h1>
              <p className="text-slate-500 text-sm">Create account to catch the next big drop</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200">
                <p className="text-sm text-red-700 flex items-center gap-2">
                  <span>⚠</span> {error}
                </p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={onSubmit} className="space-y-4">
              {/* Name Input */}
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="text"
                    value={values.name}
                    onChange={(event) => setValues((prev) => ({ ...prev, name: event.target.value }))}
                    autoComplete="name"
                    className={`rd-input pl-10 ${fieldErrors.name ? 'border-red-500 focus:ring-1 focus:ring-red-500/30' : ''}`}
                    placeholder="John Doe"
                  />
                </div>
                {fieldErrors.name && <p className="text-xs text-red-600 mt-1">{fieldErrors.name}</p>}
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="email"
                    value={values.email}
                    onChange={(event) => setValues((prev) => ({ ...prev, email: event.target.value }))}
                    autoComplete="email"
                    className={`rd-input pl-10 ${fieldErrors.email ? 'border-red-500 focus:ring-1 focus:ring-red-500/30' : ''}`}
                    placeholder="you@example.com"
                  />
                </div>
                {fieldErrors.email && <p className="text-xs text-red-600 mt-1">{fieldErrors.email}</p>}
              </div>

              {/* Phone Input */}
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Phone (Optional)</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="tel"
                    value={values.phone}
                    onChange={(event) => setValues((prev) => ({ ...prev, phone: event.target.value }))}
                    autoComplete="tel"
                    className={`rd-input pl-10 ${fieldErrors.phone ? 'border-red-500 focus:ring-1 focus:ring-red-500/30' : ''}`}
                    placeholder="+91 98765 43210"
                  />
                </div>
                {fieldErrors.phone && <p className="text-xs text-red-600 mt-1">{fieldErrors.phone}</p>}
              </div>

              {/* Password Input */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-slate-600">Password</label>
                  {passwordStrength && (
                    <span className={`text-xs font-semibold ${passwordStrength.color}`}>
                      {passwordStrength.text}
                    </span>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="password"
                    value={values.password}
                    onChange={(event) => setValues((prev) => ({ ...prev, password: event.target.value }))}
                    autoComplete="new-password"
                    className={`rd-input pl-10 ${fieldErrors.password ? 'border-red-500 focus:ring-1 focus:ring-red-500/30' : ''}`}
                    placeholder="Min. 8 characters, with numbers"
                  />
                </div>
                {fieldErrors.password && <p className="text-xs text-red-600 mt-1">{fieldErrors.password}</p>}
                {passwordStrength && (
                  <div className={`mt-2 p-2 rounded-lg ${passwordStrength.bg} border ${passwordStrength.border}`}>
                    <div className="flex gap-1">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div
                          key={i}
                          className={`flex-1 h-1 rounded-full transition-colors ${
                            i < passwordStrength.strength ? passwordStrength.color.replace('text-', 'bg-') : 'bg-slate-200'
                          }`}
                        ></div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password Input */}
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="password"
                    value={values.confirmPassword}
                    onChange={(event) => setValues((prev) => ({ ...prev, confirmPassword: event.target.value }))}
                    autoComplete="new-password"
                    className={`w-full bg-white border rounded-xl pl-10 pr-4 py-3 focus:outline-none transition-all text-slate-900 placeholder-slate-400 ${
                      fieldErrors.confirmPassword
                        ? 'border-red-500 focus:ring-1 focus:ring-red-500/30'
                        : values.confirmPassword
                        ? passwordsMatch
                          ? 'border-emerald-500 focus:ring-1 focus:ring-emerald-500/30'
                          : 'border-red-500 focus:ring-1 focus:ring-red-500/30'
                        : 'border-slate-200 focus:border-[#1E1B6A] focus:ring-1 focus:ring-[#1E1B6A]/30'
                    }`}
                    placeholder="Confirm password"
                  />
                  {values.confirmPassword && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      {passwordsMatch ? (
                        <Check size={18} className="text-emerald-400" />
                      ) : (
                        <X size={18} className="text-red-400" />
                      )}
                    </div>
                  )}
                </div>
                {fieldErrors.confirmPassword && <p className="text-xs text-red-600 mt-1">{fieldErrors.confirmPassword}</p>}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading || !passwordsMatch}
                className="w-full mt-6"
              >
                {loading ? (
                  <>
                    <Loader size={18} className="animate-spin" />
                    Creating account...
                  </>
                ) : (
                  'Create Account'
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <div className="flex-1 h-px bg-slate-200"></div>
              <p className="text-xs text-slate-500">Already registered?</p>
              <div className="flex-1 h-px bg-slate-200"></div>
            </div>

            {/* Login Link */}
            <p className="text-center">
              <Link
                to="/login"
                className="text-[#1E1B6A] hover:text-[#0a0a5e] font-semibold transition-colors"
              >
                Sign in instead →
              </Link>
            </p>
          </div>

          {/* Footer Text */}
          <p className="text-center text-slate-500 text-xs mt-6">
            Protected by RocketDrop Security. Your data is encrypted.
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default RegisterPage;
