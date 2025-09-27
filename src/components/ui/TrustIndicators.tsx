import React, { useState, useEffect } from 'react';
import { Shield, Users, Globe, TrendingUp, Clock, Star, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface TrustMetric {
  label: string;
  value: string;
  icon: React.ReactNode;
  trend?: string;
  color: string;
}

const TrustIndicators: React.FC = () => {
  const [metrics, setMetrics] = useState<TrustMetric[]>([]);
  const [onlineUsers, setOnlineUsers] = useState(0);
  const [totalPayouts, setTotalPayouts] = useState(0);

  const generateMetrics = () => {
    const baseOnlineUsers = 1247 + Math.floor(Math.random() * 50);
    const baseTotalPayouts = 2840000 + Math.floor(Math.random() * 5000);
    
    setOnlineUsers(baseOnlineUsers);
    setTotalPayouts(baseTotalPayouts);

    const newMetrics: TrustMetric[] = [
      {
        label: 'Users Online',
        value: baseOnlineUsers.toLocaleString(),
        icon: <Users className="h-4 w-4" />,
        trend: '+12',
        color: 'text-green-600'
      },
      {
        label: 'Total Payouts',
        value: `$${(baseTotalPayouts / 1000000).toFixed(2)}M`,
        icon: <TrendingUp className="h-4 w-4" />,
        trend: '+$15K',
        color: 'text-blue-600'
      },
      {
        label: 'Countries',
        value: '195+',
        icon: <Globe className="h-4 w-4" />,
        color: 'text-purple-600'
      },
      {
        label: 'Uptime',
        value: '99.9%',
        icon: <Shield className="h-4 w-4" />,
        color: 'text-emerald-600'
      },
      {
        label: 'Trust Score',
        value: '4.9/5',
        icon: <Star className="h-4 w-4" />,
        color: 'text-yellow-600'
      },
      {
        label: 'Verified',
        value: 'SSL Secured',
        icon: <CheckCircle className="h-4 w-4" />,
        color: 'text-green-600'
      }
    ];

    setMetrics(newMetrics);
  };

  useEffect(() => {
    generateMetrics();
    
    // Update metrics every 30 seconds
    const intervalId = setInterval(() => {
      generateMetrics();
    }, 30000);

    return () => clearInterval(intervalId);
  }, []);

  const formatUptime = () => {
    const days = Math.floor(Math.random() * 30) + 365; // 365+ days
    return `${days} days`;
  };

  return (
    <div className="space-y-4">
      {/* Main Trust Indicators */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {metrics.map((metric, index) => (
          <Card 
            key={metric.label} 
            className="border-l-4 border-l-primary/20 hover:border-l-primary transition-all duration-300 hover:shadow-md"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardContent className="p-3">
              <div className="flex items-center space-x-2 mb-1">
                <div className={`${metric.color}`}>
                  {metric.icon}
                </div>
                <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                  {metric.label}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-gray-900 dark:text-gray-100">
                  {metric.value}
                </span>
                {metric.trend && (
                  <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                    {metric.trend}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Security Badges */}
      <div className="flex flex-wrap items-center justify-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-lg border">
        <div className="flex items-center space-x-2">
          <Shield className="h-5 w-5 text-green-600" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">SSL Protected</span>
        </div>
        <div className="flex items-center space-x-2">
          <CheckCircle className="h-5 w-5 text-blue-600" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">DDOS Protected</span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="h-5 w-5 text-purple-600" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Uptime: {formatUptime()}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Star className="h-5 w-5 text-yellow-600" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">5-Star Rated</span>
        </div>
      </div>

      {/* Live Stats Bar */}
      <div className="bg-primary/10 border border-primary/20 rounded-lg p-3">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-gray-700 dark:text-gray-300">
                <span className="font-bold">{onlineUsers.toLocaleString()}</span> users online
              </span>
            </div>
            <div className="hidden sm:flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-gray-700 dark:text-gray-300">
                <span className="font-bold">${totalPayouts.toLocaleString()}</span> total paid
              </span>
            </div>
          </div>
          <Badge className="bg-green-100 text-green-800 border-green-200">
            🔒 Secure Platform
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default TrustIndicators;