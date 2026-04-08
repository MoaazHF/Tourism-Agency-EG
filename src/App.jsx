import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import RootLayout from './components/RootLayout';
import Home from './pages/Home';
import TripDetails from './pages/TripDetails';

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
          
          <Route path="cruises" element={<EmptyPage title="Cruises Overview" />} />
          <Route path="cruises/:tripId" element={<TripDetails />} />
          <Route path="safari" element={<EmptyPage title="Safari Overview" />} />
          <Route path="safari/:tripId" element={<TripDetails />} />
          <Route path="tours" element={<EmptyPage title="Tours Overview" />} />
          <Route path="tours/:tripId" element={<TripDetails />} />
          <Route path="excursions" element={<EmptyPage title="Excursions Overview" />} />
          <Route path="excursions/:tripId" element={<TripDetails />} />

          <Route path="about" element={<EmptyPage title="Who Are We?" />} />
          <Route path="contact" element={<EmptyPage title="Contact" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
