import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { 
  Mail, 
  Package, 
  Calendar, 
  Briefcase, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  AlertTriangle,
  Settings,
  LogOut
} from 'lucide-react';
import { ChatInterface } from './ChatInterface';

interface DashboardProps {
  onCategorySelect: (category: string, query: string) => void;
  onLogout: () => void;
}

export function Dashboard({ onCategorySelect, onLogout }: DashboardProps) {
  const stats = [
    { 
      title: 'Total Emails', 
      value: '2,139', 
      change: '+12%', 
      icon: Mail,
      description: 'Last 30 days'
    },
    { 
      title: 'Packages Tracked', 
      value: '8', 
      change: '+3', 
      icon: Package,
      description: '3 arriving today'
    },
    { 
      title: 'Upcoming Events', 
      value: '12', 
      change: '2 today', 
      icon: Calendar,
      description: 'Next 7 days'
    },
    { 
      title: 'Pending Tasks', 
      value: '5', 
      change: '-2', 
      icon: Briefcase,
      description: 'Action required'
    }
  ];

  const recentActivity = [
    {
      id: '1',
      type: 'package',
      message: 'Amazon package delivered to front door',
      time: '2 hours ago',
      status: 'completed'
    },
    {
      id: '2',
      type: 'event',
      message: 'Meeting reminder: Team standup in 30 minutes',
      time: '30 minutes ago',
      status: 'pending'
    },
    {
      id: '3',
      type: 'interview',
      message: 'New interview invitation from TechCorp',
      time: '4 hours ago',
      status: 'action_required'
    },
    {
      id: '4',
      type: 'receipt',
      message: 'Monthly subscription payment confirmed',
      time: '1 day ago',
      status: 'completed'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'package': return Package;
      case 'event': return Calendar;
      case 'interview': return Briefcase;
      case 'receipt': return Mail;
      default: return Mail;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600';
      case 'pending': return 'text-blue-600';
      case 'action_required': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'pending': return Clock;
      case 'action_required': return AlertTriangle;
      default: return Clock;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-2">
              <Mail className="h-6 w-6 text-blue-600" />
              <h1>Briefly.AI</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="ghost" size="sm" onClick={onLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <Card key={stat.title}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">{stat.title}</p>
                          <p className="text-2xl font-semibold">{stat.value}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <TrendingUp className="h-3 w-3 text-green-600" />
                            <span className="text-xs text-green-600">{stat.change}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                        </div>
                        <Icon className="h-8 w-8 text-blue-600 opacity-60" />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Chat Interface */}
            <ChatInterface onCategorySelect={onCategorySelect} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Insights */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Insights</CardTitle>
                <CardDescription>AI-powered email analysis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Package className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium">3 packages arriving today</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    MacBook Pro, Wireless headphones, and 1 more
                  </p>
                </div>
                
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium">Team meeting in 30 min</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Weekly standup via Zoom
                  </p>
                </div>
                
                <div className="p-3 bg-orange-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertTriangle className="h-4 w-4 text-orange-600" />
                    <span className="text-sm font-medium">Interview follow-up needed</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Send thank you note to TechCorp
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest email insights</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => {
                    const ActivityIcon = getActivityIcon(activity.type);
                    const StatusIcon = getStatusIcon(activity.status);
                    return (
                      <div key={activity.id}>
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0">
                            <ActivityIcon className="h-4 w-4 text-gray-600 mt-0.5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm">{activity.message}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <StatusIcon className={`h-3 w-3 ${getStatusColor(activity.status)}`} />
                              <span className="text-xs text-muted-foreground">
                                {activity.time}
                              </span>
                            </div>
                          </div>
                        </div>
                        {index < recentActivity.length - 1 && (
                          <Separator className="my-3" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}