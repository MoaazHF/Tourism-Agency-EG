import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import RootLayout from './components/RootLayout';
import Home from './pages/Home';

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
            <Route path="felucca" element={<EmptyPage title="Felucca Cruises" />} />
            <Route path="dahabeya" element={<EmptyPage title="Dahabeya Cruises" />} />
            <Route path="ship-tours" element={<EmptyPage title="Cruise Ship Tours" />} />
            <Route path="lake-nasser" element={<EmptyPage title="Cruise on Lake Nasser" />} />
          </Route>

          <Route path="excursions">
            <Route path="cairo" element={<EmptyPage title="Starting from Cairo" />} />
            <Route path="luxor" element={<EmptyPage title="Luxor & Its Region" />} />
            <Route path="aswan" element={<EmptyPage title="Aswan & Its Region" />} />
            <Route path="gouna-hurghada-safaga" element={<EmptyPage title="From El Gouna / Hurghada / Safaga" />} />
            <Route path="marsa-alam" element={<EmptyPage title="Starting from Marsa Alam" />} />
            <Route path="sinai" element={<EmptyPage title="Starting from Southern Sinai" />} />
          </Route>

          <Route path="about" element={<EmptyPage title="Who Are We?" />} />
          <Route path="contact" element={<EmptyPage title="Contact" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
