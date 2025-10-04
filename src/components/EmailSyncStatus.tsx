import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Mail, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';

interface EmailAccount {
  id: string;
  email: string;
  provider: string;
  status: 'connected' | 'syncing' | 'error';
  lastSync: string;
  emailCount: number;
}

interface EmailSyncStatusProps {
  onSyncComplete: () => void;
}

export function EmailSyncStatus({ onSyncComplete }: EmailSyncStatusProps) {
  const [accounts] = useState<EmailAccount[]>([
    {
      id: '1',
      email: 'user@gmail.com',
      provider: 'Gmail',
      status: 'connected',
      lastSync: '2 minutes ago',
      emailCount: 1247
    },
    {
      id: '2',
      email: 'work@company.com',
      provider: 'Outlook',
      status: 'connected',
      lastSync: '5 minutes ago',
      emailCount: 892
    }
  ]);
  
  const [syncProgress, setSyncProgress] = useState(0);
  const [isInitialSync, setIsInitialSync] = useState(true);

  useEffect(() => {
    if (isInitialSync) {
      const interval = setInterval(() => {
        setSyncProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsInitialSync(false);
            setTimeout(onSyncComplete, 1000);
            return 100;
          }
          return prev + Math.random() * 15;
        });
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isInitialSync, onSyncComplete]);

  const totalEmails = accounts.reduce((sum, account) => sum + account.emailCount, 0);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Mail className="h-6 w-6 text-blue-600" />
            Briefly.AI - Email Sync
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {isInitialSync ? (
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center">
                <RefreshCw className="h-8 w-8 text-blue-600 animate-spin" />
              </div>
              <div>
                <p className="mb-2">Syncing your emails...</p>
                <Progress value={syncProgress} className="w-full" />
                <p className="text-sm text-muted-foreground mt-2">
                  {Math.round(syncProgress)}% complete
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-center">
                <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p>All accounts synced successfully!</p>
                <p className="text-sm text-muted-foreground">
                  {totalEmails.toLocaleString()} emails processed
                </p>
              </div>
              
              <div className="space-y-3">
                {accounts.map((account) => (
                  <div key={account.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-gray-600" />
                      <div>
                        <p className="font-medium">{account.email}</p>
                        <p className="text-sm text-muted-foreground">
                          {account.provider} • {account.emailCount.toLocaleString()} emails
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-green-600">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Connected
                    </Badge>
                  </div>
                ))}
              </div>
              
              <Button 
                onClick={onSyncComplete} 
                className="w-full"
              >
                Continue to Dashboard
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}