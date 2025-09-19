import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Copy, CheckCircle, Users, ArrowUpRight, UserPlus, Share2 } from 'lucide-react';
import HandDrawnButton from '@/components/ui/HandDrawnButton';
import HandDrawnContainer from '@/components/ui/HandDrawnContainer';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useToast } from '@/hooks/use-toast';

const Referral = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  
  // Mock data
  const referralCode = 'USER123';
  const referralLink = `https://cryptoyields.com/ref/${referralCode}`;
  const referralStats = {
    totalReferrals: 3,
    activeReferrals: 2,
    pendingReferrals: 1,
    totalCommission: 125.50,
    pendingCommission: 18.75,
    referralRate: '5%'
  };
  
  const referrals = [
    { id: 1, user: 'john****@gmail.com', date: '2023-10-15', status: 'Active', invested: '$1,500', commission: '$75.00' },
    { id: 2, user: 'alice****@yahoo.com', date: '2023-09-28', status: 'Active', invested: '$1,000', commission: '$50.00' },
    { id: 3, user: 'robert****@gmail.com', date: '2023-10-20', status: 'Pending', invested: '$375', commission: '$18.75' },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast({
      title: "Link copied",
      description: "Referral link has been copied to your clipboard",
    });
    
    setTimeout(() => setCopied(false), 3000);
  };
  
  const shareViaEmail = () => {
    const subject = 'Join CryptoYields - High Yield Investment Platform';
    const body = `Hi,\n\nI thought you might be interested in this crypto investment platform I'm using. Use my referral link to sign up and get started:\n\n${referralLink}\n\nBest regards`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
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
            <h1 className="text-3xl font-bold mb-2">Referral Program</h1>
            <p className="text-gray-600">Invite friends and earn commission on their investments</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <HandDrawnContainer className="p-6 bg-white mb-6 overflow-hidden relative">
                <div className="absolute -top-16 -right-16 w-32 h-32 bg-blue-100 rounded-full opacity-50"></div>
                <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-yellow-100 rounded-full opacity-50"></div>
                
                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">Your Referral Link</h2>
                      <p className="text-gray-600 mb-4 md:mb-0">
                        Share this link with your friends and earn {referralStats.referralRate} commission on their investments
                      </p>
                    </div>
                    <UserPlus className="h-12 w-12 text-blue-500 hidden md:block" />
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="hand-drawn-input flex-grow flex items-center bg-gray-50 overflow-hidden">
                        <span className="text-gray-700 text-sm sm:text-base truncate">{referralLink}</span>
                      </div>
                      <HandDrawnButton
                        variant="primary"
                        className="whitespace-nowrap"
                        onClick={handleCopy}
                      >
                        {copied ? (
                          <>
                            <CheckCircle className="h-4 w-4 mr-2" /> Copied
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4 mr-2" /> Copy Link
                          </>
                        )}
                      </HandDrawnButton>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-handwritten font-medium mb-3">Share Via</h3>
                    <div className="flex flex-wrap gap-3">
                      <HandDrawnButton variant="outline" onClick={shareViaEmail}>
                        <Share2 className="h-4 w-4 mr-2" /> Email
                      </HandDrawnButton>
                      <HandDrawnButton variant="outline">
                        <Share2 className="h-4 w-4 mr-2" /> WhatsApp
                      </HandDrawnButton>
                      <HandDrawnButton variant="outline">
                        <Share2 className="h-4 w-4 mr-2" /> Telegram
                      </HandDrawnButton>
                      <HandDrawnButton variant="outline">
                        <Share2 className="h-4 w-4 mr-2" /> Twitter
                      </HandDrawnButton>
                    </div>
                  </div>
                </div>
              </HandDrawnContainer>
              
              <HandDrawnContainer className="p-6 bg-white mb-6">
                <h2 className="text-2xl font-bold mb-4">Referral Stats</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-handwritten text-sm mb-1">Total Referrals</h3>
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-blue-600 mr-2" />
                      <span className="text-2xl font-bold">{referralStats.totalReferrals}</span>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-handwritten text-sm mb-1">Earned Commission</h3>
                    <div className="flex items-center">
                      <ArrowUpRight className="h-5 w-5 text-green-600 mr-2" />
                      <span className="text-2xl font-bold">${referralStats.totalCommission.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <h3 className="font-handwritten text-sm mb-1">Pending Commission</h3>
                    <div className="flex items-center">
                      <ArrowUpRight className="h-5 w-5 text-amber-600 mr-2" />
                      <span className="text-2xl font-bold">${referralStats.pendingCommission.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </HandDrawnContainer>
              
              <HandDrawnContainer className="p-6 bg-white">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">Your Referrals</h2>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full border-collapse">
                    <thead>
                      <tr className="bg-blue-50">
                        <th className="border-2 border-black p-3 text-left">User</th>
                        <th className="border-2 border-black p-3 text-left">Date</th>
                        <th className="border-2 border-black p-3 text-left">Status</th>
                        <th className="border-2 border-black p-3 text-left">Invested</th>
                        <th className="border-2 border-black p-3 text-left">Commission</th>
                      </tr>
                    </thead>
                    <tbody>
                      {referrals.map((referral) => (
                        <tr key={referral.id}>
                          <td className="border-2 border-black p-3">{referral.user}</td>
                          <td className="border-2 border-black p-3">{referral.date}</td>
                          <td className="border-2 border-black p-3">
                            <span 
                              className={`inline-block px-2 py-1 rounded text-xs ${
                                referral.status === 'Active' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}
                            >
                              {referral.status}
                            </span>
                          </td>
                          <td className="border-2 border-black p-3">{referral.invested}</td>
                          <td className="border-2 border-black p-3">{referral.commission}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {referrals.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-600">You don't have any referrals yet.</p>
                  </div>
                )}
              </HandDrawnContainer>
            </div>
            
            <div>
              <HandDrawnContainer className="p-6 bg-white mb-6">
                <h2 className="text-xl font-bold mb-4">How It Works</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold mr-3">
                      1
                    </div>
                    <div>
                      <h3 className="font-handwritten font-medium mb-1">Share Your Link</h3>
                      <p className="text-gray-600 text-sm">
                        Share your unique referral link with friends, on social media, or your website.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold mr-3">
                      2
                    </div>
                    <div>
                      <h3 className="font-handwritten font-medium mb-1">Friends Invest</h3>
                      <p className="text-gray-600 text-sm">
                        When friends sign up and invest using your link, they become your referrals.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold mr-3">
                      3
                    </div>
                    <div>
                      <h3 className="font-handwritten font-medium mb-1">Earn Commission</h3>
                      <p className="text-gray-600 text-sm">
                        Earn {referralStats.referralRate} commission on all investments made by your referrals.
                      </p>
                    </div>
                  </div>
                </div>
              </HandDrawnContainer>
              
              <HandDrawnContainer className="p-6 bg-white mb-6">
                <h2 className="text-xl font-bold mb-4">Commission Rates</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Starter Plan</span>
                    <span className="font-semibold">1%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Growth Plan</span>
                    <span className="font-semibold">3%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Premium Plan</span>
                    <span className="font-semibold">5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Other Plans</span>
                    <span className="font-semibold">2-4%</span>
                  </div>
                </div>
              </HandDrawnContainer>
              
              <HandDrawnContainer className="p-6 bg-white">
                <h2 className="text-xl font-bold mb-4">Referral FAQs</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-handwritten font-medium mb-1">When do I receive my commission?</h3>
                    <p className="text-gray-600 text-sm">
                      Commission is paid out weekly, directly to your account balance.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-handwritten font-medium mb-1">Is there a limit to referrals?</h3>
                    <p className="text-gray-600 text-sm">
                      No, you can refer an unlimited number of friends and earn commission on all their investments.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-handwritten font-medium mb-1">How long does the referral last?</h3>
                    <p className="text-gray-600 text-sm">
                      You'll earn commission on all investments made by your referrals for as long as they remain active on our platform.
                    </p>
                  </div>
                </div>
              </HandDrawnContainer>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Referral;
