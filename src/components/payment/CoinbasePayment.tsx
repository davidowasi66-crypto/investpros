import React, { useState, useEffect } from 'react';
import { Copy, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import HandDrawnButton from '@/components/ui/HandDrawnButton';

interface CoinbasePaymentProps {
  amount: number;
  onSuccess: () => void;
  onCancel: () => void;
}

const CoinbasePayment = ({ amount, onSuccess, onCancel }: CoinbasePaymentProps) => {
  const { toast } = useToast();
  const [paymentData, setPaymentData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState('');

  useEffect(() => {
    createCoinbaseCharge();
  }, []);

  const createCoinbaseCharge = async () => {
    try {
      setIsLoading(true);
      
      // In a real implementation, you'd call your backend to create the charge
      // For now, we'll simulate the response
      const mockPaymentData = {
        id: 'charge_' + Math.random().toString(36).substr(2, 9),
        code: 'MOCK123',
        name: 'Investment Deposit',
        description: `Deposit $${amount} to investment account`,
        amount: {
          local: { amount: amount.toString(), currency: 'USD' },
          bitcoin: { amount: '0.00025', currency: 'BTC' },
          ethereum: { amount: '0.0015', currency: 'ETH' }
        },
        addresses: {
          bitcoin: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
          ethereum: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F'
        },
        pricing_type: 'fixed_price',
        expires_at: new Date(Date.now() + 3600000).toISOString() // 1 hour from now
      };
      
      setPaymentData(mockPaymentData);
      setIsLoading(false);
    } catch (error) {
      console.error('Error creating Coinbase charge:', error);
      toast({
        title: "Payment Error",
        description: "Failed to create crypto payment. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    toast({
      title: "Address copied",
      description: `${type} address copied to clipboard`,
    });
    
    setTimeout(() => setCopied(''), 3000);
  };

  const handlePaymentComplete = () => {
    toast({
      title: "Payment Submitted",
      description: "Your crypto payment has been submitted and is being processed.",
    });
    onSuccess();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2">Setting up crypto payment...</span>
      </div>
    );
  }

  if (!paymentData) {
    return (
      <div className="text-center p-8">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Payment Setup Failed</h3>
        <p className="text-gray-600 mb-4">Unable to create crypto payment. Please try again.</p>
        <HandDrawnButton variant="outline" onClick={onCancel}>
          Go Back
        </HandDrawnButton>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="inline-block p-4 bg-orange-50 rounded-full mb-4">
          <svg className="h-12 w-12 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.374 0 0 5.374 0 12s5.374 12 12 12 12-5.374 12-12S18.626 0 12 0zm0 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            <path d="M12 6v6l4 2-1 2-5-3V6h2z"/>
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-1">Crypto Payment</h2>
        <p className="text-gray-600">Send exactly <span className="font-semibold">${amount}</span> in cryptocurrency</p>
      </div>

      <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg flex items-start mb-6">
        <AlertCircle className="h-5 w-5 text-orange-500 mr-3 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-medium text-orange-800 mb-1">Payment Expires In</h3>
          <p className="text-orange-700 text-sm">
            This payment will expire in 1 hour. Send the exact amount to complete your deposit.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Bitcoin Payment */}
        <div className="bg-gray-50 p-4 rounded-lg border-2 border-dashed border-gray-300">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">₿</span>
              </div>
              <div>
                <h3 className="font-semibold">Bitcoin (BTC)</h3>
                <p className="text-sm text-gray-600">{paymentData.amount.bitcoin.amount} BTC</p>
              </div>
            </div>
            <button
              onClick={() => handleCopy(paymentData.addresses.bitcoin, 'Bitcoin')}
              className="text-blue-600 hover:text-blue-800 transition-colors flex items-center"
            >
              <Copy className="h-4 w-4 mr-1" />
              {copied === 'Bitcoin' ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div className="font-mono text-sm bg-white p-3 rounded-md border border-gray-200 break-all">
            {paymentData.addresses.bitcoin}
          </div>
        </div>

        {/* Ethereum Payment */}
        <div className="bg-gray-50 p-4 rounded-lg border-2 border-dashed border-gray-300">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">Ξ</span>
              </div>
              <div>
                <h3 className="font-semibold">Ethereum (ETH)</h3>
                <p className="text-sm text-gray-600">{paymentData.amount.ethereum.amount} ETH</p>
              </div>
            </div>
            <button
              onClick={() => handleCopy(paymentData.addresses.ethereum, 'Ethereum')}
              className="text-blue-600 hover:text-blue-800 transition-colors flex items-center"
            >
              <Copy className="h-4 w-4 mr-1" />
              {copied === 'Ethereum' ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div className="font-mono text-sm bg-white p-3 rounded-md border border-gray-200 break-all">
            {paymentData.addresses.ethereum}
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg flex items-start">
        <CheckCircle className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-medium text-blue-800 mb-1">Payment Instructions</h3>
          <ul className="text-blue-700 text-sm space-y-1">
            <li>• Send the exact amount shown above</li>
            <li>• Use only the cryptocurrency networks specified</li>
            <li>• Your deposit will be credited after 3 network confirmations</li>
            <li>• Do not send from exchange wallets</li>
          </ul>
        </div>
      </div>
      
      <div className="flex justify-between pt-4">
        <HandDrawnButton
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          Cancel
        </HandDrawnButton>
        <HandDrawnButton 
          variant="primary"
          onClick={handlePaymentComplete}
        >
          I've Sent Payment
        </HandDrawnButton>
      </div>
    </div>
  );
};

export default CoinbasePayment;