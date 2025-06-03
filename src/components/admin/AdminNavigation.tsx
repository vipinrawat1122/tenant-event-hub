
import { Link, useLocation } from 'react-router-dom';
import { useTenant } from '@/contexts/TenantContext';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  FormInput, 
  Queue, 
  Image, 
  FileText, 
  Settings,
  Building2,
  BarChart3
} from 'lucide-react';
import { cn } from '@/lib/utils';

const AdminNavigation = () => {
  const { tenant } = useTenant();
  const location = useLocation();

  const isSuperAdmin = location.pathname.startsWith('/super-admin');

  const domainAdminItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Events', path: '/admin/events', icon: Calendar },
    { name: 'Registrations', path: '/admin/registrations', icon: Users },
    { name: 'Form Builder', path: '/admin/form-builder', icon: FormInput },
    { name: 'Queue Management', path: '/admin/queue', icon: Queue },
    { name: 'Gallery Manager', path: '/admin/gallery', icon: Image },
    { name: 'Page Builder', path: '/admin/pages', icon: FileText },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  const superAdminItems = [
    { name: 'Dashboard', path: '/super-admin', icon: LayoutDashboard },
    { name: 'Domains', path: '/super-admin/domains', icon: Building2 },
    { name: 'Analytics', path: '/super-admin/analytics', icon: BarChart3 },
    { name: 'Settings', path: '/super-admin/settings', icon: Settings },
  ];

  const navItems = isSuperAdmin ? superAdminItems : domainAdminItems;

  return (
    <nav className="w-64 bg-white shadow-sm border-r">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-900">
          {isSuperAdmin ? 'Super Admin' : `${tenant?.brandName} Admin`}
        </h2>
      </div>
      
      <div className="p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  location.pathname === item.path
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:text-blue-600 hover:bg-gray-100"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default AdminNavigation;
