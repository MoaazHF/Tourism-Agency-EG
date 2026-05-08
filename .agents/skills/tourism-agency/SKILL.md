# Route d'Égypte — Luxury Tourism Platform Skill

This skill provides context and patterns for the Route d'Égypte project, a premium multilingual travel platform built with React and Supabase.

## Tech Stack

- **Framework**: React 19 + Vite 8
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS 4.0
- **Animations**: Framer Motion
- **Internationalization**: i18next + react-i18next
- **Icons**: Lucide React
- **Routing**: React Router Dom 7

## Project Structure

- `src/components/`: Reusable UI components (MotionReveal, Counter, etc.).
- `src/pages/`: Main application views (Home, TripDetails, etc.).
- `src/i18n/`: Internationalization configuration and `locales/` (EN, FR, AR).
- `src/lib/`: Core libraries and clients (e.g., `supabaseClient.js`).
- `src/hooks/`: Custom React hooks for data fetching and UI logic.
- `src/context/`: React Context providers for global state.
- `src/data/`: Static or local data definitions.
- `supabase/`: SQL schema (`schema.sql`) and seed data (`seed-data.sql`).

## Development Patterns

### 🌍 Internationalization (i18n)
- Config logic in `src/i18n/config.js`.
- Locales stored as JSON in `src/i18n/locales/`.
- Use the `useTranslation` hook or `<Trans />` component.
- Supports English (`en`), French (`fr`), and Arabic (`ar`).

### ⚡ Database & Supabase
- Client instance in `src/lib/supabaseClient.js`.
- Schema is relational with three primary tables: `categories`, `trips`, and `bookings`.
- RLS (Row Level Security) is enabled for all tables.
- Public read access is allowed; admin operations require authentication.

### 🎨 Styling & Motion
- Uses Tailwind CSS 4 for utility-first styling.
- Framer Motion for scroll-triggered animations and fluid transitions.
- Maintain premium/luxury aesthetics (serif typography, subtle gradients).

## Key Workflows

- **Local Dev**: `npm run dev`
- **Build**: `npm run build`
- **Sync Schema**: Reference `supabase/schema.sql` for table updates.

## Guidelines
- Follow Right-to-Left (RTL) layout consistency for Arabic.
- Prioritize high-performance, accessible components.
- Ensure all content is localizable via i18n JSONs.
