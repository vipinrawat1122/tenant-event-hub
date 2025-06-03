
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useTenant } from '@/contexts/TenantContext';
import CustomCodeEditor from '@/components/admin/CustomCodeEditor';
import { Save, Settings, Palette, Bell } from 'lucide-react';

const AdminSettings = () => {
  const { tenant } = useTenant();
  const [settings, setSettings] = useState({
    brandName: tenant?.brandName || 'TechFest 2025',
    logoUrl: tenant?.logoUrl || '/placeholder.svg',
    primaryColor: tenant?.primaryColor || '#1e40af',
    secondaryColor: tenant?.secondaryColor || '#3b82f6',
    accentColor: tenant?.accentColor || '#06b6d4',
    enableRegistrations: true,
    enableGallery: true,
    enableCheckIn: true,
    maxRegistrations: 500,
    emailNotifications: true,
    smsNotifications: false,
    customCSS: tenant?.customCSS || '',
    customJS: tenant?.customJS || ''
  });

  const handleSave = () => {
    console.log('Saving admin settings:', settings);
  };

  const handleCustomCodeSave = (css: string, js: string) => {
    setSettings({
      ...settings,
      customCSS: css,
      customJS: js
    });
    console.log('Saving custom code:', { css, js });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Domain Settings</h1>

      <div className="space-y-6">
        {/* Brand Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Palette className="h-5 w-5" />
              <span>Brand Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="brandName">Brand Name</Label>
              <Input
                id="brandName"
                value={settings.brandName}
                onChange={(e) => setSettings({...settings, brandName: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="logoUrl">Logo URL</Label>
              <Input
                id="logoUrl"
                value={settings.logoUrl}
                onChange={(e) => setSettings({...settings, logoUrl: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="primaryColor">Primary Color</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    type="color"
                    value={settings.primaryColor}
                    onChange={(e) => setSettings({...settings, primaryColor: e.target.value})}
                    className="w-16 h-10"
                  />
                  <Input
                    value={settings.primaryColor}
                    onChange={(e) => setSettings({...settings, primaryColor: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="secondaryColor">Secondary Color</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    type="color"
                    value={settings.secondaryColor}
                    onChange={(e) => setSettings({...settings, secondaryColor: e.target.value})}
                    className="w-16 h-10"
                  />
                  <Input
                    value={settings.secondaryColor}
                    onChange={(e) => setSettings({...settings, secondaryColor: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="accentColor">Accent Color</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    type="color"
                    value={settings.accentColor}
                    onChange={(e) => setSettings({...settings, accentColor: e.target.value})}
                    className="w-16 h-10"
                  />
                  <Input
                    value={settings.accentColor}
                    onChange={(e) => setSettings({...settings, accentColor: e.target.value})}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feature Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="h-5 w-5" />
              <span>Feature Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Enable Registrations</Label>
                <p className="text-sm text-gray-600">Allow users to register for events</p>
              </div>
              <Switch
                checked={settings.enableRegistrations}
                onCheckedChange={(checked) => setSettings({...settings, enableRegistrations: checked})}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Enable Gallery</Label>
                <p className="text-sm text-gray-600">Show event photo gallery</p>
              </div>
              <Switch
                checked={settings.enableGallery}
                onCheckedChange={(checked) => setSettings({...settings, enableGallery: checked})}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Enable Check-In</Label>
                <p className="text-sm text-gray-600">Allow event check-in functionality</p>
              </div>
              <Switch
                checked={settings.enableCheckIn}
                onCheckedChange={(checked) => setSettings({...settings, enableCheckIn: checked})}
              />
            </div>

            <Separator />

            <div>
              <Label htmlFor="maxRegistrations">Maximum Registrations Per Event</Label>
              <Input
                id="maxRegistrations"
                type="number"
                value={settings.maxRegistrations}
                onChange={(e) => setSettings({...settings, maxRegistrations: parseInt(e.target.value)})}
              />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Notification Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-gray-600">Send email notifications to users</p>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => setSettings({...settings, emailNotifications: checked})}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>SMS Notifications</Label>
                <p className="text-sm text-gray-600">Send SMS notifications to users</p>
              </div>
              <Switch
                checked={settings.smsNotifications}
                onCheckedChange={(checked) => setSettings({...settings, smsNotifications: checked})}
              />
            </div>
          </CardContent>
        </Card>

        {/* Custom CSS/JS Editor */}
        <CustomCodeEditor
          customCSS={settings.customCSS}
          customJS={settings.customJS}
          onSave={handleCustomCodeSave}
        />

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
            <Save className="h-4 w-4 mr-2" />
            Save All Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
