import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RootLayout from './components/RootLayout';
import Home from './pages/Home';
import TripDetails from './pages/TripDetails';
import ListingPage from './pages/ListingPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import TripForm from './pages/admin/TripForm';
import CategoryList from './pages/admin/CategoryList';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';

// Empty page components
const EmptyPage = ({ title }) => (
  <div className="pt-24 px-4 min-h-screen">
    <h1 className="text-3xl font-bold">{title}</h1>
    <p>This is a placeholder page.</p>
  </div>
);

import { MotionLayer } from './components/MotionConfig';
import { ScrollToTop } from './components/ScrollToTop';
import { ScrollProgress } from './components/ScrollProgress';

function App() {
  return (
    <MotionLayer>
      <BrowserRouter>
        <ScrollToTop />
        <ScrollProgress />
        <Routes>

        {/* ── Public site ───────────────────────────────────── */}
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />

          <Route path="cruises" element={<ErrorBoundary><ListingPage defaultCategory="cruises" /></ErrorBoundary>} />
          <Route path="cruises/:tripId" element={<ErrorBoundary><TripDetails /></ErrorBoundary>} />
          <Route path="safari" element={<ErrorBoundary><ListingPage defaultCategory="safari" /></ErrorBoundary>} />
          <Route path="safari/:tripId" element={<ErrorBoundary><TripDetails /></ErrorBoundary>} />
          <Route path="tours" element={<ErrorBoundary><ListingPage defaultCategory="tours" /></ErrorBoundary>} />
          <Route path="tours/:tripId" element={<ErrorBoundary><TripDetails /></ErrorBoundary>} />
          <Route path="excursions" element={<ErrorBoundary><ListingPage defaultCategory="excursions" /></ErrorBoundary>} />
          <Route path="excursions/:tripId" element={<ErrorBoundary><TripDetails /></ErrorBoundary>} />

          <Route path="about" element={<EmptyPage title="Who Are We?" />} />
          <Route path="contact" element={<EmptyPage title="Contact" />} />
        </Route>

        {/* ── Admin area (no RootLayout / no navbar) ─────────── */}
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin/dashboard"
          element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>}
        />
        <Route
          path="/admin/trips/new"
          element={<ProtectedRoute><TripForm /></ProtectedRoute>}
        />
        <Route
          path="/admin/trips/:tripId/edit"
          element={<ProtectedRoute><TripForm /></ProtectedRoute>}
        />
        <Route
          path="/admin/categories"
          element={<ProtectedRoute><CategoryList /></ProtectedRoute>}
        />

      </Routes>
    </BrowserRouter>
    </MotionLayer>
  );
}

export default App;
