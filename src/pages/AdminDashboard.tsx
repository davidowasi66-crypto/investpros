import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Users, CreditCard, TrendingUp, Settings, Menu, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { getAllUsers } from '@/services/userService';
import { getAllTransactions } from '@/services/transactionService';
import DashboardCard from '@/components/ui/DashboardCard';
import { Button } from '@/components/ui/button';

const AdminDashboard = () => {
  const { user, signOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const { data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers,
  });

  const { data: transactions = [] } = useQuery({
    queryKey: ['transactions'],
    queryFn: getAllTransactions,
  });

  const totalUsers = users.length;
  const pendingTransactions = transactions.filter(t => t.status === 'Pending').length;
  const totalVolume = transactions.reduce((sum, t) => sum + Number(t.amount), 0);

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'transactions', label: 'Transactions', icon: CreditCard },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <DashboardCard
                title="Total Users"
                value={totalUsers.toString()}
                icon={<Users className="h-6 w-6" />}
                trend={{ value: 12, isPositive: true }}
              />
              <DashboardCard
                title="Pending Transactions"
                value={pendingTransactions.toString()}
                icon={<CreditCard className="h-6 w-6" />}
                trend={{ value: 5, isPositive: true }}
              />
              <DashboardCard
                title="Total Volume"
                value={`$${totalVolume.toLocaleString()}`}
                icon={<TrendingUp className="h-6 w-6" />}
                trend={{ value: 23, isPositive: true }}
              />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-card rounded-lg border p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Users</h3>
                <div className="space-y-3">
                  {users.slice(0, 5).map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-3 bg-muted/50 rounded">
                      <div>
                        <p className="font-medium">{user.full_name || 'Unknown'}</p>
                        <p className="text-sm text-muted-foreground">{user.username}</p>
                      </div>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                        {user.user_roles?.[0]?.role || 'user'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-card rounded-lg border p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
                <div className="space-y-3">
                  {transactions.slice(0, 5).map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-3 bg-muted/50 rounded">
                      <div>
                        <p className="font-medium">${transaction.amount}</p>
                        <p className="text-sm text-muted-foreground">{transaction.type}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${
                        transaction.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        transaction.status === 'Approved' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {transaction.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'users':
        return (
          <div className="bg-card rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">User Management</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Name</th>
                    <th className="text-left py-2">Email</th>
                    <th className="text-left py-2">Role</th>
                    <th className="text-left py-2">Created</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b">
                      <td className="py-2">{user.full_name || 'Unknown'}</td>
                      <td className="py-2">{user.username}</td>
                      <td className="py-2">
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                          {user.user_roles?.[0]?.role || 'user'}
                        </span>
                      </td>
                      <td className="py-2">{new Date(user.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'transactions':
        return (
          <div className="bg-card rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Transaction Management</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Amount</th>
                    <th className="text-left py-2">Type</th>
                    <th className="text-left py-2">Status</th>
                    <th className="text-left py-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b">
                      <td className="py-2">${transaction.amount}</td>
                      <td className="py-2">{transaction.type}</td>
                      <td className="py-2">
                        <span className={`text-xs px-2 py-1 rounded ${
                          transaction.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          transaction.status === 'Approved' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {transaction.status}
                        </span>
                      </td>
                      <td className="py-2">{new Date(transaction.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="bg-card rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Admin Settings</h2>
            <p className="text-muted-foreground">Configure platform settings and preferences.</p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <h1 className="text-xl font-bold">Admin Panel</h1>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <nav className="p-4 space-y-2">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === item.id 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-muted'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <Button
            onClick={signOut}
            variant="outline"
            className="w-full"
          >
            Sign Out
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="h-16 bg-card border-b flex items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-4 w-4" />
            </Button>
            <h2 className="text-lg font-semibold">
              {navigationItems.find(item => item.id === activeTab)?.label}
            </h2>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">
              Welcome, {user?.email}
            </span>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;