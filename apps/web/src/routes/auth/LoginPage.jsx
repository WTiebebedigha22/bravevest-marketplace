// apps/web/src/routes/auth/LoginPage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  ArrowRight,
  Shield,
  CheckCircle,
  Sparkles,
  Chrome,
  Apple,
  KeyRound
} from 'lucide-react';
import { useAuth } from '@/features/auth/context/AuthContext';

// Direct imports from UI package - using @ alias
import Button from '@bravevest/ui/components/Button.jsx';
import Input from '@bravevest/ui/components/Input.jsx';
import Card, { CardContent, CardHeader, CardTitle } from '@bravevest/ui/components/Card.jsx';
import Label from '@bravevest/ui/components/Label.jsx';

// Simple toast function
const toast = {
  success: (message) => console.log('✅', message),
  error: (message) => console.log('❌', message),
  info: (message) => console.log('ℹ️', message),
};

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Check for registration success message
  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      toast.success(location.state.message);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setIsLoading(true);

    try {
      const result = await login(email, password);
      
      if (result.requires2FA) {
        navigate('/2fa', { state: { userId: result.userId, email } });
      } else {
        toast.success('Welcome back!');
        const role = result.user?.role || 'investor';
        if (role === 'admin' || role === 'committee') {
          navigate('/admin/opportunities');
        } else if (role === 'borrower') {
          navigate('/borrower/dashboard');
        } else {
          navigate('/investor/dashboard');
        }
      }
    } catch (err) {
      setError(err.message || 'Invalid email or password. Please try again.');
      toast.error(err.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    toast.info('Password reset link will be sent to your email');
  };

  const handleSocialLogin = (provider) => {
    toast.info(`Login with ${provider} coming soon`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center py-8">
      <div className="w-full max-w-md px-4">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-2xl font-serif font-light text-gray-900">
            <Sparkles className="h-6 w-6 text-brave-teal" />
            BraveVest
          </div>
          <p className="text-sm text-gray-500 mt-1">Sign in to your account</p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-4 flex items-center gap-2 text-green-600 text-sm bg-green-50 p-3 rounded-xl border border-green-200 animate-fade-in">
            <CheckCircle className="h-4 w-4" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Main Card */}
        <Card className="shadow-xl border-0 rounded-3xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-brave-teal/5 to-brave-lime/5 pb-4">
            <CardTitle className="text-2xl text-center font-serif font-light text-gray-900">
              Welcome Back
            </CardTitle>
            <p className="text-center text-sm text-gray-500 mt-1">
              Sign in to access your investments
            </p>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div>
                <Label className="text-sm font-medium block mb-2 text-gray-700">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="pl-10 h-12 rounded-xl border-gray-200 focus:border-brave-teal focus:ring-brave-teal"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Password
                  </Label>
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-xs text-brave-teal hover:underline font-medium"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-10 pr-10 h-12 rounded-xl border-gray-200 focus:border-brave-teal focus:ring-brave-teal"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-brave-teal rounded border-gray-300 focus:ring-brave-teal"
                  />
                  <span className="text-sm text-gray-600">Remember me</span>
                </label>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Shield className="h-3 w-3" />
                  <span>Secure login</span>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-xl border border-red-200 animate-fade-in">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-12 rounded-full bg-brave-teal hover:bg-brave-teal/90 text-white text-base font-medium transition-all duration-300 shadow-lg shadow-brave-teal/20 hover:shadow-xl hover:shadow-brave-teal/30"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="outline"
                className="rounded-xl h-11 border-gray-200 hover:bg-gray-50 transition-colors"
                onClick={() => handleSocialLogin('Google')}
                disabled={isLoading}
              >
                <Chrome className="h-4 w-4 mr-2" />
                Google
              </Button>
              <Button
                type="button"
                variant="outline"
                className="rounded-xl h-11 border-gray-200 hover:bg-gray-50 transition-colors"
                onClick={() => handleSocialLogin('Apple')}
                disabled={isLoading}
              >
                <Apple className="h-4 w-4 mr-2" />
                Apple
              </Button>
            </div>

            {/* Sign Up Link */}
            <div className="text-center mt-6 pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-500">
                Don't have an account?{' '}
                <Link 
                  to="/register" 
                  className="text-brave-teal hover:underline font-medium transition-colors"
                >
                  Create one now
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Trust Badges */}
        <div className="mt-6 flex flex-wrap justify-center items-center gap-6 text-xs text-gray-400">
          <div className="flex items-center gap-1">
            <Shield className="h-3 w-3" />
            <span>Bank-grade security</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            <span>SEC licensed</span>
          </div>
          <div className="flex items-center gap-1">
            <KeyRound className="h-3 w-3" />
            <span>2FA protected</span>
          </div>
        </div>
      </div>
    </div>
  );
}