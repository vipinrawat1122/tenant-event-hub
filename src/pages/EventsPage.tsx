
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Calendar, MapPin, Clock, Search } from 'lucide-react';

// Mock events data
const events = [
  {
    id: '1',
    title: 'Tech Innovation Summit',
    description: 'Join industry leaders for cutting-edge tech discussions and networking',
    date: '2025-01-15',
    time: '09:00',
    venue: 'Convention Center',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600',
    status: 'upcoming',
    slug: 'tech-innovation-summit',
    category: 'Technology'
  },
  {
    id: '2',
    title: 'AI Workshop Series',
    description: 'Hands-on artificial intelligence workshop for developers and enthusiasts',
    date: '2025-01-20',
    time: '14:00',
    venue: 'Tech Hub',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600',
    status: 'upcoming',
    slug: 'ai-workshop-series',
    category: 'Workshop'
  },
  {
    id: '3',
    title: 'Startup Pitch Competition',
    description: 'Watch emerging startups pitch their innovative ideas to investors',
    date: '2025-01-25',
    time: '18:00',
    venue: 'Innovation Center',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600',
    status: 'upcoming',
    slug: 'startup-pitch-competition',
    category: 'Competition'
  },
  {
    id: '4',
    title: 'Digital Marketing Masterclass',
    description: 'Learn advanced digital marketing strategies from industry experts',
    date: '2025-02-01',
    time: '10:00',
    venue: 'Business Center',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600',
    status: 'upcoming',
    slug: 'digital-marketing-masterclass',
    category: 'Marketing'
  }
];

const categories = ['All', 'Technology', 'Workshop', 'Competition', 'Marketing'];

const EventsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">All Events</h1>
          <p className="text-xl text-gray-600">
            Discover and register for upcoming events
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event, index) => (
            <Card
              key={event.id}
              className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 space-x-2">
                  <Badge className="bg-green-500">{event.status}</Badge>
                  <Badge variant="secondary">{event.category}</Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl line-clamp-2">{event.title}</CardTitle>
                <p className="text-gray-600 line-clamp-2">{event.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-2" />
                    {new Date(event.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-2" />
                    {event.time}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-2" />
                    {event.venue}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button asChild className="flex-1">
                    <Link to={`/events/${event.slug}`}>View Details</Link>
                  </Button>
                  <Button asChild variant="outline" className="flex-1">
                    <Link to={`/register/${event.id}`}>Register</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;
