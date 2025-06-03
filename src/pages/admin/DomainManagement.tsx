
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';

// Mock domains data
const mockDomains = [
  {
    id: 1,
    domain: 'techfest.com',
    brandName: 'TechFest 2025',
    status: 'active',
    events: 12,
    users: 347,
    createdAt: '2024-01-15'
  },
  {
    id: 2,
    domain: 'artfair.com',
    brandName: 'Art Fair Exhibition',
    status: 'active',
    events: 8,
    users: 256,
    createdAt: '2024-02-20'
  },
  {
    id: 3,
    domain: 'musicfest.com',
    brandName: 'Music Festival',
    status: 'pending',
    events: 0,
    users: 0,
    createdAt: '2024-12-01'
  }
];

const DomainManagement = () => {
  const [domains] = useState(mockDomains);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newDomain, setNewDomain] = useState({
    domain: '',
    brandName: '',
    adminEmail: ''
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'suspended':
        return <Badge className="bg-red-100 text-red-800">Suspended</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const handleCreateDomain = () => {
    // Handle domain creation
    console.log('Creating domain:', newDomain);
    setShowCreateForm(false);
    setNewDomain({ domain: '', brandName: '', adminEmail: '' });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Domain Management</h1>
        <Button 
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => setShowCreateForm(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Domain
        </Button>
      </div>

      {/* Create Domain Form */}
      {showCreateForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Create New Domain</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <Input
                placeholder="Domain (e.g., techfest.com)"
                value={newDomain.domain}
                onChange={(e) => setNewDomain({...newDomain, domain: e.target.value})}
              />
              <Input
                placeholder="Brand Name"
                value={newDomain.brandName}
                onChange={(e) => setNewDomain({...newDomain, brandName: e.target.value})}
              />
              <Input
                placeholder="Admin Email"
                type="email"
                value={newDomain.adminEmail}
                onChange={(e) => setNewDomain({...newDomain, adminEmail: e.target.value})}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleCreateDomain}>Create Domain</Button>
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Domains Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Domains</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Domain</TableHead>
                <TableHead>Brand Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Events</TableHead>
                <TableHead>Users</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {domains.map((domain) => (
                <TableRow key={domain.id}>
                  <TableCell className="font-medium">{domain.domain}</TableCell>
                  <TableCell>{domain.brandName}</TableCell>
                  <TableCell>{getStatusBadge(domain.status)}</TableCell>
                  <TableCell>{domain.events}</TableCell>
                  <TableCell>{domain.users}</TableCell>
                  <TableCell>{new Date(domain.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default DomainManagement;
