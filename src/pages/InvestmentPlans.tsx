
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, HelpCircle } from 'lucide-react';
import HandDrawnButton from '@/components/ui/HandDrawnButton';
import HandDrawnContainer from '@/components/ui/HandDrawnContainer';
import InvestmentPlanCard from '@/components/ui/InvestmentPlanCard';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const InvestmentPlans = () => {
  const faqItems = [
    {
      question: "How do the investment plans work?",
      answer: "Our investment plans utilize diversified portfolios including stocks, bonds, commodities, and real estate investments to generate returns. Once you select a plan and deposit your funds, our expert team allocates your investment according to the plan's strategy."
    },
    {
      question: "When do I receive my returns?",
      answer: "Returns are distributed according to each plan's schedule, typically weekly for most plans. You can view your upcoming payouts in your dashboard."
    },
    {
      question: "Can I withdraw early from a plan?",
      answer: "Yes, most plans allow early withdrawal, though some may include a small fee. The terms are specific to each investment plan and are clearly indicated before you invest."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept bank transfers, credit/debit cards, and popular digital payment methods. All transactions are processed securely through encrypted channels."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Header Section */}
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4 text-center">
            <span className="font-handwritten text-lg text-blue-600 bg-blue-100 px-4 py-1 rounded-full inline-block mb-4">Investment Opportunities</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Choose Your Perfect Investment Plan</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              We offer diversified investment plans across stocks, bonds, real estate, and commodities designed to match different risk tolerances, timeframes, and financial goals.
            </p>
          </div>
        </section>

        {/* Main Plans Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Featured Plans</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <InvestmentPlanCard
                title="Conservative"
                percentage={5}
                duration="weekly"
                features={[
                  "Minimum investment: $100",
                  "Weekly payouts",
                  "30-day contract",
                  "No early withdrawal fee",
                  "Basic portfolio tracking"
                ]}
              />
              <InvestmentPlanCard
                title="Balanced"
                percentage={12}
                duration="weekly"
                features={[
                  "Minimum investment: $500",
                  "Weekly payouts",
                  "60-day contract",
                  "Priority support",
                  "Advanced portfolio analytics",
                  "Referral bonuses"
                ]}
                popular={true}
              />
              <InvestmentPlanCard
                title="Aggressive"
                percentage={20}
                duration="weekly"
                features={[
                  "Minimum investment: $2000",
                  "Weekly payouts",
                  "90-day contract",
                  "VIP support",
                  "Full portfolio dashboard",
                  "Compound interest option",
                  "Exclusive high-yield opportunities"
                ]}
              />
            </div>

            <h2 className="text-3xl font-bold mb-8 text-center">Specialized Plans</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <InvestmentPlanCard
                title="Long-Term Growth"
                percentage={40}
                duration="monthly"
                features={[
                  "Minimum investment: $1000",
                  "Monthly payouts",
                  "6-month contract",
                  "Compounding option",
                  "Multi-asset diversification",
                  "Quarterly strategy review"
                ]}
              />
              <InvestmentPlanCard
                title="Income Focus"
                percentage={8}
                duration="weekly"
                features={[
                  "Minimum investment: $300",
                  "Weekly payouts",
                  "45-day contract",
                  "Dividend-focused stocks",
                  "Multiple asset classes",
                  "Low volatility strategy"
                ]}
              />
              <InvestmentPlanCard
                title="Market Opportunities"
                percentage={15}
                duration="weekly"
                features={[
                  "Minimum investment: $700",
                  "Weekly payouts",
                  "60-day contract",
                  "Growth stock focus",
                  "Emerging market exposure",
                  "Higher risk/reward ratio"
                ]}
              />
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Plan Comparison</h2>
            
            <HandDrawnContainer className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-blue-50">
                    <th className="border-2 border-black p-4 text-left">Feature</th>
                    <th className="border-2 border-black p-4 text-center">Conservative</th>
                    <th className="border-2 border-black p-4 text-center">Balanced</th>
                    <th className="border-2 border-black p-4 text-center">Aggressive</th>
                  </tr>
                </thead>
                <tbody className="font-medium">
                  <tr>
                    <td className="border-2 border-black p-4">Minimum Investment</td>
                    <td className="border-2 border-black p-4 text-center">$100</td>
                    <td className="border-2 border-black p-4 text-center">$500</td>
                    <td className="border-2 border-black p-4 text-center">$2000</td>
                  </tr>
                  <tr>
                    <td className="border-2 border-black p-4">Weekly Returns</td>
                    <td className="border-2 border-black p-4 text-center">5%</td>
                    <td className="border-2 border-black p-4 text-center">12%</td>
                    <td className="border-2 border-black p-4 text-center">20%</td>
                  </tr>
                  <tr>
                    <td className="border-2 border-black p-4">Contract Duration</td>
                    <td className="border-2 border-black p-4 text-center">30 days</td>
                    <td className="border-2 border-black p-4 text-center">60 days</td>
                    <td className="border-2 border-black p-4 text-center">90 days</td>
                  </tr>
                  <tr>
                    <td className="border-2 border-black p-4">Early Withdrawal Fee</td>
                    <td className="border-2 border-black p-4 text-center">None</td>
                    <td className="border-2 border-black p-4 text-center">5%</td>
                    <td className="border-2 border-black p-4 text-center">10%</td>
                  </tr>
                  <tr>
                    <td className="border-2 border-black p-4">Support Level</td>
                    <td className="border-2 border-black p-4 text-center">Standard</td>
                    <td className="border-2 border-black p-4 text-center">Priority</td>
                    <td className="border-2 border-black p-4 text-center">VIP</td>
                  </tr>
                  <tr>
                    <td className="border-2 border-black p-4">Referral Bonus</td>
                    <td className="border-2 border-black p-4 text-center">1%</td>
                    <td className="border-2 border-black p-4 text-center">3%</td>
                    <td className="border-2 border-black p-4 text-center">5%</td>
                  </tr>
                </tbody>
              </table>
            </HandDrawnContainer>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Got questions about our investment plans? We've got you covered.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <HandDrawnContainer className="divide-y-2 divide-dashed divide-gray-200">
                {faqItems.map((item, index) => (
                  <div key={index} className="py-6">
                    <div className="flex items-start">
                      <HelpCircle className="w-6 h-6 text-blue-500 mr-3 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-xl font-handwritten font-bold mb-2">{item.question}</h3>
                        <p className="text-gray-600">{item.answer}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </HandDrawnContainer>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Investing?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Create an account today and start growing your wealth with our proven investment strategies across multiple asset classes.
            </p>
            <Link to="/register">
              <HandDrawnButton variant="primary" className="px-8 py-4 text-lg">
                Create Your Account <ArrowRight className="ml-2 inline-block h-5 w-5" />
              </HandDrawnButton>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default InvestmentPlans;
