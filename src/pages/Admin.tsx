import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Users, 
  DollarSign, 
  BarChart3, 
  Settings, 
  Bell, 
  LogOut, 
  Plus,
  Search,
  Filter,
  ChevronDown,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  ClockIcon,
  Menu,
  X,
  Shield
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import HandDrawnButton from '@/components/ui/HandDrawnButton';
import HandDrawnContainer from '@/components/ui/HandDrawnContainer';
import DashboardCard from '@/components/ui/DashboardCard';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { getAllUsers, promoteUserToAdmin } from '@/services/userService';
import { getAllTransactions, updateTransactionStatus } from '@/services/transactionService';
import { getInvestmentPlans } from '@/services/investmentService';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  
  const { 
    data: users = [], 
    isLoading: isLoadingUsers,
    refetch: refetchUsers
  } = useQuery({
    queryKey: ['admin-users'],
    queryFn: getAllUsers,
    enabled: !!user
  });
  
  const { 
    data: transactions = [], 
    isLoading: isLoadingTransactions,
    refetch: refetchTransactions
  } = useQuery({
    queryKey: ['admin-transactions'],
    queryFn: getAllTransactions,
    enabled: !!user
  });
  
  const { 
    data: plans = [], 
    isLoading: isLoadingPlans,
    refetch: refetchPlans
  } = useQuery({
    queryKey: ['admin-plans'],
    queryFn: getInvestmentPlans,
    enabled: !!user
  });

  const stats = {
    totalUsers: users.length,
    totalInvested: transactions
      .filter(tx => tx.type === 'Deposit' && tx.status === 'Completed')
      .reduce((sum, tx) => sum + Number(tx.amount), 0),
    activePlans: plans.filter(plan => plan.is_popular).length,
    pendingWithdrawals: transactions
      .filter(tx => tx.type === 'Withdrawal' && tx.status === 'Pending')
      .length
  };

  const handleTransactionStatusUpdate = async (transactionId: string, status: 'Completed' | 'Failed') => {
    try {
      await updateTransactionStatus(transactionId, status);
      await refetchTransactions();
      
      toast({
        title: 'Status updated',
        description: `Transaction has been ${status === 'Completed' ? 'approved' : 'rejected'}.`,
      });
    } catch (error) {
      console.error('Error updating transaction status:', error);
      toast({
        title: 'Update failed',
        description: 'Failed to update transaction status. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleRoleToggle = async (userId: string, currentRoles: any[]) => {
    try {
      const isAdmin = currentRoles.some(role => role.role === 'admin');
      
      if (!isAdmin) {
        await promoteUserToAdmin(userId);
        toast({
          title: 'Role updated',
          description: 'User has been promoted to admin',
        });
      } else {
        toast({
          title: 'Remove admin role',
          description: 'Currently only adding admin role is supported',
          variant: 'destructive',
        });
      }
      
      refetchUsers();
    } catch (error) {
      console.error('Error updating user role:', error);
      toast({
        title: 'Update failed',
        description: 'Failed to update user role. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'users':
        return renderUsers();
      case 'transactions':
        return renderTransactions();
      case 'plans':
        return renderPlans();
      case 'settings':
        return renderSettings();
      default:
        return renderDashboard();
    }
  };

  const renderDashboard = () => (
    <>
      <div className="mb-3 sm:mb-4">
        <h1 className="text-2xl sm:text-3xl font-bold mb-1">Admin Dashboard</h1>
        <p className="text-gray-600">Overview of platform performance</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 mb-3 sm:mb-5">
        <DashboardCard
          title="Total Users"
          value={isLoadingUsers ? "Loading..." : stats.totalUsers.toString()}
          icon={<Users className="h-5 w-5" />}
          trend={{ value: 0, isPositive: true }}
        />
        <DashboardCard
          title="Total Invested"
          value={isLoadingTransactions ? "Loading..." : `$${stats.totalInvested.toLocaleString()}`}
          icon={<DollarSign className="h-5 w-5" />}
          trend={{ value: 0, isPositive: true }}
        />
        <DashboardCard
          title="Active Plans"
          value={isLoadingPlans ? "Loading..." : stats.activePlans.toString()}
          icon={<BarChart3 className="h-5 w-5" />}
          trend={{ value: 0, isPositive: true }}
        />
        <DashboardCard
          title="Pending Withdrawals"
          value={isLoadingTransactions ? "Loading..." : stats.pendingWithdrawals.toString()}
          icon={<ClockIcon className="h-5 w-5" />}
          trend={{ value: 0, isPositive: true }}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-5 mb-3 sm:mb-5">
        <HandDrawnContainer>
          <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Recent Users</h2>
          {isLoadingUsers ? (
            <div className="text-center py-4">Loading users...</div>
          ) : (
            <div className="overflow-x-auto -mx-2 px-2">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-blue-50">
                    <th className="border-2 border-black p-2 text-left">User</th>
                    <th className="border-2 border-black p-2 text-left">Email</th>
                    {!isMobile && <th className="border-2 border-black p-2 text-left">Status</th>}
                    {!isMobile && <th className="border-2 border-black p-2 text-left">Joined</th>}
                  </tr>
                </thead>
                <tbody>
                  {users.slice(0, 3).map((user) => (
                    <tr key={user.id}>
                      <td className="border-2 border-black p-2">
                        <div>
                          <p className="font-bold text-sm">{user.full_name || 'User'}</p>
                          <p className="text-xs text-gray-600">{user.username || 'No username'}</p>
                        </div>
                      </td>
                      <td className="border-2 border-black p-2">{user.email || user.username || 'No email'}</td>
                      {!isMobile && (
                        <td className="border-2 border-black p-2">
                          <span className="inline-block px-2 py-1 rounded text-xs bg-green-100 text-green-800">
                            Active
                          </span>
                        </td>
                      )}
                      {!isMobile && (
                        <td className="border-2 border-black p-2">
                          {new Date(user.created_at).toLocaleDateString()}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </HandDrawnContainer>
        
        <HandDrawnContainer>
          <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Recent Transactions</h2>
          {isLoadingTransactions ? (
            <div className="text-center py-4">Loading transactions...</div>
          ) : (
            <div className="overflow-x-auto -mx-2 px-2">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-blue-50">
                    <th className="border-2 border-black p-2 text-left">User</th>
                    <th className="border-2 border-black p-2 text-left">Type</th>
                    <th className="border-2 border-black p-2 text-left">Amount</th>
                    {!isMobile && <th className="border-2 border-black p-2 text-left">Status</th>}
                  </tr>
                </thead>
                <tbody>
                  {transactions.slice(0, 3).map((tx) => (
                    <tr key={tx.id}>
                      <td className="border-2 border-black p-2">
                        {tx.profiles?.full_name || tx.profiles?.username || 'User'}
                      </td>
                      <td className="border-2 border-black p-2">{tx.type}</td>
                      <td className="border-2 border-black p-2">${Number(tx.amount).toLocaleString()}</td>
                      {!isMobile && (
                        <td className="border-2 border-black p-2">
                          <span 
                            className={`inline-block px-2 py-1 rounded text-xs ${
                              tx.status === 'Completed' 
                                ? 'bg-green-100 text-green-800' 
                                : tx.status === 'Pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {tx.status}
                          </span>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </HandDrawnContainer>
      </div>
      
      <HandDrawnContainer>
        <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Investment Plans Overview</h2>
        {isLoadingPlans ? (
          <div className="text-center py-4">Loading plans...</div>
        ) : (
          <div className="overflow-x-auto -mx-2 px-2">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-blue-50">
                  <th className="border-2 border-black p-2 text-left">Plan Name</th>
                  <th className="border-2 border-black p-2 text-left">Return</th>
                  {!isMobile && <th className="border-2 border-black p-2 text-left">Duration</th>}
                  <th className="border-2 border-black p-2 text-left">Min. Amount</th>
                  <th className="border-2 border-black p-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {plans.map((plan) => (
                  <tr key={plan.id}>
                    <td className="border-2 border-black p-2">{plan.title}</td>
                    <td className="border-2 border-black p-2">{plan.percentage}%</td>
                    {!isMobile && <td className="border-2 border-black p-2">{plan.duration}</td>}
                    <td className="border-2 border-black p-2">${Number(plan.minimum_amount).toLocaleString()}</td>
                    <td className="border-2 border-black p-2">
                      <span className="inline-block px-2 py-1 rounded text-xs bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </HandDrawnContainer>
    </>
  );

  const renderUsers = () => (
    <>
      <div className="mb-3 sm:mb-5 flex flex-col md:flex-row justify-between md:items-center">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">User Management</h1>
          <p className="text-gray-600">Manage platform users</p>
        </div>
        <div className="mt-3 md:mt-0 flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
            <input
              type="text"
              placeholder="Search users..."
              className="hand-drawn-input pl-10 pr-4 py-2 w-full"
            />
          </div>
          <HandDrawnButton variant="primary">
            <Plus size={16} className="mr-2" /> Add User
          </HandDrawnButton>
        </div>
      </div>
      
      <HandDrawnContainer className="mb-5">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2">
          <div className="flex flex-col sm:flex-row sm:items-center">
            <div className="flex items-center mb-2 sm:mb-0">
              <Filter size={16} className="mr-2 text-gray-500" />
              <span className="font-medium mr-2">Filters:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <HandDrawnButton variant="outline" size="sm" className="flex items-center">
                Status <ChevronDown size={12} className="ml-1" />
              </HandDrawnButton>
              <HandDrawnButton variant="outline" size="sm" className="flex items-center">
                Role <ChevronDown size={12} className="ml-1" />
              </HandDrawnButton>
              <HandDrawnButton variant="outline" size="sm" className="flex items-center">
                Join Date <ChevronDown size={12} className="ml-1" />
              </HandDrawnButton>
            </div>
          </div>
          <div className="mt-2 sm:mt-0">
            <HandDrawnButton variant="outline" size="sm">
              Export
            </HandDrawnButton>
          </div>
        </div>
        
        {isLoadingUsers ? (
          <div className="text-center py-8">Loading users...</div>
        ) : (
          <div className="overflow-x-auto -mx-2 px-2">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-blue-50">
                  <th className="border-2 border-black p-2 text-left">User</th>
                  <th className="border-2 border-black p-2 text-left">Email</th>
                  <th className="border-2 border-black p-2 text-left">Role</th>
                  {!isMobile && <th className="border-2 border-black p-2 text-left">Status</th>}
                  {!isMobile && <th className="border-2 border-black p-2 text-left">Joined</th>}
                  <th className="border-2 border-black p-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => {
                  const isAdmin = user.user_roles?.some(role => role.role === 'admin');
                  
                  return (
                    <tr key={user.id}>
                      <td className="border-2 border-black p-2">
                        <div>
                          <p className="font-bold text-sm">{user.full_name || 'User'}</p>
                          <p className="text-xs text-gray-600">{user.username || 'No username'}</p>
                        </div>
                      </td>
                      <td className="border-2 border-black p-2">{user.email || user.username || 'No email'}</td>
                      <td className="border-2 border-black p-2">
                        <button 
                          onClick={() => handleRoleToggle(user.id, user.user_roles || [])}
                          className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                            isAdmin 
                              ? 'bg-purple-100 text-purple-800 hover:bg-purple-200'
                              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                          }`}
                        >
                          <Shield size={12} className="mr-1" />
                          {isAdmin ? 'Admin' : 'User'}
                        </button>
                      </td>
                      {!isMobile && (
                        <td className="border-2 border-black p-2">
                          <span className="inline-block px-2 py-1 rounded text-xs bg-green-100 text-green-800">
                            Active
                          </span>
                        </td>
                      )}
                      {!isMobile && (
                        <td className="border-2 border-black p-2">
                          {new Date(user.created_at).toLocaleDateString()}
                        </td>
                      )}
                      <td className="border-2 border-black p-2">
                        {isMobile ? (
                          <HandDrawnButton variant="outline" size="sm">
                            <Edit size={12} className="mr-1" /> Edit
                          </HandDrawnButton>
                        ) : (
                          <div className="flex gap-2">
                            <HandDrawnButton variant="outline" size="sm">
                              <Edit size={12} className="mr-1" /> Edit
                            </HandDrawnButton>
                            <HandDrawnButton variant="outline" size="sm" className="text-red-600 border-red-600">
                              <Trash2 size={12} className="mr-1" /> Delete
                            </HandDrawnButton>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        
        <div className="mt-3 flex flex-col sm:flex-row justify-between items-center">
          <div className="text-gray-600 text-sm mb-2 sm:mb-0">
            Showing {users.length} users
          </div>
          <div className="flex gap-1 sm:gap-2">
            <HandDrawnButton variant="outline" size="sm">Previous</HandDrawnButton>
            <HandDrawnButton variant="primary" size="sm">1</HandDrawnButton>
            <HandDrawnButton variant="outline" size="sm">Next</HandDrawnButton>
          </div>
        </div>
      </HandDrawnContainer>
    </>
  );

  const renderTransactions = () => (
    <>
      <div className="mb-3 sm:mb-5 flex flex-col md:flex-row justify-between md:items-center">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">Transaction Management</h1>
          <p className="text-gray-600">Monitor and manage all transactions</p>
        </div>
        <div className="mt-3 md:mt-0 flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
            <input
              type="text"
              placeholder="Search transactions..."
              className="hand-drawn-input pl-10 pr-4 py-2 w-full"
            />
          </div>
          <HandDrawnButton variant="outline">
            <Filter size={16} className="mr-2" /> Filter
          </HandDrawnButton>
        </div>
      </div>
      
      <HandDrawnContainer className="mb-5">
        {isLoadingTransactions ? (
          <div className="text-center py-8">Loading transactions...</div>
        ) : (
          <div className="overflow-x-auto -mx-2 px-2">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-blue-50">
                  <th className="border-2 border-black p-2 text-left">User</th>
                  <th className="border-2 border-black p-2 text-left">Type</th>
                  <th className="border-2 border-black p-2 text-left">Amount</th>
                  {!isMobile && <th className="border-2 border-black p-2 text-left">Date</th>}
                  <th className="border-2 border-black p-2 text-left">Status</th>
                  <th className="border-2 border-black p-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id}>
                    <td className="border-2 border-black p-2">
                      {tx.profiles?.full_name || tx.profiles?.username || 'User'}
                    </td>
                    <td className="border-2 border-black p-2">
                      <span 
                        className={`inline-block px-2 py-1 rounded text-xs ${
                          tx.type === 'Deposit' 
                            ? 'bg-green-100 text-green-800' 
                            : tx.type === 'Payout'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {tx.type}
                      </span>
                    </td>
                    <td className="border-2 border-black p-2">${Number(tx.amount).toLocaleString()}</td>
                    {!isMobile && (
                      <td className="border-2 border-black p-2">
                        {new Date(tx.created_at).toLocaleDateString()}
                      </td>
                    )}
                    <td className="border-2 border-black p-2">
                      <span 
                        className={`inline-block px-2 py-1 rounded text-xs ${
                          tx.status === 'Completed' 
                            ? 'bg-green-100 text-green-800' 
                            : tx.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {tx.status}
                      </span>
                    </td>
                    <td className="border-2 border-black p-2">
                      {isMobile ? (
                        tx.status === 'Pending' ? (
                          <HandDrawnButton 
                            variant="outline" 
                            size="sm" 
                            className="text-green-600 border-green-600"
                            onClick={() => handleTransactionStatusUpdate(tx.id, 'Completed')}
                          >
                            <CheckCircle size={12} className="mr-1" /> Approve
                          </HandDrawnButton>
                        ) : (
                          <HandDrawnButton variant="outline" size="sm">
                            <Edit size={12} className="mr-1" /> Details
                          </HandDrawnButton>
                        )
                      ) : (
                        <div className="flex gap-2">
                          {tx.status === 'Pending' && (
                            <>
                              <HandDrawnButton 
                                variant="outline" 
                                size="sm" 
                                className="text-green-600 border-green-600"
                                onClick={() => handleTransactionStatusUpdate(tx.id, 'Completed')}
                              >
                                <CheckCircle size={12} className="mr-1" /> Approve
                              </HandDrawnButton>
                              <HandDrawnButton 
                                variant="outline" 
                                size="sm" 
                                className="text-red-600 border-red-600"
                                onClick={() => handleTransactionStatusUpdate(tx.id, 'Failed')}
                              >
                                <XCircle size={12} className="mr-1" /> Reject
                              </HandDrawnButton>
                            </>
                          )}
                          {tx.status !== 'Pending' && (
                            <HandDrawnButton variant="outline" size="sm">
                              <Edit size={12} className="mr-1" /> Details
                            </HandDrawnButton>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        <div className="mt-3 flex flex-col sm:flex-row justify-between items-center">
          <div className="text-gray-600 text-sm mb-2 sm:mb-0">
            Showing {transactions.length} transactions
          </div>
          <div className="flex gap-1 sm:gap-2">
            <HandDrawnButton variant="outline" size="sm">Previous</HandDrawnButton>
            <HandDrawnButton variant="primary" size="sm">1</HandDrawnButton>
            <HandDrawnButton variant="outline" size="sm">Next</HandDrawnButton>
          </div>
        </div>
      </HandDrawnContainer>
    </>
  );

  const renderPlans = () => (
    <>
      <div className="mb-6 flex flex-col md:flex-row justify-between md:items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Investment Plans</h1>
          <p className="text-gray-600">Manage available investment plans</p>
        </div>
        <div className="mt-4 md:mt-0">
          <HandDrawnButton variant="primary">
            <Plus size={18} className="mr-2" /> Create New Plan
          </HandDrawnButton>
        </div>
      </div>
      
      <HandDrawnContainer className="mb-8">
        {isLoadingPlans ? (
          <div className="text-center py-8">Loading plans...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-blue-50">
                  <th className="border-2 border-black p-3 text-left">Plan Name</th>
                  <th className="border-2 border-black p-3 text-left">Return</th>
                  <th className="border-2 border-black p-3 text-left">Duration</th>
                  <th className="border-2 border-black p-3 text-left">Min Amount</th>
                  <th className="border-2 border-black p-3 text-left">Status</th>
                  <th className="border-2 border-black p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {plans.map((plan) => (
                  <tr key={plan.id}>
                    <td className="border-2 border-black p-3">{plan.title}</td>
                    <td className="border-2 border-black p-3">{plan.percentage}%</td>
                    <td className="border-2 border-black p-3">{plan.duration}</td>
                    <td className="border-2 border-black p-3">${Number(plan.minimum_amount).toLocaleString()}</td>
                    <td className="border-2 border-black p-3">
                      <span className="inline-block px-2 py-1 rounded bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>
                    <td className="border-2 border-black p-3">
                      <div className="flex gap-2">
                        <HandDrawnButton variant="outline" size="sm">
                          <Edit size={14} className="mr-1" /> Edit
                        </HandDrawnButton>
                        <HandDrawnButton variant="outline" size="sm" className="text-yellow-600 border-yellow-600">
                          {plan.is_popular ? 'Remove Popular' : 'Mark Popular'}
                        </HandDrawnButton>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </HandDrawnContainer>
    </>
  );

  const renderSettings = () => (
    <>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Platform Settings</h1>
        <p className="text-gray-600">Configure platform parameters</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <HandDrawnContainer className="mb-8">
          <h2 className="text-xl font-bold mb-4">General Settings</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block font-handwritten font-medium mb-2">Platform Name</label>
              <input
                type="text"
                value="InvestPro"
                className="hand-drawn-input w-full"
              />
            </div>
            
            <div>
              <label className="block font-handwritten font-medium mb-2">Contact Email</label>
              <input
                type="email"
                value="support@investpro.com"
                className="hand-drawn-input w-full"
              />
            </div>
            
            <div>
              <label className="block font-handwritten font-medium mb-2">Platform Currency</label>
              <select className="hand-drawn-input w-full">
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
            </div>
            
            <div>
              <label className="block font-handwritten font-medium mb-2">Maintenance Mode</label>
              <div className="flex items-center">
                <input type="checkbox" id="maintenance" className="mr-2" />
                <label htmlFor="maintenance">Enable maintenance mode</label>
              </div>
            </div>
          </div>
        </HandDrawnContainer>
        
        <HandDrawnContainer className="mb-8">
          <h2 className="text-xl font-bold mb-4">Transaction Settings</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block font-handwritten font-medium mb-2">Minimum Deposit</label>
              <input
                type="text"
                defaultValue="100"
                className="hand-drawn-input w-full"
              />
            </div>
            
            <div>
              <label className="block font-handwritten font-medium mb-2">Minimum Withdrawal</label>
              <input
                type="text"
                defaultValue="50"
                className="hand-drawn-input w-full"
              />
            </div>
            
            <div>
              <label className="block font-handwritten font-medium mb-2">Withdrawal Fee (%)</label>
              <input
                type="text"
                defaultValue="2.5"
                className="hand-drawn-input w-full"
              />
            </div>
            
            <div>
              <label className="block font-handwritten font-medium mb-2">Auto-Approve Withdrawals</label>
              <div className="flex items-center">
                <input type="checkbox" id="auto-approve" className="mr-2" />
                <label htmlFor="auto-approve">Enable auto-approval for verified users</label>
              </div>
            </div>
          </div>
        </HandDrawnContainer>
      </div>
      
      <div className="flex justify-end mt-6">
        <HandDrawnButton variant="outline" className="mr-4">
          Reset
        </HandDrawnButton>
        <HandDrawnButton variant="primary">
          Save Changes
        </HandDrawnButton>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex">
      {/* Mobile Sidebar Toggle */}
      <button 
        onClick={toggleSidebar} 
        className="md:hidden fixed top-4 left-4 z-30 bg-blue-500 text-white p-2 rounded-lg shadow-lg"
        aria-label="Toggle menu"
      >
        <Menu size={24} />
      </button>

      {/* Sidebar */}
      <div 
        className={`fixed md:static w-[250px] md:w-64 bg-blue-50 border-r-2 border-black min-h-screen ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } transition-transform duration-300 ease-in-out z-40 md:z-20`}
      >
        <div className="p-4 border-b-2 border-black flex justify-between items-center">
          <div className="text-xl font-handwritten font-bold tracking-tight">
            <span className="text-blue-600">Admin</span>Panel
          </div>
          <button 
            onClick={toggleSidebar} 
            className="md:hidden text-gray-700 hover:text-gray-900"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>
        
        <nav className="p-3">
          <ul className="space-y-1">
            <li>
              <button
                onClick={() => {
                  setActiveTab('dashboard');
                  if (isMobile) setSidebarOpen(false);
                }}
                className={`w-full text-left flex items-center px-3 py-2 rounded-lg font-handwritten ${
                  activeTab === 'dashboard' 
                    ? 'bg-blue-500 text-white' 
                    : 'hover:bg-blue-100'
                }`}
              >
                <BarChart3 className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Dashboard
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveTab('users');
                  if (isMobile) setSidebarOpen(false);
                }}
                className={`w-full text-left flex items-center px-3 py-2 rounded-lg font-handwritten ${
                  activeTab === 'users' 
                    ? 'bg-blue-500 text-white' 
                    : 'hover:bg-blue-100'
                }`}
              >
                <Users className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Users
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveTab('transactions');
                  if (isMobile) setSidebarOpen(false);
                }}
                className={`w-full text-left flex items-center px-3 py-2 rounded-lg font-handwritten ${
                  activeTab === 'transactions' 
                    ? 'bg-blue-500 text-white' 
                    : 'hover:bg-blue-100'
                }`}
              >
                <DollarSign className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Transactions
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveTab('plans');
                  if (isMobile) setSidebarOpen(false);
                }}
                className={`w-full text-left flex items-center px-3 py-2 rounded-lg font-handwritten ${
                  activeTab === 'plans' 
                    ? 'bg-blue-500 text-white' 
                    : 'hover:bg-blue-100'
                }`}
              >
                <BarChart3 className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Plans
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveTab('settings');
                  if (isMobile) setSidebarOpen(false);
                }}
                className={`w-full text-left flex items-center px-3 py-2 rounded-lg font-handwritten ${
                  activeTab === 'settings' 
                    ? 'bg-blue-500 text-white' 
                    : 'hover:bg-blue-100'
                }`}
              >
                <Settings className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Settings
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-4 md:p-6 md:ml-64">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Admin;
