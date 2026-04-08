-- CLEAR EXISTING DATA (Optional, but ensures a clean slate)
-- DELETE FROM trips;
-- DELETE FROM categories;

-- 1. INSERT CATEGORIES
INSERT INTO categories (slug, title, subtitle, hero_image, intro_title, intro_text) VALUES
('cruises', 'Signature Cruises', 'On The Nile', 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?q=80&w=2070&auto=format&fit=crop', 'Experience the Nile on a Private Felucca', ARRAY['Sail like the Ancients on a traditional wooden boat.', 'Luxury meets authenticity on the world''s longest river.']),
('safari', 'Desert Safari', 'Off the beaten path', 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=2076&auto=format&fit=crop', 'The White Desert Expedition', ARRAY['Explore the surreal landscapes of Farafra and Bahariya.', 'Sleep under the Milky Way in the silent sands.']),
('tours', 'Tours & Packages', 'Curated Itineraries', 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?q=80&w=2070&auto=format&fit=crop', 'Classics of Ancient Egypt', ARRAY['From the Great Pyramids to the Valley of the Kings.', 'A journey through 5,000 years of history with expert guides.']),
('excursions', 'Day Trips', 'Excursions', 'https://images.unsplash.com/photo-1544013919-4bb5cb303cfa?q=80&w=2069&auto=format&fit=crop', 'One Day in Memphis & Sakkara', ARRAY['Discover the step pyramid and the colossus of Ramses II.', 'Perfect for short stays in Cairo.']);

-- 2. INSERT SAMPLE TRIPS
INSERT INTO trips (
    id, category_slug, title, short_description, category_label, 
    duration, trip_type, group_size, price_per_person, is_featured, images, itinerary
) VALUES
-- CRUISES
('felucca-adventure', 'cruises', 'Private Felucca Adventure', 'A 4-day private journey from Aswan to Edfu on a traditional sailing boat.', 'Most Authentic', '4 Days', 'Nile Cruise', 'Private (2-6 pers)', 450, true, 
 ARRAY['https://images.unsplash.com/photo-1563725628574-0f2c16127e90?q=80&w=1974&auto=format&fit=crop', 'https://images.unsplash.com/photo-1563725628212-09419b48feba?q=80&w=1974&auto=format&fit=crop'],
 '[{"day": 1, "title": "Aswan Departure", "description": "Board your private felucca and sail towards the Elephantine Island."}, {"day": 2, "title": "Kom Ombo", "description": "Visit the dual temple of Sobek and Haroeris."}]'::jsonb),

('dahabiya-luxury', 'cruises', 'Luxury Dahabiya Cruise', 'The ultimate high-end cruise experience on the Nile between Esna and Aswan.', 'Premium Luxury', '6 Days', 'Luxury Cruise', 'Max 12 pers', 1250, true, 
 ARRAY['https://images.unsplash.com/photo-1551041777-ed07fa5b4260?q=80&w=2070&auto=format&fit=crop'],
 '[{"day": 1, "title": "Esna Boarding", "description": "Luxurious welcome on your traditional Dahabiya."}]'::jsonb),

-- SAFARI
('white-desert-safari', 'safari', 'The Crystal Deserts', 'A 4x4 expedition through the Black and White Deserts with overnight camping.', 'Expert Choice', '3 Days', 'Expedition', 'Private 4x4', 380, true, 
 ARRAY['https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?q=80&w=2070&auto=format&fit=crop'],
 '[{"day": 1, "title": "Bahariya Oasis", "description": "Arrive at the gateway of the desert."}]'::jsonb),

-- TOURS
('egypt-classic', 'tours', 'The Eternal Egypt', 'Experience Cairo, Luxor, and Aswan in 10 spectacular days.', 'Best Seller', '10 Days', 'Full Package', 'Small Group', 1850, true, 
 ARRAY['https://images.unsplash.com/photo-1568322422390-30cfbb2bb291?q=80&w=1964&auto=format&fit=crop'],
 '[{"day": 1, "title": "Cairo Arrival", "description": "Welcome to the land of the Pharaohs."}]'::jsonb),

-- EXCURSIONS
('giza-private-tour', 'excursions', 'Pyramids & Sphinx Private Tour', 'Half-day tour of the Giza plateau with an expert Egyptologist.', 'Must See', '4 Hours', 'Day Trip', 'Private', 85, true, 
 ARRAY['https://images.unsplash.com/photo-1539650116574-8efeb43e2750?q=80&w=2070&auto=format&fit=crop'],
 '[{"day": 1, "title": "Giza Plateau", "description": "Stand before the Great Pyramid."}]'::jsonb);
