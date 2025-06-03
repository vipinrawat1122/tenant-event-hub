
import { useParams } from 'react-router-dom';

// Mock custom pages data
const getCustomPage = (slug: string) => {
  const pages = {
    'about': {
      title: 'About Us',
      content: `
        <div class="prose prose-blue max-w-none">
          <h2>Welcome to TechFest 2025</h2>
          <p>We are a leading event management platform dedicated to creating extraordinary experiences for technology enthusiasts, professionals, and innovators.</p>
          
          <h3>Our Mission</h3>
          <p>To bridge the gap between cutting-edge technology and real-world applications by bringing together brilliant minds from around the globe.</p>
          
          <h3>What We Do</h3>
          <ul>
            <li>Organize world-class technology conferences and summits</li>
            <li>Host interactive workshops and training sessions</li>
            <li>Facilitate networking opportunities for professionals</li>
            <li>Showcase innovative startups and their breakthrough solutions</li>
          </ul>
          
          <h3>Our Team</h3>
          <p>Our passionate team consists of event management experts, technology enthusiasts, and industry veterans who work tirelessly to deliver exceptional experiences.</p>
        </div>
      `
    }
  };
  
  return pages[slug as keyof typeof pages];
};

const CustomPage = () => {
  const { slug } = useParams();
  const page = getCustomPage(slug || '');

  if (!page) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Page Not Found</h1>
          <p className="text-gray-600">The page you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">{page.title}</h1>
        <div
          className="bg-white rounded-lg shadow-sm p-8"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      </div>
    </div>
  );
};

export default CustomPage;
