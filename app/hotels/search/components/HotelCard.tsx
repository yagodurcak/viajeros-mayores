import { Hotel } from '@/types/hotel';

interface HotelCardProps {
  hotel: Hotel;
}

export default function HotelCard({ hotel }: HotelCardProps) {
  const formatPrice = (price: number) => {
    return `${hotel.currency} ${price.toLocaleString()}`;
  };

  const getAccessibilityScore = () => {
    // Calcular score basado en features de accesibilidad
    const baseScore = hotel.rating;
    const accessibilityBonus = hotel.accessibilityFeatures.length * 0.1;
    return Math.min(10, baseScore + accessibilityBonus).toFixed(1);
  };

  const getAccessibilityLabel = (feature: string) => {
    const labels: { [key: string]: { icon: string; text: string } } = {
      ramp: { icon: '♿', text: 'Access ramp' },
      elevator: { icon: '🛗', text: 'Accessible elevator' },
      raisedToilet: { icon: '🚽', text: 'Raised toilet' },
      levelShower: { icon: '🚿', text: 'Roll-in shower' },
      signLanguage: { icon: '🤟', text: 'Trained staff' },
      levelRooms: { icon: '🚪', text: 'Step-free' },
    };
    return labels[feature] || { icon: '✓', text: feature };
  };

  const getRatingLabel = () => {
    if (hotel.rating >= 9) return 'Exceptional';
    if (hotel.rating >= 8.5) return 'Fantastic';
    if (hotel.rating >= 8) return 'Fabulous';
    if (hotel.rating >= 7) return 'Very good';
    return 'Good';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow p-4">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Image */}
        <div className="w-full md:w-64 h-48 overflow-hidden rounded-lg flex-shrink-0">
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
            <span className="text-gray-400 text-4xl">🏨</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row items-start justify-between gap-4">
            {/* Left side - Details */}
            <div className="flex-1">
              <h3 className="text-xl font-bold text-[#E36E4A] mb-1 hover:underline cursor-pointer">
                {hotel.name}
                <span className="text-yellow-500 ml-2">★★★★</span>
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                <svg
                  className="inline w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                {hotel.location} · Show on map
              </p>
              <p className="text-sm text-gray-600 mb-3">
                {hotel.distanceFromCenter} km from center · Near subway
              </p>

              {/* Accessibility Tags */}
              <div className="flex flex-wrap gap-2 mb-3">
                {hotel.accessibilityFeatures.map((feature) => {
                  const label = getAccessibilityLabel(feature);
                  return (
                    <span
                      key={feature}
                      className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs flex items-center gap-1"
                    >
                      <span>{label.icon}</span>
                      {label.text}
                    </span>
                  );
                })}
              </div>

              {/* Room Info */}
              <div className="text-sm text-gray-700">
                <p className="font-semibold">{hotel.roomType}</p>
                <p>{hotel.beds} large double bed</p>
                <p className="text-green-600 font-medium">Breakfast included</p>
              </div>
            </div>

            {/* Right side - Ratings & Price */}
            <div className="text-right flex-shrink-0">
              {/* Rating */}
              <div className="flex items-center justify-end mb-2">
                <div className="text-right mr-2">
                  <div className="text-sm text-gray-600">
                    {getRatingLabel()}
                  </div>
                  <div className="text-xs text-gray-500">
                    {hotel.reviewCount.toLocaleString()} reviews
                  </div>
                </div>
                <div
                  className="px-2 py-1 rounded font-bold text-white"
                  style={{ backgroundColor: '#003580' }}
                >
                  {hotel.rating.toFixed(1)}
                </div>
              </div>

              {/* Accessibility Score */}
              <div className="flex items-center justify-end mb-4">
                <div className="text-right mr-2">
                  <div className="text-sm text-gray-600">Accessibility</div>
                  <div className="text-xs text-gray-500">Our score</div>
                </div>
                <div className="bg-[#E36E4A] text-white px-2 py-1 rounded font-bold">
                  {getAccessibilityScore()}
                </div>
              </div>

              {/* Price */}
              <div className="text-right">
                <div className="text-sm text-gray-600">1 night, 2 adults</div>
                <div className="text-2xl font-bold text-gray-900">
                  {formatPrice(hotel.pricePerNight)}
                </div>
                <div className="text-xs text-gray-500">
                  + {formatPrice(Math.round(hotel.pricePerNight * 0.1))} in
                  taxes
                </div>
                <button className="bg-[#E36E4A] text-white px-6 py-2 rounded mt-2 hover:bg-[#E85A4F] transition-colors font-semibold">
                  View availability
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
