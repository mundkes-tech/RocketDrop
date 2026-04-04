import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Mail, Lock, Loader } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import { useRocketDrop } from '../hooks/useRocketDrop';
import Button from '../components/Button';

const isAdminUser = (user) => {
  const role = String(user?.role || '').toUpperCase();
  return role === 'ADMIN' || role === 'ROLE_ADMIN';
};

const LoginPage = () => {
  const { currentUser, actions } = useRocketDrop();
  const [values, setValues] = useState({ email: '', password: '' });
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const successMessage = location.state?.message || '';

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
    return (
      <MainLayout>
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center py-12 px-4">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
            <h1 className="text-2xl font-bold text-[#1E1B6A] mb-2">You are already signed in</h1>
            <p className="text-slate-600 mb-6">
              Signed in as <span className="font-semibold">{currentUser.email}</span>
            </p>

            <div className="space-y-3">
              <Button
                type="button"
                className="w-full"
                onClick={() => navigate(isAdminUser(currentUser) ? '/admin' : '/')}
              >
                Continue to {isAdminUser(currentUser) ? 'Admin Dashboard' : 'Home'}
              </Button>

              <Button
                type="button"
                variant="secondary"
                className="w-full"
                onClick={() => {
                  actions.logout();
                  navigate('/login', { replace: true });
                }}
              >
                Sign in with a different account
              </Button>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  const validateForm = () => {
    const errors = {};
    const email = values.email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) errors.email = 'Email is required';
    else if (!emailRegex.test(email)) errors.email = 'Enter a valid email address';
    if (!values.password) errors.password = 'Password is required';
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
      console.info('[Auth] Login submit', { email: values.email.trim().toLowerCase() });
      const user = await actions.login({
        email: values.email.trim().toLowerCase(),
        password: values.password,
      });
      const target = isAdminUser(user) ? '/admin' : '/';
      console.info('[Auth] Login success', { role: user?.role, target });
      navigate(target);
    } catch (err) {
      console.error('[Auth] Login failed', err);
      setError(parseApiError(err, 'Login failed'));
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold mb-1 text-[#1E1B6A]">
                Welcome Back
              </h1>
              <p className="text-slate-500 text-sm">Sign in to your RocketDrop account</p>
            </div>

            {/* Messages */}
            {successMessage && (
              <div className="mb-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200">
                <p className="text-sm text-emerald-700 flex items-center gap-2">
                  <span>✓</span> {successMessage}
                </p>
              </div>
            )}
            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200">
                <p className="text-sm text-red-700 flex items-center gap-2">
                  <span>⚠</span> {error}
                </p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={onSubmit} className="space-y-4">
              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="email"
                    value={values.email}
                    onChange={(event) => setValues((prev) => ({ ...prev, email: event.target.value }))}
                    className={`rd-input pl-10 ${fieldErrors.email ? 'border-red-500 focus:ring-1 focus:ring-red-500/30' : ''}`}
                    placeholder="you@example.com"
                  />
                </div>
                {fieldErrors.email && <p className="text-xs text-red-600 mt-1">{fieldErrors.email}</p>}
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="password"
                    value={values.password}
                    onChange={(event) => setValues((prev) => ({ ...prev, password: event.target.value }))}
                    className={`rd-input pl-10 ${fieldErrors.password ? 'border-red-500 focus:ring-1 focus:ring-red-500/30' : ''}`}
                    placeholder="Enter your password"
                  />
                </div>
                {fieldErrors.password && <p className="text-xs text-red-600 mt-1">{fieldErrors.password}</p>}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full mt-6"
              >
                {loading ? (
                  <>
                    <Loader size={18} className="animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <div className="flex-1 h-px bg-slate-200"></div>
              <p className="text-xs text-slate-500">No account yet?</p>
              <div className="flex-1 h-px bg-slate-200"></div>
            </div>

            {/* Register Link */}
            <p className="text-center">
              <Link
                to="/register"
                className="text-[#1E1B6A] hover:text-[#0a0a5e] font-semibold transition-colors"
              >
                Create account →
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

export default LoginPage;
