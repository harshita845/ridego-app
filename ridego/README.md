# RideGo 🏍️ — Mobile Ride Booking App

A mobile-first ride-booking app built with React + Node.js, inspired by Rapido and Uber.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, React Router v6, Framer Motion |
| Styling | CSS Variables + inline styles (no Tailwind conflicts) |
| Icons | Lucide React |
| HTTP | Axios |
| Backend | Node.js + Express |
| Database | MongoDB + Mongoose |
| Font | Nunito (Google Fonts) |

---

## Screens Built

- ✅ **Splash Screen** — Brand animation, auto-navigate to Home after 2s
- ✅ **Home Screen** — Greeting, city chips (scrollable), ride category cards with stagger animation
- ✅ **Ride Options Screen** — All 3 rides with fare, spring-animated card selection, proceed button
- ✅ **Confirm Screen** — Trip summary, fare breakdown, Book Now with 3-phase loading state
- ✅ **Tracking Screen** — Driver card, 4-step animated progress, ETA countdown timer

---

## Setup Instructions

### 1. Clone the repo

```bash
git clone <your-repo-url>
cd ridego
```

### 2. Backend Setup

```bash
cd ridego-server
npm install
cp .env.example .env      # Edit MONGO_URI if needed
node seed.js              # Seed the rides collection (run once)
npm run dev               # Start server on http://localhost:5000
```

### 3. Frontend Setup

```bash
cd ridego-client
npm install
cp .env.example .env      # REACT_APP_API_URL=http://localhost:5000
npm start                 # Opens http://localhost:3000
```

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/rides` | Fetch all 3 ride tiers |
| POST | `/api/bookings` | Create booking, returns driver info |
| GET | `/api/bookings/:id` | Fetch booking by ID |

### POST /api/bookings — Request Body
```json
{
  "destination": "Pune",
  "rideType": "Auto",
  "fare": 1816
}
```

### POST /api/bookings — Response
```json
{
  "bookingId": "64f3a1b2c9e4d5f6a7b8c9d0",
  "driverName": "Ravi K.",
  "vehicleNo": "MH 12 AB 4321",
  "rating": 4.8,
  "status": "confirmed",
  "fare": 1816
}
```

---

## Design Decisions

**Color Palette**: Brand orange `#E8500A` on a dark navy `#1A1A2E` splash, with a clean `#F7F7F7` background for all other screens. Consistent brand-light `#FFF0EB` tints for selected states.

**Font**: Nunito — chosen for its rounded, friendly character that feels approachable on mobile without being childish. Weights 400–900 used across the scale.

**Animation Library**: Framer Motion for all spring animations, stagger effects, and AnimatePresence transitions. CSS animations used only for the shimmer skeleton and spinner (more performant for continuous loops).

**Architecture**: All API calls in `services/api.js`, logic in custom hooks (`useRides`, `useBooking`), global state in `BookingContext`, zero prop-drilling.

---

## Edge Cases Handled

1. API fails → Skeleton cards stay + retry button + error message
2. `/ride-options` without destination → Redirect to `/home`
3. `/confirm` without ride selected → Redirect to `/ride-options`
4. POST booking fails → Toast notification + button resets
5. Double-tap Book Now → `isSubmitting` ref prevents duplicate calls
6. Proceed button with no selection → Non-interactive (disabled state)
7. ETA countdown at `00:00` → Timer stops, fade-in arrival message
8. 320px wide → No overflow, responsive phone frame

---

## Known Issues

- Map view is not implemented (no GPS/Maps API used — coordinates are static)
- DiceBear avatar requires internet connection for driver avatars
- No real authentication (mock user only)
