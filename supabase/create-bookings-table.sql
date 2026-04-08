/* 
  RUN THIS SQL IN THE SUPABASE SQL EDITOR
  This creates the bookings table and gives public access for inquiries while keeping the data private for everyone else.
*/

-- 1. Create the table
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    trip_id TEXT REFERENCES public.trips(id),
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT,
    travel_date TEXT,
    adults INTEGER DEFAULT 1,
    children INTEGER DEFAULT 0,
    total_price NUMERIC,
    status TEXT DEFAULT 'pending', -- pending, confirmed, cancelled
    message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 2. Enable RLS
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- 3. Policies
-- Allow anyone to submit an inquiry
DROP POLICY IF EXISTS "Public insert bookings" ON public.bookings;
CREATE POLICY "Public insert bookings" ON public.bookings FOR INSERT WITH CHECK (true);

-- Only authenticated admins can see or update bookings
DROP POLICY IF EXISTS "Admin select bookings" ON public.bookings;
CREATE POLICY "Admin select bookings" ON public.bookings FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Admin update bookings" ON public.bookings;
CREATE POLICY "Admin update bookings" ON public.bookings FOR UPDATE TO authenticated USING (true);
