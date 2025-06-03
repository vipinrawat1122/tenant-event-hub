
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// Mock gallery data
const galleryItems = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
    type: 'image',
    caption: 'Tech Innovation Summit 2024 - Opening Keynote',
    eventName: 'Tech Summit'
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800',
    type: 'image',
    caption: 'AI Workshop Session - Hands-on Learning',
    eventName: 'AI Workshop'
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800',
    type: 'image',
    caption: 'Startup Pitch Competition Finals',
    eventName: 'Startup Pitch'
  },
  {
    id: '4',
    url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    type: 'image',
    caption: 'Digital Marketing Masterclass',
    eventName: 'Marketing'
  }
];

const GalleryPage = () => {
  const [filter, setFilter] = useState('all');

  const filters = ['all', 'Tech Summit', 'AI Workshop', 'Startup Pitch', 'Marketing'];

  const filteredItems = filter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.eventName === filter);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Event Gallery</h1>
          <p className="text-xl text-gray-600">
            Relive the memorable moments from our amazing events
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {filters.map((filterOption) => (
              <Button
                key={filterOption}
                variant={filter === filterOption ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(filterOption)}
              >
                {filterOption === 'all' ? 'All Events' : filterOption}
              </Button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <Card
              key={item.id}
              className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.url}
                  alt={item.caption}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <Badge className="absolute top-4 left-4 bg-blue-600">
                  {item.eventName}
                </Badge>
              </div>
              <CardContent className="p-4">
                <p className="text-sm text-gray-600">{item.caption}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No media found</h3>
            <p className="text-gray-600">Try selecting a different filter</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryPage;
