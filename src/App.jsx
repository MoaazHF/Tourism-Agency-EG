import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RootLayout from './components/RootLayout';
import Home from './pages/Home';
import { lazy, Suspense } from 'react';
const TripDetails = lazy(() => import('./pages/TripDetails'));
const ListingPage = lazy(() => import('./pages/ListingPage'));
import AdminLogin from './pages/AdminLogin';
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const TripForm = lazy(() => import('./pages/admin/TripForm'));
const CategoryList = lazy(() => import('./pages/admin/CategoryList'));
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

          <Route path="cruises" element={<ErrorBoundary><Suspense fallback={<div>Loading...</div>}><ListingPage defaultCategory="cruises" /></Suspense></ErrorBoundary>} />
          <Route path="cruises/:tripId" element={<ErrorBoundary><Suspense fallback={<div>Loading...</div>}><TripDetails /></Suspense></ErrorBoundary>} />
          <Route path="safari" element={<ErrorBoundary><Suspense fallback={<div>Loading...</div>}><ListingPage defaultCategory="safari" /></Suspense></ErrorBoundary>} />
          <Route path="safari/:tripId" element={<ErrorBoundary><Suspense fallback={<div>Loading...</div>}><TripDetails /></Suspense></ErrorBoundary>} />
          <Route path="tours" element={<ErrorBoundary><Suspense fallback={<div>Loading...</div>}><ListingPage defaultCategory="tours" /></Suspense></ErrorBoundary>} />
          <Route path="tours/:tripId" element={<ErrorBoundary><Suspense fallback={<div>Loading...</div>}><TripDetails /></Suspense></ErrorBoundary>} />
          <Route path="excursions" element={<ErrorBoundary><Suspense fallback={<div>Loading...</div>}><ListingPage defaultCategory="excursions" /></Suspense></ErrorBoundary>} />
          <Route path="excursions/:tripId" element={<ErrorBoundary><Suspense fallback={<div>Loading...</div>}><TripDetails /></Suspense></ErrorBoundary>} />

          <Route path="about" element={<EmptyPage title="Who Are We?" />} />
          <Route path="contact" element={<EmptyPage title="Contact" />} />
        </Route>

        {/* ── Admin area (no RootLayout / no navbar) ─────────── */}
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin/dashboard"
          element={<ProtectedRoute>
            <Suspense fallback={<div>Loading admin...</div>}>
              <AdminDashboard />
            </Suspense>
          </ProtectedRoute>}
        />
        <Route
          path="/admin/trips/new"
          element={<ProtectedRoute>
            <Suspense fallback={<div>Loading admin...</div>}>
              <TripForm />
            </Suspense>
          </ProtectedRoute>}
        />
        <Route
          path="/admin/trips/:tripId/edit"
          element={<ProtectedRoute>
            <Suspense fallback={<div>Loading admin...</div>}>
              <TripForm />
            </Suspense>
          </ProtectedRoute>}
        />
        <Route
          path="/admin/categories"
          element={<ProtectedRoute>
            <Suspense fallback={<div>Loading admin...</div>}>
              <CategoryList />
            </Suspense>
          </ProtectedRoute>}
        />

      </Routes>
    </BrowserRouter>
    </MotionLayer>
  );
}

export default App;
