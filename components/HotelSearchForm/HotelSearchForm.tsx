'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import LocationSearch from '@/components/LocationSearch/LocationSearch';
import { LocationSearchResult } from '@/types/booking';

interface HotelSearchFormProps {
  onSearch?: (params: {
    destination: string;
    checkIn: Date;
    checkOut: Date;
    guests: string;
    destId?: string;
    destType?: string;
  }) => void;
  redirectToResults?: boolean;
}

const HotelSearchForm: React.FC<HotelSearchFormProps> = ({
  onSearch,
  redirectToResults = true,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [destination, setDestination] = useState(
    searchParams?.get('destination') || ''
  );
  const [destId, setDestId] = useState(searchParams?.get('destId') || '');
  const [destType, setDestType] = useState(searchParams?.get('destType') || '');
  const [guests, setGuests] = useState(
    searchParams?.get('guests') || '2 adults'
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [hasSelectedDates, setHasSelectedDates] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      key: 'selection',
    },
  ]);

  // Load initial dates from URL params
  useEffect(() => {
    const checkInParam = searchParams?.get('checkIn');
    const checkOutParam = searchParams?.get('checkOut');

    if (checkInParam && checkOutParam) {
      setDateRange([
        {
          startDate: new Date(checkInParam),
          endDate: new Date(checkOutParam),
          key: 'selection',
        },
      ]);
      setHasSelectedDates(true);
    }
  }, [searchParams]);

  const handleSelect = (ranges: {
    selection: { startDate: Date; endDate: Date; key: string };
  }) => {
    setDateRange([ranges.selection]);
    setHasSelectedDates(true);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatDateForAPI = (date: Date) => {
    return date.toISOString().split('T')[0]; // YYYY-MM-DD format
  };

  const handleLocationSelect = (location: LocationSearchResult) => {
    setDestination(location.label);
    setDestId(location.dest_id);
    setDestType(location.dest_type);
  };

  const handleSearch = async () => {
    if (!destination.trim()) {
      alert('Please select a destination');
      return;
    }

    if (!destId || !destType) {
      alert('Please select a destination from the dropdown');
      return;
    }

    setIsSearching(true);

    try {
      const searchData = {
        destination: destination.trim(),
        checkIn: dateRange[0].startDate,
        checkOut: dateRange[0].endDate,
        guests: guests,
        destId: destId,
        destType: destType,
      };

      // If onSearch callback is provided, use it
      if (onSearch) {
        onSearch(searchData);
        setIsSearching(false);
        return;
      }

      // Otherwise, redirect to search results page
      if (redirectToResults) {
        const params = new URLSearchParams({
          destination: searchData.destination,
          checkIn: formatDateForAPI(searchData.checkIn),
          checkOut: formatDateForAPI(searchData.checkOut),
          guests: searchData.guests,
          destId: destId,
          destType: destType,
        });

        router.push(`/hotels/search?${params.toString()}`);
      }
    } catch (error) {
      console.error('Search error:', error);
      alert('Error searching for hotels. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-2xl relative">
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        {/* Destination */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
            Destination
          </label>
          <LocationSearch
            onSelectLocation={handleLocationSelect}
            placeholder="🗺️ Where are we going?"
            className="w-full"
          />
          {destination && (
            <div className="text-xs text-gray-600 mt-1 text-left">
              Selected: {destination}
            </div>
          )}
        </div>

        {/* Dates - Click to open date picker */}
        <div className="relative md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
            Dates
          </label>
          <button
            type="button"
            onClick={() => setShowDatePicker(!showDatePicker)}
            className="w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6F61] text-sm text-left bg-white hover:bg-gray-50 transition-colors"
          >
            {hasSelectedDates ? (
              <span className="text-gray-800">
                {formatDate(dateRange[0].startDate)} -{' '}
                {formatDate(dateRange[0].endDate)}
              </span>
            ) : (
              <span className="text-gray-500">Check-in - Check-out</span>
            )}
          </button>
          <i className="fas fa-calendar-alt absolute right-3 top-10 text-gray-400 pointer-events-none" />

          {/* Date Range Picker Dropdown */}
          {showDatePicker && (
            <div className="absolute top-full left-0 z-50 mt-2 bg-white rounded-lg shadow-xl border border-gray-200">
              <DateRangePicker
                ranges={dateRange}
                onChange={handleSelect}
                rangeColors={['#FF6F61']}
                months={2}
                direction="horizontal"
                showSelectionPreview={true}
                moveRangeOnFirstSelection={false}
                className="rounded-lg"
              />
              <div className="p-4 border-t border-gray-200">
                <button
                  onClick={() => setShowDatePicker(false)}
                  className="w-full bg-[#FF6F61] hover:bg-[#E85A4F] text-white py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  Apply dates
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Guests */}
        <div className="relative md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
            Guests
          </label>
          <input
            type="text"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="w-full px-4 py-3 pr-10 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6F61] text-sm"
            placeholder="Number of travelers"
          />
          <i className="fas fa-user absolute right-3 top-10 text-gray-400 text-sm" />
        </div>

        {/* Search button */}
        <div className="flex flex-col justify-end">
          <button
            onClick={handleSearch}
            disabled={isSearching || !destination.trim() || !destId}
            className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
              isSearching || !destination.trim() || !destId
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[#FF6F61] hover:bg-[#E85A4F] hover:shadow-lg transform hover:scale-105'
            } text-white`}
          >
            {isSearching ? (
              <div className="flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Searching...
              </div>
            ) : (
              'Search'
            )}
          </button>
        </div>
      </div>

      {/* Overlay to close date picker */}
      {showDatePicker && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowDatePicker(false)}
        />
      )}
    </div>
  );
};

export default HotelSearchForm;
