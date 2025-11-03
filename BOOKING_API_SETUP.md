# 🏨 Booking.com API Integration

## ✅ What's Implemented

### 1. Search Locations Endpoint

This endpoint allows searching for cities, airports, districts, and landmarks.

**Files Created:**

- `types/booking.ts` - TypeScript types for API responses
- `lib/booking-api.ts` - API utility functions
- `hooks/useLocationSearch.ts` - React hook for location search
- `components/LocationSearch/` - UI component for location search (integrated in HotelSearchForm)

## 🔧 Setup Instructions

### 1. Create `.env.local` file in the root directory

```bash
# Booking.com API (RapidAPI)
NEXT_PUBLIC_RAPIDAPI_KEY=
NEXT_PUBLIC_RAPIDAPI_HOST=booking-com.p.rapidapi.com
```

### 2. Restart your development server

```bash
npm run dev
```

## 📚 Usage Examples

### Using the Hook Directly

```typescript
import { useLocationSearch } from '@/hooks/useLocationSearch';

const MyComponent = () => {
  const { locations, loading, error, search } = useLocationSearch({
    minChars: 2,
    debounceMs: 300,
    locale: 'en-gb'
  });

  const handleSearch = (query: string) => {
    search(query);
  };

  return (
    <div>
      <input onChange={(e) => handleSearch(e.target.value)} />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {locations.map(loc => (
        <div key={loc.dest_id}>{loc.name}</div>
      ))}
    </div>
  );
};

export default MyComponent;
```

### Using the LocationSearch Component

```typescript
import LocationSearch from '@/components/LocationSearch/LocationSearch';
import { LocationSearchResult } from '@/types/booking';

const MyComponent = () => {
  const handleSelectLocation = (location: LocationSearchResult) => {
    console.log('Selected:', location);
    // Use location.dest_id and location.dest_type for hotel search
  };

  return (
    <LocationSearch
      onSelectLocation={handleSelectLocation}
      placeholder="🔍 Search for a city..."
    />
  );
};

export default MyComponent;
```

### Integrated in HotelSearchForm

The `LocationSearch` component is already integrated in the `HotelSearchForm`:

```typescript
import HotelSearchForm from '@/components/HotelSearchForm/HotelSearchForm';

const MyPage = () => {
  const handleSearch = (params: {
    destination: string;
    checkIn: Date;
    checkOut: Date;
    guests: string;
    destId?: string;      // ✅ Booking.com destination ID
    destType?: string;    // ✅ Booking.com destination type
  }) => {
    console.log('Search params:', params);
    // Use params.destId and params.destType for API calls
  };

  return (
    <HotelSearchForm
      onSearch={handleSearch}
      redirectToResults={true}  // or false to handle manually
    />
  );
};

export default MyPage;
```

**What it provides:**

- ✅ Autocomplete location search with real Booking.com data
- ✅ Returns `destId` and `destType` needed for hotel search API
- ✅ Validates that user selects from dropdown (not free text)
- ✅ Shows selected destination below input
- ✅ Fully styled to match the form design

## 🔍 API Response Structure

### LocationSearchResult Type

```typescript
interface LocationSearchResult {
  dest_id: string; // Use this for hotel search
  dest_type: string; // Use this for hotel search
  name: string; // Location name
  label: string; // Full formatted label
  country: string; // Country name
  region: string; // Region/state
  city_name: string; // City name
  type: 'ci' | 'di' | 'ai' | 'la'; // city, district, airport, landmark
  latitude: number;
  longitude: number;
  nr_hotels: number; // Number of hotels available
  timezone: string;
  image_url: string;
  // ... more fields
}
```

## 🎯 Next Steps

To complete the hotel search functionality, we need to implement:

1. **Search Hotels Endpoint** - Main hotel search with filters
2. **Hotel Details Endpoint** - Get detailed info about a specific hotel
3. **Room List Endpoint** - Get available rooms for a hotel
4. **Hotel Filters** - Accessibility filters, price range, amenities, etc.

### What I Need from You:

To implement the hotel search, please share:

1. Example response from **"Search hotels"** endpoint
2. Example response from **"Hotel data"** endpoint
3. Example response from **"Room list of the hotel"** endpoint

You can get these by testing the endpoints in RapidAPI playground.

## 📝 Notes

- Search is debounced (300ms) to avoid too many API calls
- Minimum 2 characters required to trigger search
- Supports cities, airports, landmarks, and districts
- Returns location image URLs from Booking.com
- Each location includes number of available hotels

## 🐛 Troubleshooting

**API Key not working?**

- Make sure `.env.local` exists in project root
- Restart your Next.js dev server after creating `.env.local`
- Check that the API key is correct in RapidAPI

**No results showing?**

- Check browser console for errors
- Verify API key has sufficient quota
- Try different search terms

**TypeScript errors?**

- Run `npm run build` to check for type errors
- Make sure all imports are correct
