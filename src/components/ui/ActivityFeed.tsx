import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, Globe, Clock, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Activity {
  id: string;
  type: 'withdrawal' | 'investment' | 'signup';
  amount?: number;
  username: string;
  country: string;
  timestamp: Date;
}

const countries = [
  { name: 'Nigeria', flag: '🇳🇬' },
  { name: 'Brazil', flag: '🇧🇷' },
  { name: 'India', flag: '🇮🇳' },
  { name: 'Philippines', flag: '🇵🇭' },
  { name: 'Kenya', flag: '🇰🇪' },
  { name: 'South Africa', flag: '🇿🇦' },
  { name: 'Indonesia', flag: '🇮🇩' },
  { name: 'Mexico', flag: '🇲🇽' },
  { name: 'Thailand', flag: '🇹🇭' },
  { name: 'Vietnam', flag: '🇻🇳' },
  { name: 'Bangladesh', flag: '🇧🇩' },
  { name: 'Pakistan', flag: '🇵🇰' },
  { name: 'Egypt', flag: '🇪🇬' },
  { name: 'Turkey', flag: '🇹🇷' },
  { name: 'Malaysia', flag: '🇲🇾' },
  { name: 'Ukraine', flag: '🇺🇦' },
  { name: 'Colombia', flag: '🇨🇴' },
  { name: 'Argentina', flag: '🇦🇷' },
  { name: 'Peru', flag: '🇵🇪' },
  { name: 'Ghana', flag: '🇬🇭' }
];

const generateUsername = () => {
  const firstNames = ['Alex', 'Maria', 'John', 'Sarah', 'David', 'Lisa', 'Mike', 'Anna', 'Carlos', 'Elena', 'James', 'Sofia', 'Robert', 'Emma', 'Daniel', 'Grace'];
  const lastNames = ['Smith', 'Johnson', 'Brown', 'Davis', 'Wilson', 'Garcia', 'Martinez', 'Anderson', 'Taylor', 'Thomas', 'Moore', 'Jackson', 'Martin', 'Lee', 'Clark'];
  
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  
  return `${firstName} ${lastName}`;
};

const hashUsername = (username: string) => {
  const [first, last] = username.split(' ');
  const hashedFirst = first.charAt(0) + '*'.repeat(Math.min(3, first.length - 1));
  const hashedLast = last.charAt(0) + '*'.repeat(Math.min(4, last.length - 1));
  return `${hashedFirst} ${hashedLast}`;
};

const ActivityFeed: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);

  const generateActivity = (): Activity => {
    const types = ['withdrawal', 'investment', 'signup'] as const;
    const type = types[Math.floor(Math.random() * types.length)];
    const country = countries[Math.floor(Math.random() * countries.length)];
    
    let amount: number | undefined;
    if (type === 'withdrawal') {
      amount = Math.floor(Math.random() * 4500) + 100; // $100-$4600
    } else if (type === 'investment') {
      amount = Math.floor(Math.random() * 9500) + 500; // $500-$10000
    }
    
    return {
      id: Math.random().toString(36).substr(2, 9),
      type,
      amount,
      username: generateUsername(),
      country: country.name,
      timestamp: new Date(Date.now() - Math.random() * 300000), // Within last 5 minutes
    };
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'withdrawal':
        return '💸';
      case 'investment':
        return '💰';
      case 'signup':
        return '👤';
      default:
        return '📈';
    }
  };

  const getActivityText = (activity: Activity) => {
    switch (activity.type) {
      case 'withdrawal':
        return `withdrew ${formatAmount(activity.amount!)}`;
      case 'investment':
        return `invested ${formatAmount(activity.amount!)}`;
      case 'signup':
        return 'joined the platform';
      default:
        return 'performed an action';
    }
  };

  const timeAgo = (date: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return `${Math.floor(diff / 3600)}h ago`;
  };

  const getCountryFlag = (countryName: string) => {
    const country = countries.find(c => c.name === countryName);
    return country?.flag || '🌍';
  };

  useEffect(() => {
    // Generate initial activities
    const initialActivities = Array.from({ length: 8 }, generateActivity)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    setActivities(initialActivities);

    // Add new activities periodically
    const intervalId = setInterval(() => {
      if (Math.random() > 0.4) { // 60% chance
        const newActivity = generateActivity();
        setActivities(prev => [newActivity, ...prev.slice(0, 19)]); // Keep max 20 activities
      }
    }, Math.random() * 12000 + 5000); // 5-17 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Live Activity Feed
          </CardTitle>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            Live
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 max-h-80 overflow-y-auto">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className={`
              flex items-center justify-between p-3 rounded-lg border border-gray-100 dark:border-gray-800
              bg-gradient-to-r from-white to-gray-50 dark:from-gray-900 dark:to-gray-800
              hover:shadow-sm transition-all duration-200
              ${index === 0 ? 'ring-2 ring-primary/20 bg-primary/5' : ''}
              animate-fade-in
            `}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              <div className="text-lg">{getActivityIcon(activity.type)}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100 font-mono">
                    {hashUsername(activity.username)}
                  </span>
                  <div className="flex items-center space-x-1">
                    <span className="text-sm">{getCountryFlag(activity.country)}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {activity.country}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {getActivityText(activity)}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end space-y-1">
              <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                <Clock className="h-3 w-3" />
                <span>{timeAgo(activity.timestamp)}</span>
              </div>
              {activity.amount && (
                <Badge 
                  variant={activity.type === 'withdrawal' ? 'default' : 'secondary'}
                  className="text-xs"
                >
                  {formatAmount(activity.amount)}
                </Badge>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ActivityFeed;