'use client';

import { useSearchParams } from 'next/navigation';
import { useHotelSearch } from './hooks/useHotelSearch';
import HotelSearchForm from '@/components/HotelSearchForm/HotelSearchForm';
import AccessibilityBanner from './components/AccessibilityBanner';
import AccessibilityFilters from './components/AccessibilityFilters';
import PriceRangeFilter from './components/PriceRangeFilter';
import SortOptions from './components/SortOptions';
import HotelList from './components/HotelList';

export default function HotelSearchPage() {
  const searchParams = useSearchParams();
  const {
    loading,
    hotels,
    totalCount,
    filters,
    priceRange,
    sortBy,
    updateAccessibilityFilters,
    updatePriceRange,
    updateSortBy,
    handleSearch,
  } = useHotelSearch(searchParams);

  const destination = searchParams.get('destination') || 'Roma';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Section */}
      <div className="bg-white py-8 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6">
          <HotelSearchForm
            onSearch={(params) => {
              handleSearch({
                destination: params.destination,
                checkIn: params.checkIn,
                checkOut: params.checkOut,
                guests: parseInt(params.guests) || 2,
                priceRange: priceRange,
                accessibilityFeatures: filters
                  .filter((f) => f.enabled)
                  .map((f) => f.id),
                sortBy: sortBy,
              });
            }}
            redirectToResults={false}
          />
        </div>
      </div>

      {/* Accessibility Banner */}
      <AccessibilityBanner />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-6">
        {/* Accessibility Filters */}
        <div className="mb-6">
          <AccessibilityFilters
            filters={filters}
            onFilterChange={updateAccessibilityFilters}
          />
        </div>

        {/* Results Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {destination}: {totalCount.toLocaleString()} alojamientos encontrados
            </h2>
          </div>
          <SortOptions value={sortBy} onChange={updateSortBy} />
        </div>

        {/* Results Layout */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Sidebar - Filters */}
          <div className="w-full lg:w-80 space-y-6">
            <PriceRangeFilter range={priceRange} onChange={updatePriceRange} />
          </div>

          {/* Right Side - Results */}
          <div className="flex-1">
            <HotelList hotels={hotels} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
}
