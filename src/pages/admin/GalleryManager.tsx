
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Upload, Image as ImageIcon, Trash2, Edit, Eye } from 'lucide-react';

// Mock gallery data
const mockGalleryItems = [
  {
    id: 1,
    url: '/placeholder.svg',
    title: 'Opening Ceremony',
    event: 'Tech Summit 2025',
    uploadedAt: '2024-12-20',
    type: 'image'
  },
  {
    id: 2,
    url: '/placeholder.svg',
    title: 'Keynote Speaker',
    event: 'Tech Summit 2025',
    uploadedAt: '2024-12-20',
    type: 'image'
  },
  {
    id: 3,
    url: '/placeholder.svg',
    title: 'Workshop Session',
    event: 'AI Workshop',
    uploadedAt: '2024-12-19',
    type: 'image'
  }
];

const mockEvents = [
  { id: 1, name: 'Tech Summit 2025' },
  { id: 2, name: 'AI Workshop' },
  { id: 3, name: 'Startup Pitch' }
];

const GalleryManager = () => {
  const [galleryItems, setGalleryItems] = useState(mockGalleryItems);
  const [selectedEvent, setSelectedEvent] = useState('all');
  const [uploadForm, setUploadForm] = useState({
    title: '',
    event: '',
    file: null as File | null
  });

  const filteredItems = selectedEvent === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.event === selectedEvent);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadForm({...uploadForm, file});
    }
  };

  const handleUpload = () => {
    if (uploadForm.title && uploadForm.event && uploadForm.file) {
      const newItem = {
        id: Date.now(),
        url: URL.createObjectURL(uploadForm.file),
        title: uploadForm.title,
        event: uploadForm.event,
        uploadedAt: new Date().toISOString().split('T')[0],
        type: 'image'
      };
      setGalleryItems([newItem, ...galleryItems]);
      setUploadForm({ title: '', event: '', file: null });
    }
  };

  const deleteItem = (id: number) => {
    setGalleryItems(galleryItems.filter(item => item.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Gallery Manager</h1>

      {/* Upload Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Upload Media</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="mediaTitle">Title</Label>
              <Input
                id="mediaTitle"
                value={uploadForm.title}
                onChange={(e) => setUploadForm({...uploadForm, title: e.target.value})}
                placeholder="Enter image title"
              />
            </div>

            <div>
              <Label htmlFor="mediaEvent">Event</Label>
              <Select value={uploadForm.event} onValueChange={(value) => setUploadForm({...uploadForm, event: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select event" />
                </SelectTrigger>
                <SelectContent>
                  {mockEvents.map((event) => (
                    <SelectItem key={event.id} value={event.name}>
                      {event.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="mediaFile">File</Label>
              <Input
                id="mediaFile"
                type="file"
                accept="image/*,video/*"
                onChange={handleFileUpload}
              />
            </div>
          </div>

          <Button onClick={handleUpload} className="w-full md:w-auto">
            <Upload className="h-4 w-4 mr-2" />
            Upload Media
          </Button>
        </CardContent>
      </Card>

      {/* Filter Section */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex gap-4 items-center">
            <Label>Filter by Event:</Label>
            <Select value={selectedEvent} onValueChange={setSelectedEvent}>
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Events</SelectItem>
                {mockEvents.map((event) => (
                  <SelectItem key={event.id} value={event.name}>
                    {event.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Badge variant="outline">
              {filteredItems.length} items
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Gallery Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Media Library</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div key={item.id} className="border rounded-lg overflow-hidden">
                <div className="aspect-square bg-gray-100 flex items-center justify-center">
                  <img 
                    src={item.url} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-gray-600 mb-2">{item.event}</p>
                  <p className="text-xs text-gray-500 mb-3">{item.uploadedAt}</p>
                  
                  <div className="flex gap-1">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => deleteItem(item.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No media found for the selected filter.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GalleryManager;
