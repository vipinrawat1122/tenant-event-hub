
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Clock, Users, ArrowLeft } from 'lucide-react';

// Mock event data - would come from API in real app
const getEventBySlug = (slug: string) => {
  const events = {
    'tech-innovation-summit': {
      id: '1',
      title: 'Tech Innovation Summit 2025',
      description: 'Join industry leaders, entrepreneurs, and technology enthusiasts for a full day of cutting-edge discussions, networking opportunities, and insights into the future of technology.',
      longDescription: `
        <p>The Tech Innovation Summit 2025 is a premier event bringing together the brightest minds in technology to explore emerging trends, share breakthrough innovations, and discuss the future of our digital world.</p>
        
        <h3>What to Expect:</h3>
        <ul>
          <li>Keynote speeches from industry leaders</li>
          <li>Panel discussions on AI, blockchain, and emerging technologies</li>
          <li>Networking sessions with fellow tech enthusiasts</li>
          <li>Product demos and startup showcases</li>
          <li>Interactive workshops and hands-on sessions</li>
        </ul>
        
        <h3>Schedule:</h3>
        <ul>
          <li>9:00 AM - Registration & Welcome Coffee</li>
          <li>10:00 AM - Opening Keynote</li>
          <li>11:30 AM - AI & Machine Learning Panel</li>
          <li>1:00 PM - Networking Lunch</li>
          <li>2:30 PM - Startup Pitch Session</li>
          <li>4:00 PM - Interactive Workshops</li>
          <li>6:00 PM - Closing Reception</li>
        </ul>
      `,
      date: '2025-01-15',
      time: '09:00',
      endTime: '18:00',
      venue: 'Grand Convention Center',
      address: '123 Technology Boulevard, Innovation District',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200',
      status: 'upcoming',
      category: 'Technology',
      maxAttendees: 500,
      currentAttendees: 247,
      price: 'Free',
      organizer: 'TechFest Organization'
    }
  };
  
  return events[slug as keyof typeof events];
};

const EventDetailPage = () => {
  const { slug } = useParams();
  const event = getEventBySlug(slug || '');

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Event Not Found</h1>
          <p className="text-gray-600 mb-4">The event you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/events">Back to Events</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 w-full">
            <Button
              asChild
              variant="outline"
              className="mb-4 bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <Link to="/events">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Events
              </Link>
            </Button>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge className="bg-green-500">{event.status}</Badge>
              <Badge variant="secondary">{event.category}</Badge>
              <Badge variant="outline" className="border-white/30 text-white">
                {event.price}
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {event.title}
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl">
              {event.description}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>About This Event</CardTitle>
              </CardHeader>
              <CardContent>
                <div 
                  className="prose prose-blue max-w-none"
                  dangerouslySetInnerHTML={{ __html: event.longDescription }}
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Registration Card */}
            <Card>
              <CardHeader>
                <CardTitle>Register for Event</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Attendance</span>
                  <span className="text-sm font-medium">
                    {event.currentAttendees} / {event.maxAttendees}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{
                      width: `${(event.currentAttendees / event.maxAttendees) * 100}%`
                    }}
                  ></div>
                </div>
                <Button asChild className="w-full" size="lg">
                  <Link to={`/register/${event.id}`}>
                    Register Now
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Event Details */}
            <Card>
              <CardHeader>
                <CardTitle>Event Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-medium">
                      {new Date(event.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-medium">{event.time} - {event.endTime}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-medium">{event.venue}</p>
                    <p className="text-sm text-gray-600">{event.address}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-medium">Organized by</p>
                    <p className="text-sm text-gray-600">{event.organizer}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Share Card */}
            <Card>
              <CardHeader>
                <CardTitle>Share Event</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Twitter
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Facebook
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    LinkedIn
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;
