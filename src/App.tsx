
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TenantProvider } from "./contexts/TenantContext";
import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";
import HomePage from "./pages/HomePage";
import EventsPage from "./pages/EventsPage";
import EventDetailPage from "./pages/EventDetailPage";
import RegistrationPage from "./pages/RegistrationPage";
import GalleryPage from "./pages/GalleryPage";
import CustomPage from "./pages/CustomPage";
import CheckInPage from "./pages/CheckInPage";
import NotFound from "./pages/NotFound";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import EventManagement from "./pages/admin/EventManagement";
import QueueManagement from "./pages/admin/QueueManagement";
import StageDisplay from "./pages/admin/StageDisplay";
import FormBuilder from "./pages/admin/FormBuilder";
import SuperAdminDashboard from "./pages/admin/SuperAdminDashboard";
import DomainManagement from "./pages/admin/DomainManagement";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <TenantProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<PublicLayout />}>
              <Route index element={<HomePage />} />
              <Route path="events" element={<EventsPage />} />
              <Route path="events/:slug" element={<EventDetailPage />} />
              <Route path="register/:eventId" element={<RegistrationPage />} />
              <Route path="gallery" element={<GalleryPage />} />
              <Route path="checkin/:eventId" element={<CheckInPage />} />
              <Route path=":slug" element={<CustomPage />} />
            </Route>

            {/* Domain Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="events" element={<EventManagement />} />
              <Route path="queue" element={<QueueManagement />} />
              <Route path="form-builder" element={<FormBuilder />} />
              <Route path="registrations" element={<AdminDashboard />} />
              <Route path="gallery" element={<AdminDashboard />} />
              <Route path="pages" element={<AdminDashboard />} />
              <Route path="settings" element={<AdminDashboard />} />
            </Route>

            {/* Super Admin Routes */}
            <Route path="/super-admin" element={<AdminLayout />}>
              <Route index element={<SuperAdminDashboard />} />
              <Route path="domains" element={<DomainManagement />} />
              <Route path="analytics" element={<SuperAdminDashboard />} />
              <Route path="settings" element={<SuperAdminDashboard />} />
            </Route>

            {/* Stage Display (fullscreen) */}
            <Route path="/stage-display/:eventId" element={<StageDisplay />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TenantProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
