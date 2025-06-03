
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Download, TrendingUp, TrendingDown } from 'lucide-react';

// Mock analytics data
const registrationTrends = [
  { month: 'Jan', registrations: 45, events: 3 },
  { month: 'Feb', registrations: 52, events: 4 },
  { month: 'Mar', registrations: 48, events: 3 },
  { month: 'Apr', registrations: 61, events: 5 },
  { month: 'May', registrations: 55, events: 4 },
  { month: 'Jun', registrations: 67, events: 6 },
];

const domainPerformance = [
  { domain: 'techfest.com', registrations: 347, revenue: 15230 },
  { domain: 'artfair.com', registrations: 256, revenue: 11240 },
  { domain: 'musicfest.com', registrations: 423, revenue: 18950 },
  { domain: 'sportsevent.com', registrations: 189, revenue: 8450 },
];

const eventTypeDistribution = [
  { name: 'Tech Events', value: 35, color: '#0088FE' },
  { name: 'Art Events', value: 25, color: '#00C49F' },
  { name: 'Music Events', value: 20, color: '#FFBB28' },
  { name: 'Sports Events', value: 20, color: '#FF8042' },
];

const chartConfig = {
  registrations: {
    label: "Registrations",
    color: "#2563eb",
  },
  events: {
    label: "Events",
    color: "#60a5fa",
  },
};

const SuperAdminAnalytics = () => {
  const exportAnalytics = () => {
    const csvContent = [
      ['Domain', 'Registrations', 'Revenue'],
      ...domainPerformance.map(item => [item.domain, item.registrations, item.revenue])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'analytics-report.csv';
    a.click();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
        <Button onClick={exportAnalytics} className="bg-green-600 hover:bg-green-700">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$53,870</div>
            <p className="text-xs text-green-600">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Registration/Event</CardTitle>
            <Badge variant="outline">28.5</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28.5</div>
            <p className="text-xs text-gray-600">Per event average</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <p className="text-xs text-green-600">+5% improvement</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Domains</CardTitle>
            <Badge className="bg-blue-100 text-blue-800">8</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-gray-600">All domains active</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Registration Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Registration Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={registrationTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="registrations" fill="var(--color-registrations)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Event Type Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Event Type Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={eventTypeDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {eventTypeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Domain Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Domain Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {domainPerformance.map((domain) => (
              <div key={domain.domain} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">{domain.domain}</p>
                  <p className="text-sm text-gray-600">{domain.registrations} registrations</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">${domain.revenue.toLocaleString()}</p>
                  <p className="text-xs text-gray-600">Revenue</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuperAdminAnalytics;
