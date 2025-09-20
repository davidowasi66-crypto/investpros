
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Copy, CheckCircle, AlertCircle, CreditCard, Building2, Banknote } from 'lucide-react';
import HandDrawnButton from '@/components/ui/HandDrawnButton';
import HandDrawnContainer from '@/components/ui/HandDrawnContainer';
import Navbar from '@/components/layout/Navbar';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { createTransaction } from '@/services/transactionService';
import { getSettings } from '@/services/settingsService';

const Deposit = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('bank_transfer');
  const [isLoading, setIsLoading] = useState(false);
  const [showAddress, setShowAddress] = useState(false);
  const [copied, setCopied] = useState(false);

  // Fetch settings
  const { data: settings } = useQuery({
    queryKey: ['settings'],
    queryFn: getSettings,
    enabled: !!user
  });

  // Get minimum deposit from settings
  const minDeposit = 100; // Default minimum deposit

  // Mock bank details - in a real app this would be from settings
  const bankDetails = {
    accountName: "InvestPro Ltd",
    accountNumber: "123456789",
    routingNumber: "021000021",
    swiftCode: "INVPUS33"
  };

  const depositMutation = useMutation({
    mutationFn: (depositData: {
      user_id: string;
      type: 'Deposit';
      amount: number;
      payment_method: string;
      address: string;
    }) => createTransaction(depositData),
    onSuccess: () => {
      setShowAddress(true);
      toast({
        title: "Deposit initialized",
        description: `Please send ${amount} to the address below`,
      });
    },
    onError: (error: any) => {
      console.error('Error creating deposit:', error);
      toast({
        title: "Deposit failed",
        description: error.message || "Failed to initialize deposit. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  });

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({
      title: "Details copied",
      description: "The bank details have been copied to your clipboard",
    });
    
    setTimeout(() => setCopied(false), 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate amount
    const numAmount = Number(amount);
    if (!amount || isNaN(numAmount) || numAmount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid deposit amount",
        variant: "destructive",
      });
      return;
    }
    
    // Check minimum deposit
    if (numAmount < minDeposit) {
      toast({
        title: "Amount too low",
        description: `Minimum deposit amount is $${minDeposit}`,
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Create deposit transaction
    if (user) {
      depositMutation.mutate({
        user_id: user.id,
        type: 'Deposit',
        amount: numAmount,
        payment_method: paymentMethod,
        address: bankDetails.accountNumber
      });
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <div className="flex-1 bg-gray-50">
        <div className="container mx-auto py-8 px-4">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Deposit Funds</h1>
              <p className="text-gray-600">Add funds to your investment account</p>
            </div>
            <div>
              <Link to="/dashboard">
                <HandDrawnButton variant="outline">Back to Dashboard</HandDrawnButton>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <HandDrawnContainer className="p-6 bg-white h-full">
                {!showAddress ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block font-handwritten font-medium mb-2">Amount to Deposit</label>
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
                    </div>

                    <div>
                      <label className="block font-handwritten font-medium mb-2">Payment Method</label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <button
                          type="button"
                          className={`relative flex items-center justify-center p-4 border-2 border-black rounded-lg transition-all ${
                            paymentMethod === 'bank_transfer' ? 'bg-blue-50' : 'bg-white hover:bg-gray-50'
                          }`}
                          onClick={() => setPaymentMethod('bank_transfer')}
                        >
                          <div className="flex flex-col items-center">
                            <Building2 className="h-8 w-8 mb-2 text-blue-500" />
                            <span className="font-handwritten">Bank Transfer</span>
                          </div>
                          {paymentMethod === 'bank_transfer' && (
                            <div className="absolute top-2 right-2">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            </div>
                          )}
                        </button>
                        
                        <button
                          type="button"
                          className={`relative flex items-center justify-center p-4 border-2 border-black rounded-lg transition-all ${
                            paymentMethod === 'credit_card' ? 'bg-blue-50' : 'bg-white hover:bg-gray-50'
                          }`}
                          onClick={() => setPaymentMethod('credit_card')}
                        >
                          <div className="flex flex-col items-center">
                            <CreditCard className="h-8 w-8 mb-2 text-green-500" />
                            <span className="font-handwritten">Credit Card</span>
                          </div>
                          {paymentMethod === 'credit_card' && (
                            <div className="absolute top-2 right-2">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            </div>
                          )}
                        </button>
                        
                        <button
                          type="button"
                          className={`relative flex items-center justify-center p-4 border-2 border-black rounded-lg transition-all ${
                            paymentMethod === 'wire_transfer' ? 'bg-blue-50' : 'bg-white hover:bg-gray-50'
                          }`}
                          onClick={() => setPaymentMethod('wire_transfer')}
                        >
                          <div className="flex flex-col items-center">
                            <Banknote className="h-8 w-8 mb-2 text-amber-500" />
                            <span className="font-handwritten">Wire Transfer</span>
                          </div>
                          {paymentMethod === 'wire_transfer' && (
                            <div className="absolute top-2 right-2">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            </div>
                          )}
                        </button>
                      </div>
                    </div>

                    <HandDrawnButton
                      type="submit"
                      variant="primary"
                      className="w-full py-3"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Processing...' : 'Continue'}
                    </HandDrawnButton>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <div className="inline-block p-4 bg-blue-50 rounded-full mb-4">
                        {paymentMethod === 'bank_transfer' && <Building2 className="h-12 w-12 text-blue-500" />}
                        {paymentMethod === 'credit_card' && <CreditCard className="h-12 w-12 text-green-500" />}
                        {paymentMethod === 'wire_transfer' && <Banknote className="h-12 w-12 text-amber-500" />}
                      </div>
                      <h2 className="text-2xl font-bold mb-1">Bank Transfer Details</h2>
                      <p className="text-gray-600">Transfer exactly <span className="font-semibold">${amount}</span> using the details below</p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg border-2 border-dashed border-gray-300 space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600 font-handwritten">Account Name</span>
                          <button
                            onClick={() => handleCopy(bankDetails.accountName)}
                            className="text-blue-600 hover:text-blue-800 transition-colors flex items-center"
                          >
                            <Copy className="h-4 w-4 mr-1" /> Copy
                          </button>
                        </div>
                        <div className="font-mono text-sm bg-white p-3 rounded-md border border-gray-200">
                          {bankDetails.accountName}
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600 font-handwritten">Account Number</span>
                          <button
                            onClick={() => handleCopy(bankDetails.accountNumber)}
                            className="text-blue-600 hover:text-blue-800 transition-colors flex items-center"
                          >
                            <Copy className="h-4 w-4 mr-1" /> Copy
                          </button>
                        </div>
                        <div className="font-mono text-sm bg-white p-3 rounded-md border border-gray-200">
                          {bankDetails.accountNumber}
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600 font-handwritten">Routing Number</span>
                          <button
                            onClick={() => handleCopy(bankDetails.routingNumber)}
                            className="text-blue-600 hover:text-blue-800 transition-colors flex items-center"
                          >
                            <Copy className="h-4 w-4 mr-1" /> Copy
                          </button>
                        </div>
                        <div className="font-mono text-sm bg-white p-3 rounded-md border border-gray-200">
                          {bankDetails.routingNumber}
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600 font-handwritten">SWIFT Code</span>
                          <button
                            onClick={() => handleCopy(bankDetails.swiftCode)}
                            className="text-blue-600 hover:text-blue-800 transition-colors flex items-center"
                          >
                            <Copy className="h-4 w-4 mr-1" /> Copy
                          </button>
                        </div>
                        <div className="font-mono text-sm bg-white p-3 rounded-md border border-gray-200">
                          {bankDetails.swiftCode}
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg flex items-start">
                      <AlertCircle className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-amber-800 mb-1">Important</h3>
                        <p className="text-amber-700 text-sm">
                          Please include your user ID ({user?.id?.substring(0, 8)}) in the transfer reference. 
                          Your account will be credited within 1-3 business days after we receive the transfer.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <HandDrawnButton
                        type="button"
                        variant="outline"
                        onClick={() => setShowAddress(false)}
                      >
                        Back
                      </HandDrawnButton>
                      <Link to="/dashboard">
                        <HandDrawnButton variant="primary">
                          View Dashboard
                        </HandDrawnButton>
                      </Link>
                    </div>
                  </div>
                )}
              </HandDrawnContainer>
            </div>
            
            <div>
              <HandDrawnContainer className="p-6 bg-white">
                <h2 className="text-xl font-bold mb-4">Deposit Information</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-handwritten font-medium mb-1">Processing Time</h3>
                    <p className="text-gray-600 text-sm">Deposits are typically credited within 1-3 business days after verification.</p>
                  </div>
                  
                  <div>
                    <h3 className="font-handwritten font-medium mb-1">Minimum Deposit</h3>
                    <p className="text-gray-600 text-sm">${minDeposit} minimum deposit amount.</p>
                  </div>
                  
                  <div>
                    <h3 className="font-handwritten font-medium mb-1">Transaction Fees</h3>
                    <p className="text-gray-600 text-sm">We do not charge any fees for deposits. Bank fees may apply.</p>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-dashed border-gray-300">
                  <h3 className="font-handwritten font-medium mb-3">Need Help?</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    If you have any questions or issues with your deposit, our support team is here to help.
                  </p>
                  <HandDrawnButton variant="outline" className="w-full">
                    Contact Support
                  </HandDrawnButton>
                </div>
              </HandDrawnContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deposit;
