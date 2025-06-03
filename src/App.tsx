
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TenantProvider } from '@/contexts/TenantContext';
import PublicLayout from '@/layouts/PublicLayout';
import AdminLayout from '@/layouts/AdminLayout';

// Public Pages
import HomePage from '@/pages/HomePage';
import EventsPage from '@/pages/EventsPage';
import EventDetailPage from '@/pages/EventDetailPage';
import RegistrationPage from '@/pages/RegistrationPage';
import GalleryPage from '@/pages/GalleryPage';
import CheckInPage from '@/pages/CheckInPage';
import QRCheckIn from '@/pages/QRCheckIn';
import CustomPage from '@/pages/CustomPage';
import NotFound from '@/pages/NotFound';

// Admin Pages
import AdminDashboard from '@/pages/admin/AdminDashboard';
import EventManagement from '@/pages/admin/EventManagement';
import RegistrationViewer from '@/pages/admin/RegistrationViewer';
import FormBuilder from '@/pages/admin/FormBuilder';
import QueueManagement from '@/pages/admin/QueueManagement';
import GalleryManager from '@/pages/admin/GalleryManager';
import PageBuilder from '@/pages/admin/PageBuilder';
import AdminSettings from '@/pages/admin/AdminSettings';
import StageDisplay from '@/pages/admin/StageDisplay';

// Super Admin Pages
import SuperAdminDashboard from '@/pages/admin/SuperAdminDashboard';
import DomainManagement from '@/pages/admin/DomainManagement';
import SuperAdminAnalytics from '@/pages/admin/SuperAdminAnalytics';
import SuperAdminSettings from '@/pages/admin/SuperAdminSettings';

import './App.css';

function App() {
  return (
    <TenantProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<HomePage />} />
            <Route path="events" element={<EventsPage />} />
            <Route path="events/:id" element={<EventDetailPage />} />
            <Route path="register/:eventId" element={<RegistrationPage />} />
            <Route path="gallery" element={<GalleryPage />} />
            <Route path="check-in" element={<CheckInPage />} />
            <Route path="qr-checkin" element={<QRCheckIn />} />
            <Route path=":slug" element={<CustomPage />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="events" element={<EventManagement />} />
            <Route path="registrations" element={<RegistrationViewer />} />
            <Route path="form-builder" element={<FormBuilder />} />
            <Route path="queue" element={<QueueManagement />} />
            <Route path="gallery" element={<GalleryManager />} />
            <Route path="pages" element={<PageBuilder />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* Stage Display (Full Screen) */}
          <Route path="/stage/:eventId" element={<StageDisplay />} />

          {/* Super Admin Routes */}
          <Route path="/super-admin" element={<AdminLayout />}>
            <Route index element={<SuperAdminDashboard />} />
            <Route path="domains" element={<DomainManagement />} />
            <Route path="analytics" element={<SuperAdminAnalytics />} />
            <Route path="settings" element={<SuperAdminSettings />} />
          </Route>

          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </TenantProvider>
  );
}

export default App;
