import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowLeft, Package, Calendar, Clock, MapPin, ExternalLink, BarChart3, TrendingUp, Mail, Users, AlertCircle } from 'lucide-react';
import { EmailSummaryView } from './EmailSummaryView';

interface Email {
  id: string;
  subject: string;
  sender: string;
  date: string;
  summary: string;
  category: string;
  metadata?: {
    trackingNumber?: string;
    deliveryDate?: string;
    eventDate?: string;
    location?: string;
    status?: string;
  };
}

interface EmailResultsScreenProps {
  category: string;
  query: string;
  onBack: () => void;
}

const mockResults: Record<string, Email[]> = {
  packages: [
    {
      id: '1',
      subject: 'Your Amazon order has shipped',
      sender: 'shipment-tracking@amazon.com',
      date: '2024-01-15',
      summary: 'PlayStation 5 Console shipped via UPS, expected delivery January 17th',
      category: 'Package Delivery',
      metadata: {
        trackingNumber: '1Z999AA1234567890',
        deliveryDate: 'January 17, 2024',
        status: 'In Transit'
      }
    },
    {
      id: '2',
      subject: 'Package delivered - Amazon',
      sender: 'shipment-tracking@amazon.com',
      date: '2024-01-14',
      summary: 'Wireless headphones delivered to front door at 2:45 PM',
      category: 'Package Delivery',
      metadata: {
        trackingNumber: '1Z999AA1234567891',
        deliveryDate: 'January 14, 2024',
        status: 'Delivered'
      }
    },
    {
      id: '3',
      subject: 'Out for delivery - Best Buy',
      sender: 'orders@bestbuy.com',
      date: '2024-01-16',
      summary: 'MacBook Pro M3 out for delivery, will arrive today before 8 PM',
      category: 'Package Delivery',
      metadata: {
        trackingNumber: 'BB123456789',
        deliveryDate: 'January 16, 2024',
        status: 'Out for Delivery'
      }
    }
  ],
  events: [
    {
      id: '4',
      subject: 'Dentist Appointment Reminder',
      sender: 'appointments@smiledental.com',
      date: '2024-01-14',
      summary: 'Dental cleaning appointment scheduled for January 18th at 2:00 PM',
      category: 'Medical Appointment',
      metadata: {
        eventDate: 'January 18, 2024 at 2:00 PM',
        location: 'Smile Dental Clinic, 123 Main St'
      }
    },
    {
      id: '5',
      subject: 'Team Meeting Tomorrow',
      sender: 'sarah@company.com',
      date: '2024-01-15',
      summary: 'Weekly team standup meeting tomorrow at 10 AM via Zoom',
      category: 'Work Meeting',
      metadata: {
        eventDate: 'January 16, 2024 at 10:00 AM',
        location: 'Zoom (link in calendar)'
      }
    },
    {
      id: '6',
      subject: 'Concert Tickets - Reminder',
      sender: 'tickets@ticketmaster.com',
      date: '2024-01-10',
      summary: 'The Weeknd concert at Madison Square Garden this Saturday at 8 PM',
      category: 'Entertainment',
      metadata: {
        eventDate: 'January 20, 2024 at 8:00 PM',
        location: 'Madison Square Garden, New York'
      }
    }
  ],
  interviews: [
    {
      id: '7',
      subject: 'Interview Confirmation - Software Engineer',
      sender: 'hr@techcorp.com',
      date: '2024-01-12',
      summary: 'Final round interview scheduled for January 19th at 3 PM with engineering team',
      category: 'Job Interview',
      metadata: {
        eventDate: 'January 19, 2024 at 3:00 PM',
        location: 'TechCorp HQ, 456 Tech Ave'
      }
    },
    {
      id: '8',
      subject: 'Thank you for your application',
      sender: 'careers@startup.io',
      date: '2024-01-11',
      summary: 'Application received for Product Manager role, expect response within 1-2 weeks',
      category: 'Job Application',
      metadata: {
        status: 'Under Review'
      }
    }
  ],
  summary12h: [
    {
      id: 'summary-12h',
      subject: '12-Hour Email Summary',
      sender: 'AI Assistant',
      date: new Date().toISOString().split('T')[0],
      summary: 'Here\'s your personalized summary of emails received in the last 12 hours',
      category: 'Email Summary'
    }
  ],
  summary24h: [
    {
      id: 'summary-24h',
      subject: '24-Hour Email Summary', 
      sender: 'AI Assistant',
      date: new Date().toISOString().split('T')[0],
      summary: 'Here\'s your personalized summary of emails received in the last 24 hours',
      category: 'Email Summary'
    }
  ]
};

export function EmailResultsScreen({ category, query, onBack }: EmailResultsScreenProps) {
  const results = mockResults[category] || [];
  
  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'packages': return Package;
      case 'events': return Calendar;
      case 'interviews': return Clock;
      case 'summary12h': return Clock;
      case 'summary24h': return BarChart3;
      default: return Clock;
    }
  };

  const getCategoryTitle = (cat: string) => {
    switch (cat) {
      case 'packages': return 'Package Deliveries';
      case 'events': return 'Upcoming Events';
      case 'interviews': return 'Job Interviews';
      case 'summary12h': return '12-Hour Email Summary';
      case 'summary24h': return '24-Hour Email Summary';
      default: return 'Email Results';
    }
  };

  const getCategorySummary = (cat: string) => {
    switch (cat) {
      case 'packages': 
        const inTransit = results.filter(r => r.metadata?.status === 'In Transit' || r.metadata?.status === 'Out for Delivery').length;
        return `${inTransit} package${inTransit !== 1 ? 's' : ''} arriving soon`;
      case 'events':
        return `${results.length} upcoming event${results.length !== 1 ? 's' : ''} found`;
      case 'interviews':
        return `${results.length} interview-related email${results.length !== 1 ? 's' : ''} found`;
      case 'summary12h':
        return 'Last 12 hours analyzed';
      case 'summary24h':
        return 'Last 24 hours analyzed';
      default:
        return `${results.length} result${results.length !== 1 ? 's' : ''} found`;
    }
  };

  const Icon = getCategoryIcon(category);

  // Check if this is a summary view
  if (category === 'summary12h' || category === 'summary24h') {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" onClick={onBack} className="p-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2">
            <Icon className="h-5 w-5 text-blue-600" />
            <h2>{getCategoryTitle(category)}</h2>
          </div>
        </div>

        <EmailSummaryView timeframe={category === 'summary12h' ? '12h' : '24h'} />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Button variant="ghost" onClick={onBack} className="p-2">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5 text-blue-600" />
          <h2>{getCategoryTitle(category)}</h2>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Search Results</span>
            <Badge variant="secondary">{getCategorySummary(category)}</Badge>
          </CardTitle>
          <p className="text-sm text-muted-foreground">"{query}"</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {results.map((email) => (
              <Card key={email.id} className="border-l-4 border-l-blue-500">
                <CardContent className="pt-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h4 className="font-medium">{email.subject}</h4>
                        <p className="text-sm text-muted-foreground">
                          From: {email.sender} • {email.date}
                        </p>
                      </div>
                      <Badge variant="outline">{email.category}</Badge>
                    </div>
                    
                    <p className="text-sm">{email.summary}</p>
                    
                    {email.metadata && (
                      <div className="bg-gray-50 p-3 rounded-lg space-y-2">
                        {email.metadata.trackingNumber && (
                          <div className="flex items-center gap-2 text-sm">
                            <Package className="h-3 w-3" />
                            <span>Tracking: {email.metadata.trackingNumber}</span>
                          </div>
                        )}
                        {email.metadata.deliveryDate && (
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-3 w-3" />
                            <span>Delivery: {email.metadata.deliveryDate}</span>
                          </div>
                        )}
                        {email.metadata.eventDate && (
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-3 w-3" />
                            <span>{email.metadata.eventDate}</span>
                          </div>
                        )}
                        {email.metadata.location && (
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="h-3 w-3" />
                            <span>{email.metadata.location}</span>
                          </div>
                        )}
                        {email.metadata.status && (
                          <div className="flex items-center gap-2">
                            <Badge 
                              variant={email.metadata.status === 'Delivered' ? 'default' : 'secondary'}
                              className="text-xs"
                            >
                              {email.metadata.status}
                            </Badge>
                          </div>
                        )}
                      </div>
                    )}
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        View Email
                      </Button>
                      {email.metadata?.trackingNumber && (
                        <Button variant="outline" size="sm">
                          Track Package
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}