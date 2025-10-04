import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Send, Package, Calendar, Briefcase, FileText, ShoppingBag, Plane, Clock, BarChart3 } from 'lucide-react';

interface ChatInterfaceProps {
  onCategorySelect: (category: string, query: string) => void;
}

const categories = [
  { id: 'packages', label: 'Amazon Packages', icon: Package, color: 'bg-orange-100 text-orange-700 hover:bg-orange-200' },
  { id: 'events', label: 'Upcoming Events', icon: Calendar, color: 'bg-blue-100 text-blue-700 hover:bg-blue-200' },
  { id: 'interviews', label: 'Job Interviews', icon: Briefcase, color: 'bg-green-100 text-green-700 hover:bg-green-200' },
  { id: 'receipts', label: 'Receipts & Bills', icon: FileText, color: 'bg-purple-100 text-purple-700 hover:bg-purple-200' },
  { id: 'shopping', label: 'Shopping & Deals', icon: ShoppingBag, color: 'bg-pink-100 text-pink-700 hover:bg-pink-200' },
  { id: 'travel', label: 'Travel & Bookings', icon: Plane, color: 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200' },
];

const summaryOptions = [
  { id: 'summary12h', label: '12-Hour Summary', icon: Clock, color: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' },
  { id: 'summary24h', label: '24-Hour Summary', icon: BarChart3, color: 'bg-teal-100 text-teal-700 hover:bg-teal-200' },
];

export function ChatInterface({ onCategorySelect }: ChatInterfaceProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onCategorySelect('custom', query);
      setQuery('');
    }
  };

  const handleCategoryClick = (category: typeof categories[0]) => {
    const queries = {
      packages: 'Show me all my Amazon package deliveries and their status',
      events: 'Find upcoming events, meetings, and appointments in my emails',
      interviews: 'Show me all job interview related emails',
      receipts: 'Find all receipts, bills, and payment confirmations',
      shopping: 'Show me shopping deals, promotions, and order confirmations',
      travel: 'Find all travel bookings, flights, and hotel confirmations'
    };
    onCategorySelect(category.id, queries[category.id as keyof typeof queries]);
  };

  const handleSummaryClick = (summary: typeof summaryOptions[0]) => {
    const queries = {
      summary12h: 'Generate a summary of all emails received in the last 12 hours',
      summary24h: 'Generate a summary of all emails received in the last 24 hours'
    };
    onCategorySelect(summary.id, queries[summary.id as keyof typeof queries]);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Briefly.AI Assistant</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-3">
              Quick email summaries:
            </p>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {summaryOptions.map((summary) => {
                const Icon = summary.icon;
                return (
                  <Button
                    key={summary.id}
                    variant="outline"
                    onClick={() => handleSummaryClick(summary)}
                    className={`h-auto p-3 justify-start ${summary.color}`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    <span className="text-xs">{summary.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground mb-3">
              Quick actions - click a category to get started:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <Button
                    key={category.id}
                    variant="outline"
                    onClick={() => handleCategoryClick(category)}
                    className={`h-auto p-3 justify-start ${category.color}`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    <span className="text-xs">{category.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>
          
          <div className="border-t pt-4">
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  Or ask me anything about your emails:
                </p>
                <div className="flex gap-2">
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="e.g., Find emails from my bank, Show me newsletters from this week..."
                    className="flex-1"
                  />
                  <Button type="submit" disabled={!query.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </form>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-xs text-muted-foreground">
              💡 Try asking: "How many packages am I expecting?", "Do I have any meetings today?", 
              "Show me emails about my apartment lease"
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}