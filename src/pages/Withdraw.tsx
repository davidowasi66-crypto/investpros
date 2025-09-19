
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, AlertCircle, Check, CircleDollarSign, Wallet } from 'lucide-react';
import HandDrawnButton from '@/components/ui/HandDrawnButton';
import HandDrawnContainer from '@/components/ui/HandDrawnContainer';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useToast } from '@/hooks/use-toast';

const Withdraw = () => {
  const { toast } = useToast();
  const [amount, setAmount] = useState('');
  const [address, setAddress] = useState('');
  const [currency, setCurrency] = useState('bitcoin');
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Mock data
  const availableBalance = 4850;
  const pendingWithdrawals = 0;
  const dailyLimit = 5000;
  const withdrawalFee = 2.5; // percentage
  
  const calculateFee = (amount: number) => {
    return (amount * withdrawalFee) / 100;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const withdrawAmount = Number(amount);
    
    // Validation
    if (!amount || isNaN(withdrawAmount) || withdrawAmount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid withdrawal amount",
        variant: "destructive",
      });
      return;
    }
    
    if (withdrawAmount > availableBalance) {
      toast({
        title: "Insufficient balance",
        description: "The requested amount exceeds your available balance",
        variant: "destructive",
      });
      return;
    }
    
    if (!address) {
      toast({
        title: "Missing address",
        description: "Please enter your withdrawal address",
        variant: "destructive",
      });
      return;
    }
    
    setIsConfirming(true);
  };
  
  const confirmWithdrawal = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsConfirming(false);
      setIsSuccess(true);
      toast({
        title: "Withdrawal successful",
        description: "Your withdrawal request has been submitted",
      });
    }, 1500);
  };
  
  const resetForm = () => {
    setAmount('');
    setAddress('');
    setCurrency('bitcoin');
    setIsSuccess(false);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <div className="flex-1 bg-gray-50">
        <div className="container mx-auto py-8 px-4">
          <div className="mb-6">
            <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center mb-2">
              <ArrowRight className="h-4 w-4 mr-1 rotate-180" /> Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold mb-2">Withdraw Funds</h1>
            <p className="text-gray-600">Withdraw your earnings to your wallet</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <HandDrawnContainer className="p-6 bg-white h-full">
                {!isConfirming && !isSuccess ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <label className="block font-handwritten font-medium mb-2">Available Balance</label>
                        <div className="hand-drawn-input flex items-center bg-gray-50 cursor-not-allowed">
                          <span className="text-gray-700 font-semibold">${availableBalance.toFixed(2)}</span>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block font-handwritten font-medium mb-2">Daily Limit</label>
                        <div className="hand-drawn-input flex items-center bg-gray-50 cursor-not-allowed">
                          <span className="text-gray-700 font-semibold">${dailyLimit.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  
                    <div>
                      <label className="block font-handwritten font-medium mb-2">Amount to Withdraw</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">$</span>
                        <input
                          type="text"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="hand-drawn-input w-full pl-10"
                          placeholder="Enter amount"
                          required
                        />
                      </div>
                      <div className="flex justify-between mt-2">
                        <button 
                          type="button" 
                          className="text-sm text-blue-600 hover:underline"
                          onClick={() => setAmount('1000')}
                        >
                          $1,000
                        </button>
                        <button 
                          type="button" 
                          className="text-sm text-blue-600 hover:underline"
                          onClick={() => setAmount('2500')}
                        >
                          $2,500
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
                    
                    <div>
                      <label className="block font-handwritten font-medium mb-2">Withdrawal Method</label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <button
                          type="button"
                          className={`relative flex items-center justify-center p-4 border-2 border-black rounded-lg transition-all ${
                            currency === 'bitcoin' ? 'bg-blue-50' : 'bg-white hover:bg-gray-50'
                          }`}
                          onClick={() => setCurrency('bitcoin')}
                        >
                          <div className="flex flex-col items-center">
                            <CircleDollarSign className="h-8 w-8 mb-2 text-amber-500" />
                            <span className="font-handwritten">Bitcoin</span>
                          </div>
                          {currency === 'bitcoin' && (
                            <div className="absolute top-2 right-2">
                              <Check className="h-4 w-4 text-green-600" />
                            </div>
                          )}
                        </button>
                        
                        <button
                          type="button"
                          className={`relative flex items-center justify-center p-4 border-2 border-black rounded-lg transition-all ${
                            currency === 'ethereum' ? 'bg-blue-50' : 'bg-white hover:bg-gray-50'
                          }`}
                          onClick={() => setCurrency('ethereum')}
                        >
                          <div className="flex flex-col items-center">
                            <CircleDollarSign className="h-8 w-8 mb-2 text-blue-400" />
                            <span className="font-handwritten">Ethereum</span>
                          </div>
                          {currency === 'ethereum' && (
                            <div className="absolute top-2 right-2">
                              <Check className="h-4 w-4 text-green-600" />
                            </div>
                          )}
                        </button>
                        
                        <button
                          type="button"
                          className={`relative flex items-center justify-center p-4 border-2 border-black rounded-lg transition-all ${
                            currency === 'usdt' ? 'bg-blue-50' : 'bg-white hover:bg-gray-50'
                          }`}
                          onClick={() => setCurrency('usdt')}
                        >
                          <div className="flex flex-col items-center">
                            <CircleDollarSign className="h-8 w-8 mb-2 text-green-500" />
                            <span className="font-handwritten">USDT</span>
                          </div>
                          {currency === 'usdt' && (
                            <div className="absolute top-2 right-2">
                              <Check className="h-4 w-4 text-green-600" />
                            </div>
                          )}
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block font-handwritten font-medium mb-2">Your {currency.charAt(0).toUpperCase() + currency.slice(1)} Address</label>
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="hand-drawn-input w-full"
                        placeholder={`Enter your ${currency} address`}
                        required
                      />
                    </div>
                    
                    {Number(amount) > 0 && (
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h3 className="font-handwritten font-medium mb-2">Withdrawal Summary</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Amount:</span>
                            <span className="font-semibold">${Number(amount).toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Fee ({withdrawalFee}%):</span>
                            <span className="font-semibold">${calculateFee(Number(amount)).toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between pt-2 border-t border-blue-200">
                            <span>You will receive:</span>
                            <span className="font-semibold">${(Number(amount) - calculateFee(Number(amount))).toFixed(2)}</span>
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
                ) : isConfirming ? (
                  <div className="space-y-6">
                    <div className="text-center mb-4">
                      <Wallet className="h-12 w-12 mx-auto text-blue-500 mb-4" />
                      <h2 className="text-2xl font-bold mb-2">Confirm Withdrawal</h2>
                      <p className="text-gray-600">Please review the details below before confirming</p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg border-2 border-dashed border-gray-300">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Amount:</span>
                          <span className="font-semibold">${Number(amount).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Fee ({withdrawalFee}%):</span>
                          <span className="font-semibold">${calculateFee(Number(amount)).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">You will receive:</span>
                          <span className="font-semibold">${(Number(amount) - calculateFee(Number(amount))).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between pt-3 border-t border-gray-200">
                          <span className="text-gray-600">Payment method:</span>
                          <span className="font-semibold">{currency.charAt(0).toUpperCase() + currency.slice(1)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Address:</span>
                          <span className="font-semibold truncate max-w-[200px]">{address}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg flex items-start">
                      <AlertCircle className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-amber-800 mb-1">Important</h3>
                        <p className="text-amber-700 text-sm">
                          Please ensure the address is correct. Withdrawals cannot be reversed once processed.
                          Processing time may vary depending on network conditions.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <HandDrawnButton
                        type="button"
                        variant="outline"
                        onClick={() => setIsConfirming(false)}
                      >
                        Back
                      </HandDrawnButton>
                      <HandDrawnButton
                        type="button"
                        variant="primary"
                        onClick={confirmWithdrawal}
                        disabled={isLoading}
                      >
                        {isLoading ? 'Processing...' : 'Confirm Withdrawal'}
                      </HandDrawnButton>
                    </div>
                  </div>
                ) : (
                  <div className="text-center space-y-6">
                    <div className="inline-block p-4 bg-green-100 rounded-full mx-auto mb-2">
                      <Check className="h-12 w-12 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold">Withdrawal Successful!</h2>
                    <p className="text-gray-600 max-w-lg mx-auto">
                      Your withdrawal request of ${Number(amount).toFixed(2)} has been submitted successfully.
                      You will receive an email confirmation once the transaction is processed.
                    </p>
                    
                    <div className="pt-6 flex flex-col sm:flex-row justify-center gap-4">
                      <HandDrawnButton
                        type="button"
                        variant="outline"
                        onClick={resetForm}
                      >
                        New Withdrawal
                      </HandDrawnButton>
                      <Link to="/dashboard">
                        <HandDrawnButton
                          variant="primary"
                        >
                          Back to Dashboard
                        </HandDrawnButton>
                      </Link>
                    </div>
                  </div>
                )}
              </HandDrawnContainer>
            </div>
            
            <div>
              <HandDrawnContainer className="p-6 bg-white mb-6">
                <h2 className="text-xl font-bold mb-4">Withdrawal Information</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-handwritten font-medium mb-1">Processing Time</h3>
                    <p className="text-gray-600 text-sm">Withdrawals are typically processed within 24 hours.</p>
                  </div>
                  
                  <div>
                    <h3 className="font-handwritten font-medium mb-1">Minimum Withdrawal</h3>
                    <p className="text-gray-600 text-sm">$50 equivalent in cryptocurrency.</p>
                  </div>
                  
                  <div>
                    <h3 className="font-handwritten font-medium mb-1">Withdrawal Fee</h3>
                    <p className="text-gray-600 text-sm">{withdrawalFee}% of the withdrawal amount.</p>
                  </div>
                  
                  <div>
                    <h3 className="font-handwritten font-medium mb-1">Daily Limit</h3>
                    <p className="text-gray-600 text-sm">${dailyLimit.toFixed(2)} per day.</p>
                  </div>
                </div>
              </HandDrawnContainer>
              
              <HandDrawnContainer className="p-6 bg-white">
                <h3 className="font-handwritten font-medium mb-3">Need Help?</h3>
                <p className="text-gray-600 text-sm mb-4">
                  If you have any questions or issues with your withdrawal, our support team is here to help.
                </p>
                <HandDrawnButton variant="outline" className="w-full">
                  Contact Support
                </HandDrawnButton>
              </HandDrawnContainer>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Withdraw;
