
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save, Eye, Code, Palette } from 'lucide-react';

interface CustomCodeEditorProps {
  customCSS: string;
  customJS: string;
  onSave: (css: string, js: string) => void;
}

const CustomCodeEditor = ({ customCSS, customJS, onSave }: CustomCodeEditorProps) => {
  const [css, setCss] = useState(customCSS);
  const [js, setJs] = useState(customJS);
  const [previewMode, setPreviewMode] = useState(false);

  const handleSave = () => {
    onSave(css, js);
  };

  const togglePreview = () => {
    setPreviewMode(!previewMode);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Code className="h-5 w-5" />
          <span>Custom CSS & JavaScript</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Add custom styling and functionality to your domain
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={togglePreview}
              >
                <Eye className="h-4 w-4 mr-2" />
                {previewMode ? 'Hide Preview' : 'Show Preview'}
              </Button>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>

          <Tabs defaultValue="css" className="w-full">
            <TabsList>
              <TabsTrigger value="css" className="flex items-center space-x-2">
                <Palette className="h-4 w-4" />
                <span>Custom CSS</span>
              </TabsTrigger>
              <TabsTrigger value="js" className="flex items-center space-x-2">
                <Code className="h-4 w-4" />
                <span>Custom JavaScript</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="css" className="space-y-4">
              <div>
                <Label htmlFor="customCSS">Custom CSS</Label>
                <Textarea
                  id="customCSS"
                  value={css}
                  onChange={(e) => setCss(e.target.value)}
                  placeholder="/* Enter your custom CSS here */
.custom-hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.custom-button {
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}"
                  className="min-h-[300px] font-mono text-sm"
                />
              </div>
              {previewMode && (
                <div className="border rounded-lg p-4 bg-gray-50">
                  <h4 className="font-medium mb-2">CSS Preview</h4>
                  <div className="space-y-2">
                    <div className="custom-hero p-4 rounded text-white">
                      Sample hero section with custom gradient
                    </div>
                    <button className="custom-button bg-blue-600 text-white px-4 py-2 rounded">
                      Sample Custom Button
                    </button>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="js" className="space-y-4">
              <div>
                <Label htmlFor="customJS">Custom JavaScript</Label>
                <Textarea
                  id="customJS"
                  value={js}
                  onChange={(e) => setJs(e.target.value)}
                  placeholder="// Enter your custom JavaScript here
console.log('Custom JS loaded');

// Add custom analytics or third-party scripts
window.customDomainFeatures = {
  trackEvent: function(eventName, data) {
    console.log('Custom tracking:', eventName, data);
  }
};"
                  className="min-h-[300px] font-mono text-sm"
                />
              </div>
              {previewMode && (
                <div className="border rounded-lg p-4 bg-gray-50">
                  <h4 className="font-medium mb-2">JavaScript Info</h4>
                  <p className="text-sm text-gray-600">
                    Custom JavaScript will be executed when the page loads. 
                    Check the browser console to see output.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomCodeEditor;
