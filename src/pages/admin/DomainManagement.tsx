
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Eye, Code } from 'lucide-react';

// Mock domains data
const mockDomains = [
  {
    id: 1,
    domain: 'techfest.com',
    brandName: 'TechFest 2025',
    status: 'active',
    events: 12,
    users: 347,
    createdAt: '2024-01-15',
    hasCustomCode: true
  },
  {
    id: 2,
    domain: 'artfair.com',
    brandName: 'Art Fair Exhibition',
    status: 'active',
    events: 8,
    users: 256,
    createdAt: '2024-02-20',
    hasCustomCode: false
  },
  {
    id: 3,
    domain: 'musicfest.com',
    brandName: 'Music Festival',
    status: 'pending',
    events: 0,
    users: 0,
    createdAt: '2024-12-01',
    hasCustomCode: false
  }
];

const DomainManagement = () => {
  const [domains] = useState(mockDomains);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState<any>(null);
  const [newDomain, setNewDomain] = useState({
    domain: '',
    brandName: '',
    adminEmail: '',
    customCSS: '',
    customJS: ''
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
    console.log('Creating domain:', newDomain);
    setShowCreateForm(false);
    setNewDomain({ domain: '', brandName: '', adminEmail: '', customCSS: '', customJS: '' });
  };

  const handleEditCustomCode = (domain: any) => {
    setSelectedDomain({
      ...domain,
      customCSS: `/* Custom CSS for ${domain.domain} */\n.custom-header {\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n}`,
      customJS: `// Custom JS for ${domain.domain}\nconsole.log('${domain.domain} custom scripts loaded');`
    });
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
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="customCSS">Custom CSS (Optional)</Label>
                  <Textarea
                    id="customCSS"
                    placeholder="/* Enter custom CSS for this domain */"
                    value={newDomain.customCSS}
                    onChange={(e) => setNewDomain({...newDomain, customCSS: e.target.value})}
                    className="min-h-[100px] font-mono text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="customJS">Custom JavaScript (Optional)</Label>
                  <Textarea
                    id="customJS"
                    placeholder="// Enter custom JavaScript for this domain"
                    value={newDomain.customJS}
                    onChange={(e) => setNewDomain({...newDomain, customJS: e.target.value})}
                    className="min-h-[100px] font-mono text-sm"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
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
                <TableHead>Custom Code</TableHead>
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
                  <TableCell>
                    {domain.hasCustomCode ? (
                      <Badge className="bg-blue-100 text-blue-800">
                        <Code className="h-3 w-3 mr-1" />
                        Custom
                      </Badge>
                    ) : (
                      <Badge variant="outline">Default</Badge>
                    )}
                  </TableCell>
                  <TableCell>{new Date(domain.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleEditCustomCode(domain)}
                          >
                            <Code className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Custom Code for {selectedDomain?.domain}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="editCustomCSS">Custom CSS</Label>
                              <Textarea
                                id="editCustomCSS"
                                value={selectedDomain?.customCSS || ''}
                                onChange={(e) => setSelectedDomain({...selectedDomain, customCSS: e.target.value})}
                                className="min-h-[200px] font-mono text-sm"
                              />
                            </div>
                            <div>
                              <Label htmlFor="editCustomJS">Custom JavaScript</Label>
                              <Textarea
                                id="editCustomJS"
                                value={selectedDomain?.customJS || ''}
                                onChange={(e) => setSelectedDomain({...selectedDomain, customJS: e.target.value})}
                                className="min-h-[200px] font-mono text-sm"
                              />
                            </div>
                            <Button>Save Custom Code</Button>
                          </div>
                        </DialogContent>
                      </Dialog>
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
