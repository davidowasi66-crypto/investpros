import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, AlertCircle, ChevronRight, ArrowUpRight, Info } from 'lucide-react';
import HandDrawnButton from '@/components/ui/HandDrawnButton';
import HandDrawnContainer from '@/components/ui/HandDrawnContainer';
import Navbar from '@/components/layout/Navbar';
import { useToast } from '@/hooks/use-toast';

interface InvestmentPlan {
  id: string;
  name: string;
  percentage: number;
  duration: number;
  durationUnit: string;
  minInvestment: number;
  features: string[];
  isPopular?: boolean;
}

const Invest = () => {
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState<InvestmentPlan | null>(null);
  const [amount, setAmount] = useState('');
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const availableBalance = 4850;

  const plans: InvestmentPlan[] = [
    {
      id: 'starter',
      name: 'Starter',
      percentage: 5,
      duration: 30,
      durationUnit: 'days',
      minInvestment: 100,
      features: [
        "Weekly payouts",
        "30-day contract",
        "No early withdrawal fee",
        "Basic analytics"
      ]
    },
    {
      id: 'growth',
      name: 'Growth',
      percentage: 12,
      duration: 60,
      durationUnit: 'days',
      minInvestment: 500,
      features: [
        "Weekly payouts",
        "60-day contract",
        "Priority support",
        "Advanced analytics",
        "Referral bonuses"
      ],
      isPopular: true
    },
    {
      id: 'premium',
      name: 'Premium',
      percentage: 20,
      duration: 90,
      durationUnit: 'days',
      minInvestment: 2000,
      features: [
        "Weekly payouts",
        "90-day contract",
        "VIP support",
        "Full dashboard access",
        "Compound interest option",
        "Exclusive investment options"
      ]
    },
    {
      id: 'hodler',
      name: 'Long-Term Hodler',
      percentage: 40,
      duration: 6,
      durationUnit: 'months',
      minInvestment: 1000,
      features: [
        "Monthly payouts",
        "6-month contract",
        "Compounding option",
        "Portfolio diversification",
        "Quarterly strategy review"
      ]
    },
    {
      id: 'staking',
      name: 'Staking Plus',
      percentage: 8,
      duration: 45,
      durationUnit: 'days',
      minInvestment: 300,
      features: [
        "Weekly payouts",
        "45-day contract",
        "Staking rewards",
        "Multiple coin options",
        "Low volatility"
      ]
    },
    {
      id: 'defi',
      name: 'DeFi Yield',
      percentage: 15,
      duration: 60,
      durationUnit: 'days',
      minInvestment: 700,
      features: [
        "Weekly payouts",
        "60-day contract",
        "Yield farming rewards",
        "DeFi protocol exposure",
        "Higher risk/reward ratio"
      ]
    }
  ];
  
  const selectPlan = (plan: InvestmentPlan) => {
    setSelectedPlan(plan);
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedPlan) {
      toast({
        title: "No plan selected",
        description: "Please select an investment plan to continue",
        variant: "destructive",
      });
      return;
    }
    
    const investAmount = Number(amount);
    
    if (!amount || isNaN(investAmount) || investAmount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid investment amount",
        variant: "destructive",
      });
      return;
    }
    
    if (investAmount < selectedPlan.minInvestment) {
      toast({
        title: "Below minimum investment",
        description: `The minimum investment for this plan is $${selectedPlan.minInvestment}`,
        variant: "destructive",
      });
      return;
    }
    
    if (investAmount > availableBalance) {
      toast({
        title: "Insufficient balance",
        description: "The investment amount exceeds your available balance",
        variant: "destructive",
      });
      return;
    }
    
    setStep(3);
  };
  
  const confirmInvestment = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      toast({
        title: "Investment successful",
        description: "Your investment has been successfully created",
      });
    }, 1500);
  };
  
  const resetForm = () => {
    setSelectedPlan(null);
    setAmount('');
    setStep(1);
    setIsSuccess(false);
  };
  
  const calculateReturn = (amount: number, percentage: number, duration: number, durationUnit: string) => {
    const weeks = durationUnit === 'days' 
      ? duration / 7 
      : durationUnit === 'months' 
        ? duration * 4.33 
        : 0;
    
    return amount * (percentage / 100) * weeks;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow bg-gray-50/50 py-6">
        <div className="container mx-auto px-4">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Invest</h1>
              <p className="text-gray-600">Choose an investment plan and grow your crypto assets</p>
            </div>
            <div>
              <Link to="/dashboard">
                <HandDrawnButton variant="outline">Back to Dashboard</HandDrawnButton>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <HandDrawnContainer className="bg-white p-6">
              {step === 1 && (
                <>
                  <div className="mb-6">
                    <h2 className="text-xl font-bold mb-4">Select an Investment Plan</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
                    {plans.map((plan) => (
                      <div key={plan.id} className="relative">
                        <HandDrawnContainer className={`p-6 bg-white h-full flex flex-col ${plan.isPopular ? 'border-blue-500' : ''}`}>
                          {plan.isPopular && (
                            <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 bg-blue-500 text-white font-handwritten px-3 py-1 rounded text-sm">
                              Popular
                            </div>
                          )}
                          <div>
                            <h2 className="text-xl font-bold mb-2">{plan.name}</h2>
                            <div className="flex items-baseline mb-4">
                              <span className="text-3xl font-bold">{plan.percentage}%</span>
                              <span className="text-gray-600 ml-1">weekly</span>
                            </div>
                            <div className="bg-blue-50 px-3 py-2 rounded-md mb-4">
                              <div className="flex justify-between text-sm">
                                <span>Duration:</span>
                                <span className="font-semibold">{plan.duration} {plan.durationUnit}</span>
                              </div>
                              <div className="flex justify-between text-sm mt-1">
                                <span>Min Investment:</span>
                                <span className="font-semibold">${plan.minInvestment}</span>
                              </div>
                            </div>
                          </div>
                          
                          <ul className="space-y-2 mb-5 flex-grow">
                            {plan.features.map((feature, index) => (
                              <li key={index} className="flex items-start">
                                <Check className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                                <span className="text-gray-700 text-sm">{feature}</span>
                              </li>
                            ))}
                          </ul>
                          
                          <HandDrawnButton
                            variant={plan.isPopular ? "primary" : "outline"}
                            className="w-full mt-auto"
                            onClick={() => selectPlan(plan)}
                          >
                            Select Plan <ChevronRight className="h-4 w-4 ml-1" />
                          </HandDrawnButton>
                        </HandDrawnContainer>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {step === 2 && selectedPlan && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="md:col-span-2">
                    <HandDrawnContainer className="p-6 bg-white">
                      <div className="flex items-center mb-4">
                        <button 
                          className="text-gray-600 hover:text-blue-600 mr-2"
                          onClick={() => setStep(1)}
                        >
                          <ChevronRight className="h-5 w-5 rotate-180" />
                        </button>
                        <h2 className="text-2xl font-bold">{selectedPlan.name} Plan</h2>
                      </div>
                      
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div>
                            <label className="block font-handwritten font-medium mb-2">Available Balance</label>
                            <div className="hand-drawn-input flex items-center bg-gray-50 cursor-not-allowed">
                              <span className="text-gray-700 font-semibold">${availableBalance.toFixed(2)}</span>
                            </div>
                          </div>
                          
                          <div>
                            <label className="block font-handwritten font-medium mb-2">Minimum Investment</label>
                            <div className="hand-drawn-input flex items-center bg-gray-50 cursor-not-allowed">
                              <span className="text-gray-700 font-semibold">${selectedPlan.minInvestment}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block font-handwritten font-medium mb-2">Investment Amount</label>
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">$</span>
                            <input
                              type="text"
                              value={amount}
                              onChange={handleAmountChange}
                              className="hand-drawn-input w-full pl-10"
                              placeholder="Enter amount"
                              required
                            />
                          </div>
                          <div className="flex justify-between mt-2">
                            <button 
                              type="button" 
                              className="text-sm text-blue-600 hover:underline"
                              onClick={() => setAmount(selectedPlan.minInvestment.toString())}
                            >
                              Minimum
                            </button>
                            <button 
                              type="button" 
                              className="text-sm text-blue-600 hover:underline"
                              onClick={() => setAmount((selectedPlan.minInvestment * 2).toString())}
                            >
                              ${selectedPlan.minInvestment * 2}
                            </button>
                            <button 
                              type="button" 
                              className="text-sm text-blue-600 hover:underline"
                              onClick={() => setAmount(availableBalance.toString())}
                            >
                              Max
                            </button>
                          </div>
                        </div>
                        
                        {Number(amount) > 0 && (
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <h3 className="font-handwritten font-medium mb-3">Investment Summary</h3>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span>Plan:</span>
                                <span className="font-semibold">{selectedPlan.name}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Duration:</span>
                                <span className="font-semibold">{selectedPlan.duration} {selectedPlan.durationUnit}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Weekly Return:</span>
                                <span className="font-semibold">{selectedPlan.percentage}%</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Investment Amount:</span>
                                <span className="font-semibold">${Number(amount).toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between pt-2 border-t border-blue-200">
                                <span>Estimated Total Return:</span>
                                <span className="font-semibold">${calculateReturn(Number(amount), selectedPlan.percentage, selectedPlan.duration, selectedPlan.durationUnit).toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>ROI:</span>
                                <span className="font-semibold text-green-600">
                                  +{((calculateReturn(Number(amount), selectedPlan.percentage, selectedPlan.duration, selectedPlan.durationUnit) / Number(amount)) * 100).toFixed(2)}%
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        <HandDrawnButton
                          type="submit"
                          variant="primary"
                          className="w-full py-3"
                        >
                          Continue
                        </HandDrawnButton>
                      </form>
                    </HandDrawnContainer>
                  </div>
                  
                  <div>
                    <HandDrawnContainer className="p-6 bg-white mb-6">
                      <h2 className="text-xl font-bold mb-4">{selectedPlan.name} Plan Details</h2>
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-handwritten font-medium mb-1">Weekly Returns</h3>
                          <p className="text-gray-600 text-sm">Earn {selectedPlan.percentage}% of your investment every week.</p>
                        </div>
                        
                        <div>
                          <h3 className="font-handwritten font-medium mb-1">Contract Duration</h3>
                          <p className="text-gray-600 text-sm">{selectedPlan.duration} {selectedPlan.durationUnit} investment period.</p>
                        </div>
                        
                        <div>
                          <h3 className="font-handwritten font-medium mb-1">Payout Schedule</h3>
                          <p className="text-gray-600 text-sm">Weekly payouts directly to your account balance.</p>
                        </div>
                        
                        <div>
                          <h3 className="font-handwritten font-medium mb-1">Strategy</h3>
                          <p className="text-gray-600 text-sm">This plan utilizes a mix of trading, staking and yield farming to generate returns.</p>
                        </div>
                      </div>
                    </HandDrawnContainer>
                    
                    <HandDrawnContainer className="p-6 bg-white">
                      <div className="flex items-start">
                        <Info className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="font-medium mb-2">Risk Information</h3>
                          <p className="text-gray-600 text-sm mb-4">
                            All investments involve risk. Past performance is not indicative of future results.
                            Make sure you understand the risks before investing.
                          </p>
                          <Link to="/plans" className="text-blue-600 hover:underline text-sm flex items-center">
                            Learn more about our investment strategies
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Link>
                        </div>
                      </div>
                    </HandDrawnContainer>
                  </div>
                </div>
              )}
              
              {step === 3 && selectedPlan && (
                <div className="max-w-3xl mx-auto">
                  {!isSuccess ? (
                    <HandDrawnContainer className="p-6 bg-white">
                      <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold mb-2">Confirm Your Investment</h2>
                        <p className="text-gray-600">Please review the details before confirming</p>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg border-2 border-dashed border-gray-300 mb-6">
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Investment Plan:</span>
                            <span className="font-semibold">{selectedPlan.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Amount:</span>
                            <span className="font-semibold">${Number(amount).toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Duration:</span>
                            <span className="font-semibold">{selectedPlan.duration} {selectedPlan.durationUnit}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Weekly Return:</span>
                            <span className="font-semibold">{selectedPlan.percentage}% (${(Number(amount) * selectedPlan.percentage / 100).toFixed(2)})</span>
                          </div>
                          <div className="flex justify-between pt-3 border-t border-gray-200">
                            <span className="text-gray-600">Estimated Total Return:</span>
                            <span className="font-semibold">${calculateReturn(Number(amount), selectedPlan.percentage, selectedPlan.duration, selectedPlan.durationUnit).toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">First Payout:</span>
                            <span className="font-semibold">{new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg flex items-start mb-6">
                        <AlertCircle className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="font-medium text-amber-800 mb-1">Please Note</h3>
                          <p className="text-amber-700 text-sm">
                            By confirming this investment, you agree to lock the specified amount for the duration of the investment period.
                            Early withdrawal may be subject to fees. Returns are not guaranteed and may vary.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex justify-between">
                        <HandDrawnButton
                          type="button"
                          variant="outline"
                          onClick={() => setStep(2)}
                        >
                          Back
                        </HandDrawnButton>
                        <HandDrawnButton
                          type="button"
                          variant="primary"
                          onClick={confirmInvestment}
                          disabled={isLoading}
                        >
                          {isLoading ? 'Processing...' : 'Confirm Investment'}
                        </HandDrawnButton>
                      </div>
                    </HandDrawnContainer>
                  ) : (
                    <HandDrawnContainer className="p-6 bg-white text-center">
                      <div className="inline-block p-4 bg-green-100 rounded-full mx-auto mb-4">
                        <Check className="h-12 w-12 text-green-600" />
                      </div>
                      <h2 className="text-2xl font-bold mb-2">Investment Successful!</h2>
                      <p className="text-gray-600 max-w-lg mx-auto mb-6">
                        Your investment of ${Number(amount).toFixed(2)} in the {selectedPlan.name} Plan has been successfully created.
                        You will receive weekly payouts directly to your account balance.
                      </p>
                      
                      <div className="bg-blue-50 p-4 rounded-lg max-w-lg mx-auto mb-8">
                        <h3 className="font-handwritten font-medium mb-2">Investment Details</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Plan:</span>
                            <span className="font-semibold">{selectedPlan.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Amount:</span>
                            <span className="font-semibold">${Number(amount).toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Weekly Return:</span>
                            <span className="font-semibold">${(Number(amount) * selectedPlan.percentage / 100).toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>First Payout Date:</span>
                            <span className="font-semibold">{new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <HandDrawnButton
                          type="button"
                          variant="outline"
                          onClick={resetForm}
                        >
                          Make Another Investment
                        </HandDrawnButton>
                        <Link to="/dashboard">
                          <HandDrawnButton
                            variant="primary"
                          >
                            Back to Dashboard
                          </HandDrawnButton>
                        </Link>
                      </div>
                    </HandDrawnContainer>
                  )}
                </div>
              )}
            </HandDrawnContainer>

            {step === 1 && (
              <HandDrawnContainer className="p-6 bg-white">
                <h2 className="text-xl font-bold mb-4">Compare Returns</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full border-collapse">
                    <thead>
                      <tr className="bg-blue-50">
                        <th className="border-2 border-black p-3 text-left">Plan</th>
                        <th className="border-2 border-black p-3 text-center">Weekly Return</th>
                        <th className="border-2 border-black p-3 text-center">Duration</th>
                        <th className="border-2 border-black p-3 text-center">Min Investment</th>
                        <th className="border-2 border-black p-3 text-center">Total Return</th>
                      </tr>
                    </thead>
                    <tbody>
                      {plans.slice(0, 3).map((plan) => {
                        const totalReturn = calculateReturn(plan.minInvestment, plan.percentage, plan.duration, plan.durationUnit);
                        
                        return (
                          <tr key={plan.id}>
                            <td className="border-2 border-black p-3">{plan.name}</td>
                            <td className="border-2 border-black p-3 text-center">{plan.percentage}%</td>
                            <td className="border-2 border-black p-3 text-center">{plan.duration} {plan.durationUnit}</td>
                            <td className="border-2 border-black p-3 text-center">${plan.minInvestment}</td>
                            <td className="border-2 border-black p-3 text-center font-semibold">${totalReturn.toFixed(2)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-6 flex justify-center">
                  <Link to="/plans">
                    <HandDrawnButton variant="outline">
                      View Full Investment Guide <ArrowUpRight className="h-4 w-4 ml-1" />
                    </HandDrawnButton>
                  </Link>
                </div>
              </HandDrawnContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invest;
