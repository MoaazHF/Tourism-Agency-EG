import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import RootLayout from './components/RootLayout';
import Home from './pages/Home';
import TripDetails from './pages/TripDetails';
import ListingPage from './pages/ListingPage';

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
