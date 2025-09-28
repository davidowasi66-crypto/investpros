import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FeatureCard from '@/components/ui/FeatureCard';
import ActivityFeed from '@/components/ui/ActivityFeed';
import { 
  Shield, 
  TrendingUp, 
  Users, 
  Globe, 
  Clock, 
  Star,
  Zap,
  BarChart3,
  Coins,
  Lock,
  Smartphone,
  HeadphonesIcon,
  FileCheck,
  Gift,
  CreditCard,
  Wallet
} from 'lucide-react';
import HandDrawnContainer from '@/components/ui/HandDrawnContainer';
import HandDrawnButton from '@/components/ui/HandDrawnButton';
import { Link } from 'react-router-dom';

const Features = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-purple-50 to-blue-100">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Advanced <span className="text-blue-600">Features</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Discover the powerful tools and features that make InvestPro the premier choice for smart investors worldwide.
              </p>
            </div>
          </div>
        </section>

        {/* Core Features */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Core Features</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need for successful investing in one platform
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard
                title="Bank-Level Security"
                description="Advanced encryption, 2FA, and cold storage protect your investments"
                icon={<Shield className="h-6 w-6" />}
              />
              <FeatureCard
                title="Lightning Fast"
                description="Quick deposits, instant trades, and rapid withdrawal processing"
                icon={<Zap className="h-6 w-6" />}
              />
              <FeatureCard
                title="Advanced Analytics"
                description="Real-time charts, portfolio tracking, and performance insights"
                icon={<BarChart3 className="h-6 w-6" />}
              />
              <FeatureCard
                title="Multi-Asset Support"
                description="Stocks, bonds, crypto, real estate, and commodity investments"
                icon={<Coins className="h-6 w-6" />}
              />
            </div>
          </div>
        </section>

        {/* Security Features */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Security & Protection</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Your security is our top priority. Advanced protection at every level.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <HandDrawnContainer className="p-8 bg-white text-center">
                <Lock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-4">End-to-End Encryption</h3>
                <p className="text-gray-600">
                  All data is encrypted using AES-256 encryption, the same standard used by banks and government agencies.
                </p>
              </HandDrawnContainer>

              <HandDrawnContainer className="p-8 bg-white text-center">
                <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-4">Multi-Factor Authentication</h3>
                <p className="text-gray-600">
                  Additional security layers including SMS, email, and authenticator app verification.
                </p>
              </HandDrawnContainer>

              <HandDrawnContainer className="p-8 bg-white text-center">
                <FileCheck className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-4">Regular Audits</h3>
                <p className="text-gray-600">
                  Independent security audits and compliance checks ensure maximum protection.
                </p>
              </HandDrawnContainer>
            </div>
          </div>
        </section>

        {/* Platform Features */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Platform Capabilities</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <Smartphone className="h-8 w-8 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">Mobile Optimized</h3>
                    <p className="text-gray-600">
                      Full-featured mobile experience with responsive design and touch-optimized interface.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <HeadphonesIcon className="h-8 w-8 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
                    <p className="text-gray-600">
                      Round-the-clock customer support via live chat, email, and phone assistance.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Globe className="h-8 w-8 text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">Global Access</h3>
                    <p className="text-gray-600">
                      Available worldwide with multi-language support and local payment methods.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="h-8 w-8 text-orange-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">Instant Transactions</h3>
                    <p className="text-gray-600">
                      Real-time processing for deposits, trades, and withdrawals with minimal delays.
                    </p>
                  </div>
                </div>
              </div>

              <HandDrawnContainer className="p-8 bg-white">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Platform dashboard"
                  className="rounded-lg w-full h-auto"
                />
              </HandDrawnContainer>
            </div>
          </div>
        </section>

        {/* Payment & Withdrawal Features */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Payment Solutions</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Flexible payment options and fast withdrawal processing
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                title="Multiple Payment Methods"
                description="Credit cards, bank transfers, digital wallets, and cryptocurrency"
                icon={<CreditCard className="h-6 w-6" />}
              />
              <FeatureCard
                title="Instant Deposits"
                description="Immediate fund availability for most payment methods"
                icon={<Zap className="h-6 w-6" />}
              />
              <FeatureCard
                title="Fast Withdrawals"
                description="Quick processing with most withdrawals completed within 24 hours"
                icon={<Wallet className="h-6 w-6" />}
              />
            </div>
          </div>
        </section>

        {/* Live Activity Demo */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Real-Time Activity</h2>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Watch live investment activity from our global user base. See real deposits, withdrawals, 
                  and investment returns happening in real-time.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Star className="h-5 w-5 text-yellow-500" />
                    <span className="text-gray-700">Live transaction feed</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                    <span className="text-gray-700">Real performance metrics</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-blue-500" />
                    <span className="text-gray-700">Active user statistics</span>
                  </div>
                </div>
              </div>
              <div>
                <ActivityFeed />
              </div>
            </div>
          </div>
        </section>

        {/* Referral Features */}
        <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-100">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Gift className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Referral Program</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Earn extra income by referring friends and family to InvestPro
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">10%</div>
                  <p className="text-gray-600">Commission on referrals</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">$50</div>
                  <p className="text-gray-600">Signup bonus</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">∞</div>
                  <p className="text-gray-600">Unlimited referrals</p>
                </div>
              </div>

              <Link to="/register">
                <HandDrawnButton variant="primary" className="px-8 py-4 text-lg">
                  Start Earning Today
                </HandDrawnButton>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Features;