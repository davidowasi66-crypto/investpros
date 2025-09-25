
import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { 
  BarChart3, 
  DollarSign, 
  TrendingUp, 
  ClockIcon, 
  RefreshCw, 
  ArrowUp, 
  ArrowDown, 
  ExternalLink,
  UserPlus,
  PlusCircle
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import HandDrawnButton from '@/components/ui/HandDrawnButton';
import HandDrawnContainer from '@/components/ui/HandDrawnContainer';
import DashboardCard from '@/components/ui/DashboardCard';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/context/AuthContext';
import { getUserInvestments } from '@/services/investmentService';
import { getUserTransactions } from '@/services/transactionService';
import { getUserReferrals } from '@/services/userService';

const Dashboard = () => {
  const isMobile = useIsMobile();
  const { user } = useAuth();
  
  // Fetch user investments
  const { 
    data: investments = [], 
    isLoading: investmentsLoading,
    refetch: refetchInvestments
  } = useQuery({
    queryKey: ['user-investments', user?.id],
    queryFn: () => getUserInvestments(user!.id),
    enabled: !!user?.id
  });
  
  // Fetch user transactions
  const { 
    data: transactions = [], 
    isLoading: transactionsLoading,
    refetch: refetchTransactions
  } = useQuery({
    queryKey: ['user-transactions', user?.id],
    queryFn: () => getUserTransactions(user!.id),
    enabled: !!user?.id
  });
  
  // Fetch user referrals
  const { 
    data: referrals = [], 
    isLoading: referralsLoading
  } = useQuery({
    queryKey: ['user-referrals', user?.id],
    queryFn: () => getUserReferrals(user!.id),
    enabled: !!user?.id
  });

  // Calculate stats
  const stats = {
    totalBalance: transactions
      .filter(tx => tx.status === 'Completed')
      .reduce((balance, tx) => {
        if (tx.type === 'Deposit' || tx.type === 'Payout') {
          return balance + Number(tx.amount);
        } else if (tx.type === 'Withdrawal') {
          return balance - Number(tx.amount);
        }
        return balance;
      }, 0),
    activeInvestments: investments.filter(inv => inv.status === 'Active').length,
    totalEarnings: transactions
      .filter(tx => tx.type === 'Payout' && tx.status === 'Completed')
      .reduce((sum, tx) => sum + Number(tx.amount), 0),
    nextPayout: (() => {
      const sortedInvestments = [...investments]
        .filter(inv => inv.status === 'Active')
        .sort((a, b) => new Date(a.end_date || a.created_at).getTime() - new Date(b.end_date || b.created_at).getTime());
      
      if (sortedInvestments.length === 0) return 'No active investments';
      
      const nextDate = new Date(sortedInvestments[0].end_date || sortedInvestments[0].created_at);
      const today = new Date();
      const diffTime = Math.abs(nextDate.getTime() - today.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      return `in ${diffDays} days`;
    })(),
    referralCount: referrals.length,
    referralEarnings: transactions
      .filter(tx => tx.type === 'Referral' && tx.status === 'Completed')
      .reduce((sum, tx) => sum + Number(tx.amount), 0)
  };

  const handleRefresh = () => {
    refetchInvestments();
    refetchTransactions();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow py-0 px-0 sm:py-1">
        <div className="container mx-auto max-w-full px-1 sm:px-2">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2 md:mb-3 px-2">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-1">Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user?.email?.split('@')[0] || 'Investor'}!</p>
            </div>
            <div className="mt-2 md:mt-0 flex flex-wrap gap-2 sm:space-x-4">
              <HandDrawnButton variant="outline" size="sm" onClick={handleRefresh}>
                <RefreshCw className="mr-2 h-4 w-4" /> Refresh
              </HandDrawnButton>
              <Link to="/invest">
                <HandDrawnButton variant="primary" size="sm">
                  <PlusCircle className="mr-2 h-4 w-4" /> New Investment
                </HandDrawnButton>
              </Link>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4 md:mb-6 px-1 sm:px-0">
            <Link to="/deposit" className="w-full">
              <HandDrawnContainer className="p-6 bg-gradient-to-br from-white to-gray-50 hover:from-gray-50 hover:to-gray-100 transition-all duration-200 text-center h-full border-gray-100 hover:border-gray-200">
                <DollarSign className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="font-handwritten font-bold text-gray-700">Deposit</p>
              </HandDrawnContainer>
            </Link>
            <Link to="/withdraw" className="w-full">
              <HandDrawnContainer className="p-6 bg-gradient-to-br from-white to-gray-50 hover:from-gray-50 hover:to-gray-100 transition-all duration-200 text-center h-full border-gray-100 hover:border-gray-200">
                <ArrowUp className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="font-handwritten font-bold text-gray-700">Withdraw</p>
              </HandDrawnContainer>
            </Link>
            <Link to="/invest" className="w-full">
              <HandDrawnContainer className="p-6 bg-gradient-to-br from-white to-gray-50 hover:from-gray-50 hover:to-gray-100 transition-all duration-200 text-center h-full border-gray-100 hover:border-gray-200">
                <TrendingUp className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="font-handwritten font-bold text-gray-700">Invest</p>
              </HandDrawnContainer>
            </Link>
            <Link to="/referral" className="w-full">
              <HandDrawnContainer className="p-6 bg-gradient-to-br from-white to-gray-50 hover:from-gray-50 hover:to-gray-100 transition-all duration-200 text-center h-full border-gray-100 hover:border-gray-200">
                <UserPlus className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="font-handwritten font-bold text-gray-700">Referral</p>
              </HandDrawnContainer>
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-2 md:mb-3 px-1 sm:px-0">
            <DashboardCard
              title="Total Balance"
              value={investmentsLoading || transactionsLoading ? "Loading..." : `$${stats.totalBalance.toLocaleString()}`}
              icon={<DollarSign className="h-5 w-5" />}
              trend={{ value: 0, isPositive: true }}
            />
            <DashboardCard
              title="Active Investments"
              value={investmentsLoading ? "Loading..." : stats.activeInvestments.toString()}
              icon={<BarChart3 className="h-5 w-5" />}
              trend={{ value: 0, isPositive: true }}
            />
            <DashboardCard
              title="Total Earnings"
              value={transactionsLoading ? "Loading..." : `$${stats.totalEarnings.toLocaleString()}`}
              icon={<TrendingUp className="h-5 w-5" />}
              trend={{ value: 0, isPositive: true }}
            />
            <DashboardCard
              title="Next Payout"
              value={investmentsLoading ? "Loading..." : stats.nextPayout}
              icon={<ClockIcon className="h-5 w-5" />}
            />
          </div>

          {/* Investments Section */}
          <HandDrawnContainer className="mb-2 md:mb-3 mx-1 sm:mx-0">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg sm:text-xl font-bold">Your Investments</h2>
              <Link to="/invest">
                <HandDrawnButton variant="outline" size="sm">
                  View All Plans
                </HandDrawnButton>
              </Link>
            </div>

            {investmentsLoading ? (
              <div className="text-center py-8">Loading investments...</div>
            ) : investments.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">You don't have any investments yet.</p>
                <Link to="/invest">
                  <HandDrawnButton variant="primary">
                    Start Investing
                  </HandDrawnButton>
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto -mx-2 px-2">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="bg-blue-50">
                      <th className="border-2 border-black p-2 text-left">Plan</th>
                      <th className="border-2 border-black p-2 text-left">Amount</th>
                      {!isMobile && <th className="border-2 border-black p-2 text-left">Start Date</th>}
                      <th className="border-2 border-black p-2 text-left">Next Payout</th>
                      {!isMobile && <th className="border-2 border-black p-2 text-left">Return</th>}
                      <th className="border-2 border-black p-2 text-left">Status</th>
                      <th className="border-2 border-black p-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {investments.map((investment) => (
                      <tr key={investment.id}>
                        <td className="border-2 border-black p-2">
                          {investment.plan_name || 'Unknown Plan'}
                        </td>
                        <td className="border-2 border-black p-2">
                          ${Number(investment.amount || 0).toLocaleString()}
                        </td>
                        {!isMobile && (
                          <td className="border-2 border-black p-2">
                            {new Date(investment.created_at).toLocaleDateString()}
                          </td>
                        )}
                        <td className="border-2 border-black p-2">
                          {investment.status === 'Active' 
                            ? (investment.end_date ? new Date(investment.end_date).toLocaleDateString() : 'TBD')
                            : 'Completed'}
                        </td>
                        {!isMobile && (
                          <td className="border-2 border-black p-2">
                            {Number(investment.interest_rate || 0)}%
                          </td>
                        )}
                        <td className="border-2 border-black p-2">
                          <span 
                            className={`inline-block px-2 py-1 rounded text-xs ${
                              investment.status === 'Active' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {investment.status}
                          </span>
                        </td>
                        <td className="border-2 border-black p-2">
                          <HandDrawnButton variant="outline" size="sm">
                            {isMobile ? 'View' : 'Details'}
                          </HandDrawnButton>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </HandDrawnContainer>

          {/* Transactions Section */}
          <HandDrawnContainer className="mb-2 md:mb-3 mx-1 sm:mx-0">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg sm:text-xl font-bold">Recent Transactions</h2>
              <HandDrawnButton variant="outline" size="sm">
                View All
              </HandDrawnButton>
            </div>

            {transactionsLoading ? (
              <div className="text-center py-8">Loading transactions...</div>
            ) : transactions.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">You don't have any transactions yet.</p>
                <Link to="/deposit">
                  <HandDrawnButton variant="primary">
                    Make Your First Deposit
                  </HandDrawnButton>
                </Link>
              </div>
            ) : (
              <div className="space-y-2 md:space-y-3">
                {transactions.slice(0, 4).map((transaction) => (
                  <div key={transaction.id} className="border-2 border-black p-2 sm:p-3 rounded-lg flex justify-between items-center">
                    <div className="flex items-center">
                      <div className={`p-2 rounded-full mr-2 sm:mr-3 ${
                        transaction.type === 'Deposit' || transaction.type === 'Payout'
                          ? 'bg-green-100'
                          : 'bg-red-100'
                      }`}>
                        {transaction.type === 'Deposit' || transaction.type === 'Payout' ? (
                          <ArrowDown className={`h-4 w-4 sm:h-5 sm:w-5 ${
                            transaction.type === 'Deposit' || transaction.type === 'Payout'
                              ? 'text-green-600'
                              : 'text-red-600'
                          }`} />
                        ) : (
                          <ArrowUp className="h-4 w-4 sm:h-5 sm:w-5 text-red-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-sm">{transaction.type}</p>
                        <p className="text-xs text-gray-600">
                          {new Date(transaction.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-sm">${Number(transaction.amount).toLocaleString()}</p>
                      <p className={`text-xs ${
                        transaction.status === 'Completed' 
                          ? 'text-green-600' 
                          : transaction.status === 'Pending'
                          ? 'text-yellow-600'
                          : 'text-red-600'
                      }`}>
                        {transaction.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </HandDrawnContainer>

          {/* Referral Section */}
          <HandDrawnContainer className="bg-gradient-to-br from-white to-gray-50 border-gray-100 mx-1 sm:mx-0">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0 md:mr-4 w-full md:w-auto">
                <h2 className="text-lg sm:text-xl font-bold mb-2">Refer Friends & Earn</h2>
                <p className="text-gray-600 mb-3 text-sm">
                  Share your referral link and earn up to 5% commission on their investments.
                </p>
                <div className="flex flex-col sm:flex-row gap-2 w-full">
                  <input
                    type="text"
                    value={`https://investpro.com/ref/${user?.id?.substring(0, 8)}`}
                    readOnly
                    className="hand-drawn-input flex-grow text-sm truncate"
                  />
                  <Link to="/referral">
                    <HandDrawnButton variant="primary">
                      Referral Program
                    </HandDrawnButton>
                  </Link>
                </div>
              </div>
              <div className="text-center md:text-right w-full md:w-auto">
                <div className="inline-block md:block mb-3 md:mb-2 mr-4 md:mr-0">
                  <p className="text-xs text-gray-600">Your Referrals</p>
                  <p className="text-xl font-bold">
                    {referralsLoading ? "Loading..." : stats.referralCount}
                  </p>
                </div>
                <div className="inline-block md:block">
                  <p className="text-xs text-gray-600">Earned Commission</p>
                  <p className="text-xl font-bold">
                    {transactionsLoading ? "Loading..." : `$${stats.referralEarnings.toLocaleString()}`}
                  </p>
                </div>
              </div>
            </div>
          </HandDrawnContainer>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
