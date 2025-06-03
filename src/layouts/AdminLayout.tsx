
import { Outlet, useLocation } from 'react-router-dom';
import { useTenant } from '@/contexts/TenantContext';
import AdminNavigation from '@/components/admin/AdminNavigation';
import LoadingSpinner from '@/components/LoadingSpinner';

const AdminLayout = () => {
  const { tenant, isLoading } = useTenant();
  const location = useLocation();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Check if it's super admin domain
  const isSuperAdmin = location.pathname.startsWith('/super-admin');

  if (!isSuperAdmin && !tenant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
          <p className="text-gray-600">This admin panel is not accessible.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminNavigation />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
