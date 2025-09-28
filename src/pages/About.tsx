import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FeatureCard from '@/components/ui/FeatureCard';
import TrustIndicators from '@/components/ui/TrustIndicators';
import { Shield, Users, Globe, Clock, TrendingUp, Award, CheckCircle, Star } from 'lucide-react';
import HandDrawnContainer from '@/components/ui/HandDrawnContainer';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                About <span className="text-blue-600">InvestPro</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                We're revolutionizing investment management with secure, transparent, and high-yield opportunities for investors worldwide.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  At InvestPro, we believe that everyone deserves access to professional-grade investment opportunities. 
                  Our mission is to democratize wealth building through innovative technology and expert financial guidance.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  We combine cutting-edge security protocols with transparent investment strategies to help our clients 
                  achieve their financial goals with confidence.
                </p>
              </div>
              <HandDrawnContainer className="p-8 bg-white">
                <img 
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Professional team discussion"
                  className="rounded-lg w-full h-auto"
                />
              </HandDrawnContainer>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <TrustIndicators />
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Core Values</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                These principles guide everything we do at InvestPro
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard
                title="Security First"
                description="Bank-level encryption and multi-factor authentication protect your investments"
                icon={<Shield className="h-6 w-6" />}
              />
              <FeatureCard
                title="Transparency"
                description="Clear reporting and open communication about all investment activities"
                icon={<CheckCircle className="h-6 w-6" />}
              />
              <FeatureCard
                title="Innovation"
                description="Cutting-edge technology to maximize returns and minimize risks"
                icon={<TrendingUp className="h-6 w-6" />}
              />
              <FeatureCard
                title="Excellence"
                description="Committed to delivering superior results and exceptional service"
                icon={<Award className="h-6 w-6" />}
              />
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Leadership Team</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Experienced professionals dedicated to your financial success
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah Johnson",
                  role: "Chief Executive Officer",
                  image: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                },
                {
                  name: "Michael Chen",
                  role: "Chief Investment Officer", 
                  image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                },
                {
                  name: "Emma Rodriguez",
                  role: "Head of Technology",
                  image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                }
              ].map((member, index) => (
                <HandDrawnContainer key={index} className="p-6 bg-white text-center">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </HandDrawnContainer>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose InvestPro?</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                {[
                  { icon: Shield, title: "Bank-Level Security", desc: "Advanced encryption and security protocols" },
                  { icon: TrendingUp, title: "Proven Track Record", desc: "Consistent returns for over 5 years" },
                  { icon: Users, title: "Expert Support", desc: "24/7 professional customer service" },
                  { icon: Globe, title: "Global Presence", desc: "Serving investors in 50+ countries" },
                  { icon: Clock, title: "Fast Payouts", desc: "Quick and reliable withdrawal processing" },
                  { icon: Star, title: "Award Winning", desc: "Recognized excellence in investment management" }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <item.icon className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <HandDrawnContainer className="p-8 bg-white">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Investment analytics dashboard"
                  className="rounded-lg w-full h-auto"
                />
              </HandDrawnContainer>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;