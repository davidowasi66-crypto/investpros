
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import NotificationSystem from '@/components/ui/NotificationSystem';
import TrustIndicators from '@/components/ui/TrustIndicators';
import ActivityFeed from '@/components/ui/ActivityFeed';
import FeatureCard from '@/components/ui/FeatureCard';
import InvestmentPlanCard from '@/components/ui/InvestmentPlanCard';
import { Shield, TrendingUp, Users, Globe, Clock, Star } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, BarChart3, Coins, ChevronRight } from 'lucide-react';
import HandDrawnButton from '@/components/ui/HandDrawnButton';
import HandDrawnContainer from '@/components/ui/HandDrawnContainer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NotificationSystem />
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-12 md:mb-0">
                <div className="animate-fade-in">
                  <span className="font-handwritten text-lg text-blue-600 bg-blue-100 px-4 py-1 rounded-full inline-block mb-4">High Yield Investment Platform</span>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                    Grow Your <span className="text-blue-600">Wealth</span> with Confidence
                  </h1>
                  <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
                    Our platform offers secure, high-yield investment opportunities tailored to your portfolio needs across multiple asset classes.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <Link to="/plans" className="w-full sm:w-auto">
                      <HandDrawnButton variant="outline" className="w-full sm:w-auto px-6 sm:px-8 py-4 text-base sm:text-lg touch-target">
                        View Plans
                      </HandDrawnButton>
                    </Link>
                    <Link to="/register" className="w-full sm:w-auto">
                      <HandDrawnButton variant="primary" className="w-full sm:w-auto px-6 sm:px-8 py-4 text-base sm:text-lg touch-target">
                        Get Started <ArrowRight className="ml-2 inline-block h-4 w-4 sm:h-5 sm:w-5" />
                      </HandDrawnButton>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="relative animate-float">
                  <HandDrawnContainer className="relative z-10 overflow-hidden p-8 bg-white">
                    <div className="relative">
                      <img 
                        src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                        alt="Investment Portfolio Management"
                        className="rounded-lg w-full h-auto"
                      />
                      <div className="absolute top-4 left-4 bg-white bg-opacity-90 p-3 rounded-lg border-2 border-black">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          <span className="font-handwritten font-bold">+248% ROI</span>
                        </div>
                      </div>
                      <div className="absolute bottom-4 right-4 bg-white bg-opacity-90 p-3 rounded-lg border-2 border-black">
                        <div className="font-handwritten font-bold">
                          Active Investors: 10,482
                        </div>
                      </div>
                    </div>
                  </HandDrawnContainer>
                  <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-blue-100 rounded-full -z-10"></div>
                  <div className="absolute -top-6 -left-6 w-32 h-32 bg-yellow-100 rounded-full -z-10"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      
        {/* Trust Indicators Section */}
        <section className="py-12 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <TrustIndicators />
          </div>
        </section>

        {/* Quick Features Overview */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="font-handwritten text-lg text-blue-600 bg-blue-100 px-4 py-1 rounded-full inline-block mb-4">Why Choose Us</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Smart Investment Made Simple</h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Join thousands of investors who trust our platform for secure, high-yield opportunities.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              <FeatureCard
                title="Bank-Level Security"
                description="Advanced encryption and multi-factor authentication"
                icon={<Shield className="h-6 w-6" />}
              />
              <FeatureCard
                title="Fast Processing"
                description="Quick deposits and withdrawal processing"
                icon={<Zap className="h-6 w-6" />}
              />
              <FeatureCard
                title="Real-Time Analytics"
                description="Track performance with detailed insights"
                icon={<BarChart3 className="h-6 w-6" />}
              />
              <FeatureCard
                title="Multiple Assets"
                description="Diversified investment opportunities"
                icon={<Coins className="h-6 w-6" />}
              />
            </div>
            
            <div className="text-center mt-12">
              <Link to="/features">
                <HandDrawnButton variant="outline">
                  View All Features <ChevronRight className="ml-1 inline-block h-4 w-4" />
                </HandDrawnButton>
              </Link>
            </div>
          </div>
        </section>

        {/* Investment Plans Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="font-handwritten text-lg text-blue-600 bg-blue-100 px-4 py-1 rounded-full inline-block mb-4">Investment Plans</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Choose Your Investment Strategy</h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                From conservative to aggressive growth, we have plans that match your investment goals.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
              <InvestmentPlanCard
                title="Starter"
                percentage={5}
                duration="weekly"
                features={[
                  "Minimum investment: $100",
                  "Weekly payouts",
                  "30-day contract",
                  "No early withdrawal fee",
                  "Basic analytics"
                ]}
              />
              <InvestmentPlanCard
                title="Growth"
                percentage={12}
                duration="weekly"
                features={[
                  "Minimum investment: $500",
                  "Weekly payouts",
                  "60-day contract",
                  "Priority support",
                  "Advanced analytics",
                  "Referral bonuses"
                ]}
                popular={true}
              />
              <InvestmentPlanCard
                title="Premium"
                percentage={20}
                duration="weekly"
                features={[
                  "Minimum investment: $2000",
                  "Weekly payouts",
                  "90-day contract",
                  "VIP support",
                  "Full dashboard access",
                  "Compound interest option",
                  "Exclusive investment options"
                ]}
              />
            </div>

            <div className="text-center">
              <Link to="/plans">
                <HandDrawnButton variant="outline">
                  View All Plans <ChevronRight className="ml-1 inline-block h-4 w-4" />
                </HandDrawnButton>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4">
            <HandDrawnContainer className="max-w-4xl mx-auto p-8 md:p-12 bg-white text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Ready to Grow Your Wealth?</h2>
              <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
                Join thousands of investors who trust our platform for secure and high-yield investment opportunities.
              </p>
              <Link to="/register">
                <HandDrawnButton variant="primary" className="px-8 py-4 text-lg animate-pulse-subtle">
                  Create Your Account <ArrowRight className="ml-2 inline-block h-5 w-5" />
                </HandDrawnButton>
              </Link>
              <div className="mt-8 text-sm text-gray-500">
                Already have an account? <Link to="/login" className="text-blue-600 underline">Log in</Link>
              </div>
            </HandDrawnContainer>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
