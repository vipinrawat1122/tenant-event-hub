
import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Camera, CheckCircle, XCircle, AlertCircle, RotateCcw } from 'lucide-react';

// Mock QR scanner hook (in real app, you'd use react-qr-scanner or similar)
const useQRScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startScanning = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsScanning(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const stopScanning = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsScanning(false);
  };

  // Mock QR detection for demo (in real app, you'd use a QR detection library)
  const mockScanResult = () => {
    const mockCodes = ['QR123456', 'QR789012', 'QR345678'];
    const randomCode = mockCodes[Math.floor(Math.random() * mockCodes.length)];
    setResult(randomCode);
    stopScanning();
  };

  return {
    isScanning,
    result,
    videoRef,
    startScanning,
    stopScanning,
    mockScanResult,
    setResult
  };
};

const QRCheckIn = () => {
  const [checkInResult, setCheckInResult] = useState<{
    status: 'success' | 'already-checked' | 'error' | null;
    message: string;
    attendee?: { name: string; event: string; queueNumber?: number };
  }>({ status: null, message: '' });

  const { isScanning, result, videoRef, startScanning, stopScanning, mockScanResult, setResult } = useQRScanner();

  const handleCheckIn = async (qrCode: string) => {
    // Mock API call to check-in
    console.log('Checking in with QR code:', qrCode);
    
    // Simulate different scenarios
    const scenarios = [
      {
        status: 'success' as const,
        message: 'Check-in successful!',
        attendee: { name: 'John Doe', event: 'Tech Summit 2025', queueNumber: 12 }
      },
      {
        status: 'already-checked' as const,
        message: 'Already checked in!',
        attendee: { name: 'Jane Smith', event: 'AI Workshop' }
      },
      {
        status: 'error' as const,
        message: 'Invalid QR code or registration not found.'
      }
    ];

    const randomScenario = scenarios[Math.floor(Math.random() * scenarios.length)];
    setCheckInResult(randomScenario);

    // Reset after 5 seconds
    setTimeout(() => {
      setCheckInResult({ status: null, message: '' });
      setResult(null);
    }, 5000);
  };

  useEffect(() => {
    if (result) {
      handleCheckIn(result);
    }
  }, [result]);

  const resetScanner = () => {
    setResult(null);
    setCheckInResult({ status: null, message: '' });
    stopScanning();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">QR Check-In</CardTitle>
          <p className="text-gray-600">Scan your QR code to check in</p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Scanner Section */}
          {!result && !checkInResult.status && (
            <div className="space-y-4">
              {!isScanning ? (
                <div className="text-center space-y-4">
                  <div className="w-48 h-48 mx-auto bg-gray-100 rounded-lg flex items-center justify-center">
                    <Camera className="h-16 w-16 text-gray-400" />
                  </div>
                  <Button onClick={startScanning} className="w-full">
                    <Camera className="h-4 w-4 mr-2" />
                    Start Scanning
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 border-2 border-blue-500 rounded-lg animate-pulse"></div>
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={stopScanning} variant="outline" className="flex-1">
                      Stop Scanning
                    </Button>
                    <Button onClick={mockScanResult} className="flex-1">
                      Mock Scan
                    </Button>
                  </div>
                  <p className="text-center text-sm text-gray-600">
                    Position the QR code within the frame
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Result Section */}
          {checkInResult.status && (
            <div className="text-center space-y-4">
              {checkInResult.status === 'success' && (
                <div className="space-y-3">
                  <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <Badge className="bg-green-100 text-green-800 text-lg px-4 py-2">
                    {checkInResult.message}
                  </Badge>
                  {checkInResult.attendee && (
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="font-semibold text-green-900">{checkInResult.attendee.name}</p>
                      <p className="text-green-700">{checkInResult.attendee.event}</p>
                      {checkInResult.attendee.queueNumber && (
                        <p className="text-green-600">Queue Number: #{checkInResult.attendee.queueNumber}</p>
                      )}
                    </div>
                  )}
                </div>
              )}

              {checkInResult.status === 'already-checked' && (
                <div className="space-y-3">
                  <div className="w-16 h-16 mx-auto bg-yellow-100 rounded-full flex items-center justify-center">
                    <AlertCircle className="h-8 w-8 text-yellow-600" />
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800 text-lg px-4 py-2">
                    {checkInResult.message}
                  </Badge>
                  {checkInResult.attendee && (
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <p className="font-semibold text-yellow-900">{checkInResult.attendee.name}</p>
                      <p className="text-yellow-700">{checkInResult.attendee.event}</p>
                    </div>
                  )}
                </div>
              )}

              {checkInResult.status === 'error' && (
                <div className="space-y-3">
                  <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
                    <XCircle className="h-8 w-8 text-red-600" />
                  </div>
                  <Badge className="bg-red-100 text-red-800 text-lg px-4 py-2">
                    {checkInResult.message}
                  </Badge>
                </div>
              )}

              <Button onClick={resetScanner} className="w-full mt-4">
                <RotateCcw className="h-4 w-4 mr-2" />
                Scan Another QR Code
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default QRCheckIn;
