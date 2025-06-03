
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Save, Shield, Database, Mail } from 'lucide-react';

const SuperAdminSettings = () => {
  const [settings, setSettings] = useState({
    platformName: 'EventManager Pro',
    defaultTheme: '#1e40af',
    maxDomainsPerUser: 5,
    maxEventsPerDomain: 50,
    enableDomainCreation: true,
    requireDomainApproval: false,
    enableAnalytics: true,
    enableBilling: false,
    smtpHost: 'smtp.gmail.com',
    smtpPort: '587',
    smtpUser: '',
    smtpPassword: '',
    backupEnabled: true,
    backupFrequency: 'daily',
    maintenanceMode: false,
    debugMode: false
  });

  const handleSave = () => {
    console.log('Saving super admin settings:', settings);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Super Admin Settings</h1>

      <div className="space-y-6">
        {/* Platform Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Platform Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="platformName">Platform Name</Label>
              <Input
                id="platformName"
                value={settings.platformName}
                onChange={(e) => setSettings({...settings, platformName: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="defaultTheme">Default Theme Color</Label>
              <div className="flex items-center space-x-2">
                <Input
                  type="color"
                  value={settings.defaultTheme}
                  onChange={(e) => setSettings({...settings, defaultTheme: e.target.value})}
                  className="w-16 h-10"
                />
                <Input
                  value={settings.defaultTheme}
                  onChange={(e) => setSettings({...settings, defaultTheme: e.target.value})}
                  placeholder="#1e40af"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="maxDomains">Max Domains Per User</Label>
                <Input
                  id="maxDomains"
                  type="number"
                  value={settings.maxDomainsPerUser}
                  onChange={(e) => setSettings({...settings, maxDomainsPerUser: parseInt(e.target.value)})}
                />
              </div>
              <div>
                <Label htmlFor="maxEvents">Max Events Per Domain</Label>
                <Input
                  id="maxEvents"
                  type="number"
                  value={settings.maxEventsPerDomain}
                  onChange={(e) => setSettings({...settings, maxEventsPerDomain: parseInt(e.target.value)})}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Domain Management */}
        <Card>
          <CardHeader>
            <CardTitle>Domain Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Enable Domain Creation</Label>
                <p className="text-sm text-gray-600">Allow users to create new domains</p>
              </div>
              <Switch
                checked={settings.enableDomainCreation}
                onCheckedChange={(checked) => setSettings({...settings, enableDomainCreation: checked})}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Require Domain Approval</Label>
                <p className="text-sm text-gray-600">New domains need admin approval</p>
              </div>
              <Switch
                checked={settings.requireDomainApproval}
                onCheckedChange={(checked) => setSettings({...settings, requireDomainApproval: checked})}
              />
            </div>
          </CardContent>
        </Card>

        {/* Email Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Mail className="h-5 w-5" />
              <span>Email Configuration</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="smtpHost">SMTP Host</Label>
                <Input
                  id="smtpHost"
                  value={settings.smtpHost}
                  onChange={(e) => setSettings({...settings, smtpHost: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="smtpPort">SMTP Port</Label>
                <Input
                  id="smtpPort"
                  value={settings.smtpPort}
                  onChange={(e) => setSettings({...settings, smtpPort: e.target.value})}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="smtpUser">SMTP Username</Label>
                <Input
                  id="smtpUser"
                  value={settings.smtpUser}
                  onChange={(e) => setSettings({...settings, smtpUser: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="smtpPassword">SMTP Password</Label>
                <Input
                  id="smtpPassword"
                  type="password"
                  value={settings.smtpPassword}
                  onChange={(e) => setSettings({...settings, smtpPassword: e.target.value})}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="h-5 w-5" />
              <span>System Configuration</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Enable Analytics</Label>
                <p className="text-sm text-gray-600">Track system usage and performance</p>
              </div>
              <Switch
                checked={settings.enableAnalytics}
                onCheckedChange={(checked) => setSettings({...settings, enableAnalytics: checked})}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Enable Billing</Label>
                <p className="text-sm text-gray-600">Enable subscription billing features</p>
              </div>
              <Switch
                checked={settings.enableBilling}
                onCheckedChange={(checked) => setSettings({...settings, enableBilling: checked})}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Backup Enabled</Label>
                <p className="text-sm text-gray-600">Automatic database backups</p>
              </div>
              <Switch
                checked={settings.backupEnabled}
                onCheckedChange={(checked) => setSettings({...settings, backupEnabled: checked})}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Maintenance Mode</Label>
                <p className="text-sm text-gray-600">Put platform in maintenance mode</p>
              </div>
              <Switch
                checked={settings.maintenanceMode}
                onCheckedChange={(checked) => setSettings({...settings, maintenanceMode: checked})}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Debug Mode</Label>
                <p className="text-sm text-gray-600">Enable detailed error logging</p>
              </div>
              <Switch
                checked={settings.debugMode}
                onCheckedChange={(checked) => setSettings({...settings, debugMode: checked})}
              />
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
            <Save className="h-4 w-4 mr-2" />
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminSettings;
