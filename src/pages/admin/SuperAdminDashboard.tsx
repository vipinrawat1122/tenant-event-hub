
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, Calendar, Users, Activity } from 'lucide-react';

// Mock data
const stats = {
  totalDomains: 8,
  totalEvents: 47,
  totalUsers: 1240,
  activeToday: 23
};

const topDomains = [
  { domain: 'techfest.com', events: 12, users: 347 },
  { domain: 'artfair.com', events: 8, users: 256 },
  { domain: 'musicfest.com', events: 15, users: 423 },
];

const SuperAdminDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Super Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Domains</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalDomains}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalEvents}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Today</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeToday}</div>
          </CardContent>
        </Card>
      </div>

      {/* Top Domains */}
      <Card>
        <CardHeader>
          <CardTitle>Top Domains</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topDomains.map((domain, index) => (
              <div key={domain.domain} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{domain.domain}</p>
                  <p className="text-sm text-gray-600">{domain.events} events • {domain.users} users</p>
                </div>
                <Badge variant="outline">#{index + 1}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuperAdminDashboard;
