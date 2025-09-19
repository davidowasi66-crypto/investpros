
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import HandDrawnButton from '@/components/ui/HandDrawnButton';
import HandDrawnContainer from '@/components/ui/HandDrawnContainer';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt with:', { email, password });
    // TODO: Implement actual login logic with Supabase
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <HandDrawnContainer className="p-8 bg-white animate-fade-in">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Welcome Back!</h1>
              <p className="text-gray-600">Log in to manage your investments</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="email" className="block font-handwritten font-medium mb-2">Email Address</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="hand-drawn-input w-full"
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="password" className="block font-handwritten font-medium mb-2">Password</label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="hand-drawn-input w-full pr-10"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <div className="text-right mt-2">
                  <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
                    Forgot password?
                  </Link>
                </div>
              </div>

              <HandDrawnButton
                type="submit"
                variant="primary"
                className="w-full mb-4"
              >
                <LogIn size={18} className="mr-2" /> Log In
              </HandDrawnButton>

              <div className="text-center mt-6">
                <p className="text-gray-600">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-blue-600 hover:underline">
                    Sign up
                  </Link>
                </p>
              </div>
            </form>
          </HandDrawnContainer>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
