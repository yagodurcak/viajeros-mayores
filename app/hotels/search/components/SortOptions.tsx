interface SortOptionsProps {
  value: 'price' | 'rating' | 'distance';
  onChange: (value: 'price' | 'rating' | 'distance') => void;
}

export default function SortOptions({ value, onChange }: SortOptionsProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Sort by:</span>
        <select
          value={value}
          onChange={(e) =>
            onChange(e.target.value as 'price' | 'rating' | 'distance')
          }
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6F61]"
        >
          <option value="rating">Our top picks</option>
          <option value="price">Price (lowest first)</option>
          <option value="distance">Distance from center</option>
        </select>
      </div>
      <div className="flex items-center gap-2">
        <button className="px-3 py-2 bg-[#FF6F61] text-white rounded-lg text-sm font-medium hover:bg-[#E85A4F] transition-colors">
          List
        </button>
        <button className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors">
          Map
        </button>
      </div>
    </div>
  );
}
