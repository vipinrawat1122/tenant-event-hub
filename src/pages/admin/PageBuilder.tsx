
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';

// Mock pages data
const mockPages = [
  { id: 1, title: 'About Us', slug: 'about', status: 'published', updatedAt: '2024-12-20' },
  { id: 2, title: 'Rules & Guidelines', slug: 'rules', status: 'published', updatedAt: '2024-12-19' },
  { id: 3, title: 'Sponsors', slug: 'sponsors', status: 'draft', updatedAt: '2024-12-18' },
];

const PageBuilder = () => {
  const [pages] = useState(mockPages);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newPage, setNewPage] = useState({
    title: '',
    slug: '',
    content: ''
  });

  const handleCreatePage = () => {
    // Handle page creation
    console.log('Creating page:', newPage);
    setShowCreateForm(false);
    setNewPage({ title: '', slug: '', content: '' });
  };

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Page Builder</h1>
        <Button 
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => setShowCreateForm(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Page
        </Button>
      </div>

      {/* Create Page Form */}
      {showCreateForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Create New Page</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="pageTitle">Page Title</Label>
              <Input
                id="pageTitle"
                value={newPage.title}
                onChange={(e) => {
                  const title = e.target.value;
                  setNewPage({
                    ...newPage,
                    title,
                    slug: generateSlug(title)
                  });
                }}
                placeholder="Enter page title"
              />
            </div>

            <div>
              <Label htmlFor="pageSlug">URL Slug</Label>
              <Input
                id="pageSlug"
                value={newPage.slug}
                onChange={(e) => setNewPage({...newPage, slug: e.target.value})}
                placeholder="url-slug"
              />
              <p className="text-sm text-gray-500 mt-1">
                Page will be available at: /{newPage.slug}
              </p>
            </div>

            <div>
              <Label htmlFor="pageContent">Content</Label>
              <Textarea
                id="pageContent"
                value={newPage.content}
                onChange={(e) => setNewPage({...newPage, content: e.target.value})}
                placeholder="Enter page content (HTML supported)"
                rows={10}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleCreatePage}>Create Page</Button>
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Pages Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Pages</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pages.map((page) => (
                <TableRow key={page.id}>
                  <TableCell className="font-medium">{page.title}</TableCell>
                  <TableCell>/{page.slug}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs ${
                      page.status === 'published' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {page.status}
                    </span>
                  </TableCell>
                  <TableCell>{new Date(page.updatedAt).toLocaleDateString()}</TableCell>
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

export default PageBuilder;
