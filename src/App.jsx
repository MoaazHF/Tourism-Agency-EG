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

// Empty page components
const EmptyPage = ({ title }) => (
  <div className="pt-24 px-4 min-h-screen">
    <h1 className="text-3xl font-bold">{title}</h1>
    <p>This is a placeholder page.</p>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ── Public site ───────────────────────────────────── */}
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />

          <Route path="cruises" element={<ListingPage defaultCategory="cruises" />} />
          <Route path="cruises/:tripId" element={<TripDetails />} />
          <Route path="safari" element={<ListingPage defaultCategory="safari" />} />
          <Route path="safari/:tripId" element={<TripDetails />} />
          <Route path="tours" element={<ListingPage defaultCategory="tours" />} />
          <Route path="tours/:tripId" element={<TripDetails />} />
          <Route path="excursions" element={<ListingPage defaultCategory="excursions" />} />
          <Route path="excursions/:tripId" element={<TripDetails />} />

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
  );
}

export default App;
