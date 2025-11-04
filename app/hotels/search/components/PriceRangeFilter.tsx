interface PriceRangeFilterProps {
  range: [number, number];
  onChange: (range: [number, number]) => void;
}

export default function PriceRangeFilter({
  range,
  onChange,
}: PriceRangeFilterProps) {
  const formatPrice = (price: number) => {
    return `$ ${price.toLocaleString()}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h3 className="font-bold text-gray-900 mb-4">
        Tu presupuesto (por noche)
      </h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>
            Desde {formatPrice(range[0])} hasta {formatPrice(range[1])}+
          </span>
        </div>
        <div className="relative">
          <input
            type="range"
            min="60000"
            max="800000"
            value={range[0]}
            onChange={(e) => onChange([parseInt(e.target.value), range[1]])}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#FF6F61]"
          />
        </div>
        <div className="relative">
          <input
            type="range"
            min="60000"
            max="800000"
            value={range[1]}
            onChange={(e) => onChange([range[0], parseInt(e.target.value)])}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#FF6F61]"
          />
        </div>
      </div>
    </div>
  );
}
