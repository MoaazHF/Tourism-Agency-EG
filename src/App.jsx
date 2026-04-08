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
          
          <Route path="cruises">
            <Route path="felucca" element={<TripDetails title="Felucca Cruises" />} />
            <Route path="dahabeya" element={<TripDetails title="Dahabeya Cruises" />} />
            <Route path="ship-tours" element={<TripDetails title="Cruise Ship Tours" />} />
            <Route path="lake-nasser" element={<TripDetails title="Cruise on Lake Nasser" />} />
          </Route>

          <Route path="excursions">
            <Route path="cairo" element={<TripDetails title="Starting from Cairo" />} />
            <Route path="luxor" element={<TripDetails title="Luxor & Its Region" />} />
            <Route path="aswan" element={<TripDetails title="Aswan & Its Region" />} />
            <Route path="gouna-hurghada-safaga" element={<TripDetails title="From El Gouna / Hurghada / Safaga" />} />
            <Route path="marsa-alam" element={<TripDetails title="Starting from Marsa Alam" />} />
            <Route path="sinai" element={<TripDetails title="Starting from Southern Sinai" />} />
          </Route>

          <Route path="about" element={<EmptyPage title="Who Are We?" />} />
          <Route path="contact" element={<EmptyPage title="Contact" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
