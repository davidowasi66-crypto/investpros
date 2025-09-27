import React, { useState, useEffect } from 'react';
import { X, CheckCircle, DollarSign, Globe, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Notification {
  id: string;
  type: 'withdrawal' | 'investment';
  amount: number;
  username: string;
  country: string;
  timestamp: Date;
}

interface NotificationItemProps {
  notification: Notification;
  onClose: (id: string) => void;
}

const countries = [
  'Nigeria', 'Brazil', 'India', 'Philippines', 'Kenya', 'South Africa',
  'Indonesia', 'Mexico', 'Thailand', 'Vietnam', 'Bangladesh', 'Pakistan',
  'Egypt', 'Turkey', 'Malaysia', 'Ukraine', 'Colombia', 'Argentina',
  'Peru', 'Ghana', 'Morocco', 'Romania', 'Poland', 'Chile'
];

const generateUsername = () => {
  const firstNames = ['Alex', 'Maria', 'John', 'Sarah', 'David', 'Lisa', 'Mike', 'Anna', 'Carlos', 'Elena', 'James', 'Sofia'];
  const lastNames = ['Smith', 'Johnson', 'Brown', 'Davis', 'Wilson', 'Garcia', 'Martinez', 'Anderson', 'Taylor', 'Thomas'];
  
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  
  return `${firstName} ${lastName}`;
};

const hashUsername = (username: string) => {
  const [first, last] = username.split(' ');
  const hashedFirst = first.charAt(0) + '*'.repeat(first.length - 1);
  const hashedLast = last.charAt(0) + '*'.repeat(Math.max(0, last.length - 1));
  return `${hashedFirst} ${hashedLast}`;
};

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Auto-close after 8 seconds
    const timer = setTimeout(() => {
      handleClose();
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => {
      onClose(notification.id);
    }, 300);
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const timeAgo = () => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - notification.timestamp.getTime()) / 1000);
    
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return `${Math.floor(diff / 3600)}h ago`;
  };

  return (
    <div
      className={`
        transform transition-all duration-300 ease-out
        ${isVisible && !isLeaving ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
        bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700
        p-4 mb-3 max-w-sm w-full
        hover:shadow-xl transition-shadow duration-200
      `}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <div className={`
            p-2 rounded-full flex-shrink-0
            ${notification.type === 'withdrawal' 
              ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400' 
              : 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400'
            }
          `}>
            {notification.type === 'withdrawal' ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <DollarSign className="h-4 w-4" />
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <Badge 
                variant={notification.type === 'withdrawal' ? 'default' : 'secondary'}
                className="text-xs"
              >
                {notification.type === 'withdrawal' ? '✅ Withdrawal' : '💰 Investment'}
              </Badge>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {timeAgo()}
              </span>
            </div>
            
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">
              {notification.type === 'withdrawal' ? 'Withdrawal Successful' : 'New Investment'}
            </p>
            
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 dark:text-gray-300">💸</span>
                <span className="font-bold text-lg text-green-600 dark:text-green-400">
                  {formatAmount(notification.amount)}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Users className="h-3 w-3 text-gray-400" />
                <span className="text-xs text-gray-600 dark:text-gray-400 font-mono">
                  🔒 {hashUsername(notification.username)}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Globe className="h-3 w-3 text-gray-400" />
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  🌍 {notification.country}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClose}
          className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600 flex-shrink-0"
        >
          <X className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};

const NotificationSystem: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const generateNotification = (): Notification => {
    const isWithdrawal = Math.random() > 0.4; // 60% chance for withdrawal
    const amount = isWithdrawal 
      ? Math.floor(Math.random() * 5000) + 100 // $100-$5100 for withdrawals
      : Math.floor(Math.random() * 10000) + 500; // $500-$10500 for investments
    
    return {
      id: Math.random().toString(36).substr(2, 9),
      type: isWithdrawal ? 'withdrawal' : 'investment',
      amount,
      username: generateUsername(),
      country: countries[Math.floor(Math.random() * countries.length)],
      timestamp: new Date(),
    };
  };

  const addNotification = () => {
    const newNotification = generateNotification();
    setNotifications(prev => [newNotification, ...prev.slice(0, 4)]); // Keep max 5 notifications
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  useEffect(() => {
    // Add initial notification after 2 seconds
    const initialTimer = setTimeout(() => {
      addNotification();
    }, 2000);

    // Add notifications at random intervals between 8-25 seconds
    const intervalId = setInterval(() => {
      if (Math.random() > 0.3) { // 70% chance to show notification
        addNotification();
      }
    }, Math.random() * 17000 + 8000); // 8-25 seconds

    return () => {
      clearTimeout(initialTimer);
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 pointer-events-none">
      <div className="space-y-2 pointer-events-auto">
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onClose={removeNotification}
          />
        ))}
      </div>
    </div>
  );
};

export default NotificationSystem;