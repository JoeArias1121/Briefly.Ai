import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  BarChart3, 
  Clock, 
  TrendingUp, 
  Mail, 
  Package, 
  Calendar, 
  Users, 
  AlertCircle,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

interface EmailSummaryViewProps {
  timeframe: '12h' | '24h';
}

export function EmailSummaryView({ timeframe }: EmailSummaryViewProps) {
  const isLast24Hours = timeframe === '24h';
  
  const summaryData = {
    totalEmails: isLast24Hours ? 47 : 23,
    importantEmails: isLast24Hours ? 8 : 4,
    packagesTracked: isLast24Hours ? 3 : 2,
    eventsFound: isLast24Hours ? 5 : 2,
    unreadCount: isLast24Hours ? 12 : 6,
    topSenders: isLast24Hours ? ['Amazon', 'Work Team', 'Bank', 'Netflix', 'LinkedIn'] : ['Amazon', 'Work Team', 'Bank']
  };

  const highlights = isLast24Hours ? [
    {
      type: 'package',
      icon: Package,
      title: '3 Package Updates',
      description: 'MacBook Pro arriving today, 2 Amazon deliveries in transit',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      action: 'View Details'
    },
    {
      type: 'event',
      icon: Calendar,
      title: '5 Upcoming Events',
      description: 'Team meeting in 2 hours, dentist appointment tomorrow',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      action: 'View Calendar'
    },
    {
      type: 'important',
      icon: AlertCircle,
      title: '8 Important Emails',
      description: 'Interview follow-up, bank notification, project deadline reminder',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      action: 'Review Now'
    },
    {
      type: 'work',
      icon: Users,
      title: '12 Work Communications',
      description: 'Project updates, meeting invites, team announcements',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      action: 'Open Workspace'
    }
  ] : [
    {
      type: 'package',
      icon: Package,
      title: '2 Package Updates',
      description: 'MacBook Pro out for delivery, Amazon package delivered',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      action: 'View Details'
    },
    {
      type: 'event',
      icon: Calendar,
      title: '2 Upcoming Events',
      description: 'Team meeting in 2 hours, doctor appointment reminder',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      action: 'View Calendar'
    },
    {
      type: 'important',
      icon: AlertCircle,
      title: '4 Important Emails',
      description: 'Interview confirmation, project deadline, bank alert',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      action: 'Review Now'
    }
  ];

  const categoryBreakdown = isLast24Hours ? [
    { name: 'Work & Business', count: 15, percentage: 32 },
    { name: 'Shopping & Orders', count: 8, percentage: 17 },
    { name: 'Personal', count: 7, percentage: 15 },
    { name: 'Newsletters', count: 6, percentage: 13 },
    { name: 'Social & Updates', count: 5, percentage: 11 },
    { name: 'Bills & Finance', count: 4, percentage: 8 },
    { name: 'Other', count: 2, percentage: 4 }
  ] : [
    { name: 'Work & Business', count: 8, percentage: 35 },
    { name: 'Shopping & Orders', count: 4, percentage: 17 },
    { name: 'Personal', count: 3, percentage: 13 },
    { name: 'Newsletters', count: 3, percentage: 13 },
    { name: 'Social & Updates', count: 3, percentage: 13 },
    { name: 'Bills & Finance', count: 2, percentage: 9 }
  ];

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Mail className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-semibold">{summaryData.totalEmails}</p>
            <p className="text-sm text-muted-foreground">Total Emails</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <AlertCircle className="h-6 w-6 text-red-600 mx-auto mb-2" />
            <p className="text-2xl font-semibold">{summaryData.importantEmails}</p>
            <p className="text-sm text-muted-foreground">Important</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Package className="h-6 w-6 text-orange-600 mx-auto mb-2" />
            <p className="text-2xl font-semibold">{summaryData.packagesTracked}</p>
            <p className="text-sm text-muted-foreground">Packages</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Calendar className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-semibold">{summaryData.eventsFound}</p>
            <p className="text-sm text-muted-foreground">Events</p>
          </CardContent>
        </Card>
      </div>

      {/* Summary Text */}
      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground leading-relaxed">
            {isLast24Hours 
              ? `In the past 24 hours, you received ${summaryData.totalEmails} emails with significant activity across multiple categories. Your MacBook Pro order is out for delivery and should arrive today, while two Amazon packages are currently in transit. You have ${summaryData.eventsFound} upcoming events including a team meeting in 2 hours and a dentist appointment tomorrow. Work communications dominated your inbox with 15 emails including project updates, meeting invitations, and team announcements. Banking and financial notifications require attention, including important security alerts and payment confirmations. Additionally, you received several newsletters and social updates that can be reviewed when convenient.`
              : `Over the last 12 hours, you received ${summaryData.totalEmails} emails with focused activity in key areas. Your MacBook Pro package is out for delivery and expected to arrive today, with one additional Amazon delivery confirmed. You have 2 important upcoming events: a team meeting scheduled in 2 hours and a doctor appointment reminder. Work-related emails made up the majority of communications with 8 messages including project deadlines, collaboration requests, and meeting confirmations. A few important personal emails require attention, including banking notifications and interview follow-ups that need prompt responses.`
            }
          </p>
        </CardContent>
      </Card>

      {/* Key Highlights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            Key Highlights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {highlights.map((highlight) => {
              const Icon = highlight.icon;
              return (
                <div 
                  key={highlight.type}
                  className={`p-4 rounded-lg ${highlight.bgColor} border-l-4 border-l-current ${highlight.color}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <Icon className={`h-5 w-5 ${highlight.color} mt-0.5`} />
                      <div>
                        <h4 className="font-medium">{highlight.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {highlight.description}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      {highlight.action}
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Category Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            Email Categories
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {categoryBreakdown.map((category) => (
              <div key={category.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-32">
                    <p className="text-sm font-medium">{category.name}</p>
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-2 min-w-0">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">{category.count}</span>
                  <Badge variant="secondary" className="text-xs">
                    {category.percentage}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Senders */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-600" />
            Top Senders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {summaryData.topSenders.map((sender, index) => (
              <Badge key={sender} variant="outline" className="text-sm">
                #{index + 1} {sender}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <Button variant="outline" className="h-auto p-3 justify-start">
              <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
              <span className="text-sm">Mark All Read</span>
            </Button>
            <Button variant="outline" className="h-auto p-3 justify-start">
              <Package className="h-4 w-4 mr-2 text-orange-600" />
              <span className="text-sm">Track Packages</span>
            </Button>
            <Button variant="outline" className="h-auto p-3 justify-start">
              <Calendar className="h-4 w-4 mr-2 text-blue-600" />
              <span className="text-sm">View Calendar</span>
            </Button>
            <Button variant="outline" className="h-auto p-3 justify-start">
              <AlertCircle className="h-4 w-4 mr-2 text-red-600" />
              <span className="text-sm">Review Important</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}