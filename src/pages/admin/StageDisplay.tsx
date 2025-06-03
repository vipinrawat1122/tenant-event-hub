
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Mock data for stage display
const mockCurrentPerson = {
  name: 'Jane Smith',
  designation: 'Product Manager',
  queueNumber: 2
};

const mockNextPerson = {
  name: 'Mike Johnson',
  designation: 'Designer',
  queueNumber: 3
};

const StageDisplay = () => {
  const { eventId } = useParams();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 text-white flex flex-col justify-center items-center p-8">
      {/* Event Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">TechFest 2025</h1>
        <p className="text-xl opacity-80">{currentTime.toLocaleTimeString()}</p>
      </div>

      {/* Now on Stage */}
      <div className="text-center mb-16">
        <h2 className="text-6xl font-bold mb-8 text-yellow-400">NOW ON STAGE</h2>
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 min-w-[600px]">
          <p className="text-5xl font-bold mb-4">{mockCurrentPerson.name}</p>
          <p className="text-3xl opacity-80">{mockCurrentPerson.designation}</p>
          <p className="text-2xl mt-4 text-yellow-400">Queue #{mockCurrentPerson.queueNumber}</p>
        </div>
      </div>

      {/* Next Up */}
      <div className="text-center">
        <h3 className="text-4xl font-bold mb-6 text-green-400">NEXT UP</h3>
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 min-w-[400px]">
          <p className="text-3xl font-bold mb-2">{mockNextPerson.name}</p>
          <p className="text-xl opacity-80">{mockNextPerson.designation}</p>
          <p className="text-lg mt-2 text-green-400">Queue #{mockNextPerson.queueNumber}</p>
        </div>
      </div>

      {/* Auto-refresh indicator */}
      <div className="fixed bottom-4 right-4 bg-white/10 backdrop-blur-md rounded-full px-4 py-2">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm">Live</span>
        </div>
      </div>
    </div>
  );
};

export default StageDisplay;
