import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Users, CreditCard, TrendingUp, Settings, Menu, X, 
  DollarSign, PieChart, Shield, Share2, Coins, 
  FileText, AlertCircle, CheckCircle, Clock,
  Search, Filter, MoreVertical, Edit, Trash2,
  Plus, Download, Eye, BarChart3
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { getAllUsers } from '@/services/userService';
import { getAllTransactions } from '@/services/transactionService';
import DashboardCard from '@/components/ui/DashboardCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

const AdminDashboard = () => {
  const { user, signOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const { data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers,
  });

  const { data: transactions = [] } = useQuery({
    queryKey: ['transactions'],
    queryFn: getAllTransactions,
  });

  // Enhanced statistics
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.created_at > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()).length;
  const pendingTransactions = transactions.filter(t => t.status === 'Pending').length;
  const approvedTransactions = transactions.filter(t => t.status === 'Approved').length;
  const totalVolume = transactions.reduce((sum, t) => sum + Number(t.amount), 0);
  const depositVolume = transactions.filter(t => t.type === 'deposit').reduce((sum, t) => sum + Number(t.amount), 0);
  const withdrawVolume = transactions.filter(t => t.type === 'withdraw').reduce((sum, t) => sum + Number(t.amount), 0);
  const todayTransactions = transactions.filter(t => 
    new Date(t.created_at).toDateString() === new Date().toDateString()
  ).length;

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'investments', label: 'Investments', icon: TrendingUp },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'referrals', label: 'Referrals', icon: Share2 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            {/* Enhanced Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <DashboardCard
                title="Total Users"
                value={totalUsers.toString()}
                icon={<Users className="h-6 w-6" />}
                trend={{ value: 12, isPositive: true }}
              />
              <DashboardCard
                title="Active Users (30d)"
                value={activeUsers.toString()}
                icon={<Users className="h-6 w-6" />}
                trend={{ value: 8, isPositive: true }}
              />
              <DashboardCard
                title="Total Volume"
                value={`$${totalVolume.toLocaleString()}`}
                icon={<DollarSign className="h-6 w-6" />}
                trend={{ value: 23, isPositive: true }}
              />
              <DashboardCard
                title="Today's Transactions"
                value={todayTransactions.toString()}
                icon={<CreditCard className="h-6 w-6" />}
                trend={{ value: 15, isPositive: true }}
              />
            </div>

            {/* Financial Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Deposits</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${depositVolume.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    +12% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Withdrawals</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${withdrawVolume.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    +8% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{pendingTransactions}</div>
                  <p className="text-xs text-muted-foreground">
                    Requires attention
                  </p>
                </CardContent>
              </Card>
            </div>
            
            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Users</CardTitle>
                  <CardDescription>Latest registered users</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {users.slice(0, 5).map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-3 bg-muted/50 rounded">
                        <div>
                          <p className="font-medium">{user.full_name || 'Unknown'}</p>
                          <p className="text-sm text-muted-foreground">{user.username}</p>
                        </div>
                        <Badge variant="secondary">
                          {user.user_roles?.[0]?.role || 'user'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>Latest financial activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {transactions.slice(0, 5).map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-3 bg-muted/50 rounded">
                        <div>
                          <p className="font-medium">${transaction.amount}</p>
                          <p className="text-sm text-muted-foreground">{transaction.type}</p>
                        </div>
                        <Badge 
                          variant={
                            transaction.status === 'Pending' ? 'outline' :
                            transaction.status === 'Approved' ? 'default' : 'destructive'
                          }
                        >
                          {transaction.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      
      case 'users':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>Manage platform users and their permissions</CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add User
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue placeholder="Filter by role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.full_name || 'Unknown'}</TableCell>
                          <TableCell>{user.username}</TableCell>
                          <TableCell>
                            <Badge variant={user.user_roles?.[0]?.role === 'admin' ? 'default' : 'secondary'}>
                              {user.user_roles?.[0]?.role || 'user'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-green-600">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Active
                            </Badge>
                          </TableCell>
                          <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'investments':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Investment Packages</CardTitle>
                    <CardDescription>Manage investment plans and returns</CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Package
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="border-primary/20">
                    <CardHeader>
                      <CardTitle className="text-lg">Basic Plan</CardTitle>
                      <CardDescription>5% Daily Return</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p className="text-2xl font-bold">$100 - $999</p>
                        <p className="text-sm text-muted-foreground">Minimum investment</p>
                        <div className="flex justify-between text-sm">
                          <span>Duration:</span>
                          <span className="font-medium">30 days</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Total Return:</span>
                          <span className="font-medium text-green-600">150%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-primary/20">
                    <CardHeader>
                      <CardTitle className="text-lg">Premium Plan</CardTitle>
                      <CardDescription>8% Daily Return</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p className="text-2xl font-bold">$1,000 - $4,999</p>
                        <p className="text-sm text-muted-foreground">Minimum investment</p>
                        <div className="flex justify-between text-sm">
                          <span>Duration:</span>
                          <span className="font-medium">45 days</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Total Return:</span>
                          <span className="font-medium text-green-600">360%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-primary/20">
                    <CardHeader>
                      <CardTitle className="text-lg">VIP Plan</CardTitle>
                      <CardDescription>12% Daily Return</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p className="text-2xl font-bold">$5,000+</p>
                        <p className="text-sm text-muted-foreground">Minimum investment</p>
                        <div className="flex justify-between text-sm">
                          <span>Duration:</span>
                          <span className="font-medium">60 days</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Total Return:</span>
                          <span className="font-medium text-green-600">720%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'payments':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Payment Management</CardTitle>
                    <CardDescription>Monitor deposits, withdrawals, and transaction status</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                    <Button>
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all" className="space-y-4">
                  <TabsList>
                    <TabsTrigger value="all">All Transactions</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="approved">Approved</TabsTrigger>
                    <TabsTrigger value="rejected">Rejected</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="all" className="space-y-4">
                    <div className="border rounded-lg">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Transaction ID</TableHead>
                            <TableHead>User</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {transactions.map((transaction) => (
                            <TableRow key={transaction.id}>
                              <TableCell className="font-mono text-xs">{transaction.id.slice(0, 8)}...</TableCell>
                              <TableCell>User #{transaction.user_id.slice(0, 8)}...</TableCell>
                              <TableCell className="font-medium">${transaction.amount}</TableCell>
                              <TableCell>
                                <Badge variant="outline" className="capitalize">
                                  {transaction.type}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Badge 
                                  variant={
                                    transaction.status === 'Pending' ? 'outline' :
                                    transaction.status === 'Approved' ? 'default' : 'destructive'
                                  }
                                >
                                  {transaction.status}
                                </Badge>
                              </TableCell>
                              <TableCell>{new Date(transaction.created_at).toLocaleDateString()}</TableCell>
                              <TableCell className="text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                      <MoreVertical className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>
                                      <Eye className="h-4 w-4 mr-2" />
                                      View Details
                                    </DropdownMenuItem>
                                    {transaction.status === 'Pending' && (
                                      <>
                                        <DropdownMenuItem className="text-green-600">
                                          <CheckCircle className="h-4 w-4 mr-2" />
                                          Approve
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="text-red-600">
                                          <AlertCircle className="h-4 w-4 mr-2" />
                                          Reject
                                        </DropdownMenuItem>
                                      </>
                                    )}
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        );

      case 'referrals':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Referral System</CardTitle>
                <CardDescription>Manage referral bonuses and commission structure</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="level1">Level 1 Commission (%)</Label>
                      <Input id="level1" type="number" defaultValue="10" />
                    </div>
                    <div>
                      <Label htmlFor="level2">Level 2 Commission (%)</Label>
                      <Input id="level2" type="number" defaultValue="5" />
                    </div>
                    <div>
                      <Label htmlFor="level3">Level 3 Commission (%)</Label>
                      <Input id="level3" type="number" defaultValue="2" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="signup-bonus">Signup Bonus ($)</Label>
                      <Input id="signup-bonus" type="number" defaultValue="50" />
                    </div>
                    <div>
                      <Label htmlFor="min-withdrawal">Minimum Withdrawal ($)</Label>
                      <Input id="min-withdrawal" type="number" defaultValue="10" />
                    </div>
                    <Button className="w-full">Update Settings</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Referrers</CardTitle>
                <CardDescription>Users with highest referral earnings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((rank) => (
                    <div key={rank} className="flex items-center justify-between p-3 bg-muted/50 rounded">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                          {rank}
                        </div>
                        <div>
                          <p className="font-medium">User #{rank}23456</p>
                          <p className="text-sm text-muted-foreground">{5 - rank + 5} referrals</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${(1000 - rank * 150).toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">Total earned</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Settings</CardTitle>
                <CardDescription>Configure general platform settings and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="general" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="currencies">Currencies</TabsTrigger>
                    <TabsTrigger value="limits">Limits</TabsTrigger>
                    <TabsTrigger value="scripts">Scripts</TabsTrigger>
                  </TabsList>

                  <TabsContent value="general" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="site-name">Site Name</Label>
                          <Input id="site-name" defaultValue="HyipPro Admin" />
                        </div>
                        <div>
                          <Label htmlFor="site-url">Site URL</Label>
                          <Input id="site-url" defaultValue="https://yourdomain.com" />
                        </div>
                        <div>
                          <Label htmlFor="admin-email">Admin Email</Label>
                          <Input id="admin-email" type="email" defaultValue="admin@yourdomain.com" />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="maintenance" />
                          <Label htmlFor="maintenance">Maintenance Mode</Label>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="timezone">Timezone</Label>
                          <Select defaultValue="utc">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="utc">UTC</SelectItem>
                              <SelectItem value="est">EST</SelectItem>
                              <SelectItem value="pst">PST</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="default-currency">Default Currency</Label>
                          <Select defaultValue="usd">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="usd">USD</SelectItem>
                              <SelectItem value="eur">EUR</SelectItem>
                              <SelectItem value="btc">BTC</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="email-verification" defaultChecked />
                          <Label htmlFor="email-verification">Require Email Verification</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="kyc-required" />
                          <Label htmlFor="kyc-required">KYC Required</Label>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="currencies" className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium">Supported Currencies</h3>
                        <Button>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Currency
                        </Button>
                      </div>
                      <div className="border rounded-lg">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Currency</TableHead>
                              <TableHead>Symbol</TableHead>
                              <TableHead>Rate (USD)</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell className="font-medium">US Dollar</TableCell>
                              <TableCell>USD</TableCell>
                              <TableCell>1.00</TableCell>
                              <TableCell>
                                <Badge>Active</Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <Button variant="ghost" size="sm">Edit</Button>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Bitcoin</TableCell>
                              <TableCell>BTC</TableCell>
                              <TableCell>45,000.00</TableCell>
                              <TableCell>
                                <Badge>Active</Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <Button variant="ghost" size="sm">Edit</Button>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="limits" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Deposit Limits</h3>
                        <div>
                          <Label htmlFor="min-deposit">Minimum Deposit ($)</Label>
                          <Input id="min-deposit" type="number" defaultValue="10" />
                        </div>
                        <div>
                          <Label htmlFor="max-deposit">Maximum Deposit ($)</Label>
                          <Input id="max-deposit" type="number" defaultValue="10000" />
                        </div>
                        <div>
                          <Label htmlFor="deposit-fee">Deposit Fee (%)</Label>
                          <Input id="deposit-fee" type="number" defaultValue="0" />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Withdrawal Limits</h3>
                        <div>
                          <Label htmlFor="min-withdrawal">Minimum Withdrawal ($)</Label>
                          <Input id="min-withdrawal" type="number" defaultValue="10" />
                        </div>
                        <div>
                          <Label htmlFor="max-withdrawal">Maximum Withdrawal ($)</Label>
                          <Input id="max-withdrawal" type="number" defaultValue="5000" />
                        </div>
                        <div>
                          <Label htmlFor="withdrawal-fee">Withdrawal Fee (%)</Label>
                          <Input id="withdrawal-fee" type="number" defaultValue="2" />
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="scripts" className="space-y-4">
                    <div className="space-y-6">
                      <div>
                        <Label htmlFor="google-analytics">Google Analytics Tracking ID</Label>
                        <Input id="google-analytics" placeholder="GA-XXXXXXXXX-X" />
                        <p className="text-sm text-muted-foreground mt-1">
                          Enter your Google Analytics tracking ID to enable analytics
                        </p>
                      </div>
                      <div>
                        <Label htmlFor="header-scripts">Header Scripts</Label>
                        <Textarea 
                          id="header-scripts" 
                          placeholder="<!-- Custom header scripts -->"
                          className="min-h-[100px]"
                        />
                        <p className="text-sm text-muted-foreground mt-1">
                          Scripts added here will be inserted in the HTML head section
                        </p>
                      </div>
                      <div>
                        <Label htmlFor="footer-scripts">Footer Scripts</Label>
                        <Textarea 
                          id="footer-scripts" 
                          placeholder="<!-- Custom footer scripts -->"
                          className="min-h-[100px]"
                        />
                        <p className="text-sm text-muted-foreground mt-1">
                          Scripts added here will be inserted before the closing body tag
                        </p>
                      </div>
                      <Button>Save Script Settings</Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
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

      {/* Enhanced Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-sidebar-background border-r border-sidebar-border transform transition-all duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center">
              <Shield className="h-4 w-4 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold text-sidebar-foreground">HyipPro</h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden text-sidebar-foreground hover:bg-sidebar-accent"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <nav className="p-4 space-y-1">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                activeTab === item.id 
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-sm' 
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-4 left-4 right-4 space-y-2">
          <div className="px-4 py-3 bg-sidebar-accent rounded-lg">
            <p className="text-xs text-sidebar-accent-foreground mb-1">Logged in as</p>
            <p className="text-sm font-medium text-sidebar-accent-foreground truncate">{user?.email}</p>
          </div>
          <Button
            onClick={signOut}
            variant="outline"
            className="w-full bg-transparent border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent"
          >
            Sign Out
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Enhanced Header */}
        <header className="h-16 bg-card border-b flex items-center justify-between px-6 shadow-sm">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-4 w-4" />
            </Button>
            <div>
              <h2 className="text-lg font-semibold">
                {navigationItems.find(item => item.id === activeTab)?.label}
              </h2>
              <p className="text-sm text-muted-foreground">
                {activeTab === 'dashboard' && 'Overview of your platform'}
                {activeTab === 'users' && 'Manage platform users'}
                {activeTab === 'investments' && 'Configure investment packages'}
                {activeTab === 'payments' && 'Monitor financial transactions'}
                {activeTab === 'referrals' && 'Manage referral system'}
                {activeTab === 'settings' && 'Platform configuration'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                {user?.email?.charAt(0).toUpperCase()}
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium">{user?.email}</p>
                <p className="text-xs text-muted-foreground">Administrator</p>
              </div>
            </div>
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