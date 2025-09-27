import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getAllTransactions } from '@/services/transactionService';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { DollarSign, TrendingUp, CreditCard, PieChart, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import NotificationSystem from '@/components/ui/NotificationSystem';
import TrustIndicators from '@/components/ui/TrustIndicators';
import ActivityFeed from '@/components/ui/ActivityFeed';

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  const { data: transactions = [] } = useQuery({
    queryKey: ['transactions'],
    queryFn: getAllTransactions,
  });

  const totalUsers = 15847;
  const totalVolume = transactions.reduce((sum, t) => sum + Number(t.amount), 0);
  const todayTransactions = transactions.filter(t => 
    new Date(t.created_at).toDateString() === new Date().toDateString()
  ).length;

  return (
    <div className="min-h-screen bg-background">
      <NotificationSystem />
      <div className="container mx-auto p-6 space-y-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Investment Dashboard</h1>
          <div className="flex items-center gap-2">
            <Badge className="bg-green-100 text-green-800 border-green-200">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              Account Active
            </Badge>
          </div>
        </div>

        {/* Trust Indicators */}
        <TrustIndicators />

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Investments</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                +2 new this month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$12,847</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Referral Earnings</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$2,341</div>
              <p className="text-xs text-muted-foreground">
                +5% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Investments</CardTitle>
              <CardDescription>Your latest investment activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { plan: 'Premium Plan', amount: '$5,000', date: '2 days ago', status: 'Active' },
                  { plan: 'Growth Plan', amount: '$2,500', date: '1 week ago', status: 'Active' },
                  { plan: 'Starter Plan', amount: '$1,000', date: '2 weeks ago', status: 'Completed' },
                ].map((investment, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded">
                    <div>
                      <p className="font-medium">{investment.plan}</p>
                      <p className="text-sm text-muted-foreground">{investment.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{investment.amount}</p>
                      <Badge variant={investment.status === 'Active' ? 'default' : 'secondary'}>
                        {investment.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance Overview</CardTitle>
              <CardDescription>Your investment performance this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">ROI</span>
                  <span className="font-medium text-green-600">+24.5%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Profit</span>
                  <span className="font-medium">$12,847</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Next Payout</span>
                  <span className="font-medium">In 3 days</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Referral Bonus</span>
                  <span className="font-medium text-blue-600">$2,341</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Live Activity Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ActivityFeed />
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                onClick={() => navigate('/invest')} 
                className="w-full"
                size="lg"
              >
                <DollarSign className="h-4 w-4 mr-2" />
                New Investment
              </Button>
              <Button 
                onClick={() => navigate('/deposit')} 
                variant="outline" 
                className="w-full"
                size="lg"
              >
                <ArrowUpRight className="h-4 w-4 mr-2" />
                Make Deposit
              </Button>
              <Button 
                onClick={() => navigate('/withdraw')} 
                variant="outline" 
                className="w-full"
                size="lg"
              >
                <ArrowDownRight className="h-4 w-4 mr-2" />
                Withdraw Funds
              </Button>
              <Button 
                onClick={() => navigate('/referral')} 
                variant="outline" 
                className="w-full"
                size="lg"
              >
                <PieChart className="h-4 w-4 mr-2" />
                Referral Program
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;