
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Eye, EyeOff, LogIn, UserPlus } from 'lucide-react';
import HandDrawnButton from '@/components/ui/HandDrawnButton';
import HandDrawnContainer from '@/components/ui/HandDrawnContainer';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/context/AuthContext';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const { signIn, signUp, user, isLoading } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const validateForm = () => {
    if (!formData.email || !formData.password) {
      return false;
    }
    
    if (!isLogin) {
      if (!formData.name || !agreeTerms || formData.password !== formData.confirmPassword) {
        return false;
      }
    }
    
    return true;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    if (isLogin) {
      await signIn(formData.email, formData.password);
    } else {
      await signUp(formData.email, formData.password, formData.name);
    }
  };

  // Redirect if already logged in
  if (user && !isLoading) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <HandDrawnContainer className="p-8 bg-white animate-fade-in">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">
                {isLogin ? 'Welcome Back' : 'Create an Account'}
              </h1>
              <p className="text-gray-600">
                {isLogin ? 'Sign in to your account' : 'Start your investment journey today'}
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="mb-4">
                  <label htmlFor="name" className="block font-handwritten font-medium mb-2">Full Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className="hand-drawn-input w-full"
                    required
                  />
                </div>
              )}

              <div className="mb-4">
                <label htmlFor="email" className="block font-handwritten font-medium mb-2">Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="hand-drawn-input w-full"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block font-handwritten font-medium mb-2">Password</label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
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
              </div>

              {!isLogin && (
                <>
                  <div className="mb-6">
                    <label htmlFor="confirmPassword" className="block font-handwritten font-medium mb-2">Confirm Password</label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="hand-drawn-input w-full"
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        checked={agreeTerms}
                        onChange={() => setAgreeTerms(!agreeTerms)}
                        className="mt-1 mr-2"
                        required
                      />
                      <span className="text-sm text-gray-600">
                        I agree to the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                      </span>
                    </label>
                  </div>
                </>
              )}

              <HandDrawnButton
                type="submit"
                variant="primary"
                className="w-full mb-4"
                disabled={!validateForm()}
              >
                {isLogin ? (
                  <><LogIn size={18} className="mr-2" /> Sign In</>
                ) : (
                  <><UserPlus size={18} className="mr-2" /> Create Account</>
                )}
              </HandDrawnButton>

              <div className="text-center mt-6">
                <p className="text-gray-600">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}
                  <button 
                    type="button"
                    onClick={() => setIsLogin(!isLogin)} 
                    className="text-blue-600 hover:underline ml-1"
                  >
                    {isLogin ? "Sign up" : "Log in"}
                  </button>
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

export default Auth;
