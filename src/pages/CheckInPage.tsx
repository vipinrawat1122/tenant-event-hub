
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { QrCode, Check, X } from 'lucide-react';

const CheckInPage = () => {
  const { eventId } = useParams();
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<{
    success: boolean;
    message: string;
    attendee?: any;
  } | null>(null);

  const mockScan = () => {
    setIsScanning(true);
    
    // Simulate scanning delay
    setTimeout(() => {
      setScanResult({
        success: true,
        message: 'Check-in successful!',
        attendee: {
          name: 'John Doe',
          email: 'john@example.com',
          organization: 'Tech Corp'
        }
      });
      setIsScanning(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <QrCode className="h-6 w-6" />
              QR Check-In
            </CardTitle>
            <p className="text-gray-600">Scan attendee QR codes for event check-in</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Scanner Area */}
            <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
              {isScanning ? (
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Scanning...</p>
                </div>
              ) : (
                <div className="text-center p-8">
                  <QrCode className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600 mb-4">Position QR code within frame</p>
                  <Button onClick={mockScan}>
                    Simulate Scan
                  </Button>
                </div>
              )}
            </div>

            {/* Scan Result */}
            {scanResult && (
              <Card className={`border-2 ${scanResult.success ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    {scanResult.success ? (
                      <Check className="h-6 w-6 text-green-600" />
                    ) : (
                      <X className="h-6 w-6 text-red-600" />
                    )}
                    <div className="flex-1">
                      <p className={`font-medium ${scanResult.success ? 'text-green-800' : 'text-red-800'}`}>
                        {scanResult.message}
                      </p>
                      {scanResult.attendee && (
                        <div className="mt-2 text-sm text-gray-600">
                          <p><strong>Name:</strong> {scanResult.attendee.name}</p>
                          <p><strong>Email:</strong> {scanResult.attendee.email}</p>
                          <p><strong>Organization:</strong> {scanResult.attendee.organization}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Stats */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">Today's Check-ins</h3>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">247</div>
                    <div className="text-sm text-gray-600">Checked In</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">500</div>
                    <div className="text-sm text-gray-600">Total Registered</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button 
              onClick={() => setScanResult(null)} 
              variant="outline" 
              className="w-full"
            >
              Scan Another Code
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CheckInPage;
