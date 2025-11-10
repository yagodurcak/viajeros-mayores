import { AccessibilityFilter } from '@/types/hotel';

interface AccessibilityFiltersProps {
  filters: AccessibilityFilter[];
  onFilterChange: (filterId: string) => void;
}

export default function AccessibilityFilters({
  filters,
  onFilterChange,
}: AccessibilityFiltersProps) {
  return (
    <div
      className="rounded-lg p-6 border-2"
      style={{ backgroundColor: '#FFF5F4', borderColor: '#E36E4A' }}
    >
      <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center">
        <svg
          className="w-6 h-6 mr-2"
          style={{ color: '#E36E4A' }}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
        </svg>
        Filtros de Accesibilidad
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {filters.map((filter) => (
          <label
            key={filter.id}
            className={`relative overflow-hidden rounded-xl transition-all duration-300 cursor-pointer group ${
              filter.enabled
                ? 'shadow-lg transform scale-[1.02]'
                : 'shadow-md hover:shadow-lg hover:transform hover:scale-[1.01]'
            }`}
            style={{
              background: filter.enabled
                ? 'linear-gradient(135deg, #E36E4A 0%, #F4916F 100%)'
                : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
            }}
          >
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                    filter.enabled ? 'bg-white bg-opacity-20' : 'bg-orange-50'
                  }`}
                >
                  <span
                    className="text-lg"
                    style={{
                      color: filter.enabled ? '#ffffff' : '#E36E4A',
                    }}
                  >
                    {filter.icon === 'fas fa-wheelchair-move' && '♿'}
                    {filter.icon === 'fas fa-elevator' && '🛗'}
                    {filter.icon === 'fas fa-toilet' && '🚽'}
                    {filter.icon === 'fas fa-shower' && '🚿'}
                    {filter.icon === 'fas fa-sign-language' && '🤟'}
                    {filter.icon === 'fas fa-door-open' && '🚪'}
                  </span>
                </div>
                <div
                  onClick={() => onFilterChange(filter.id)}
                  className={`w-5 h-5 rounded-md border-2 flex items-center justify-center cursor-pointer transition-all ${
                    filter.enabled
                      ? 'bg-white/20 border-white'
                      : 'bg-transparent border-gray-300'
                  }`}
                >
                  {filter.enabled && (
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
              </div>
              <div>
                <h4
                  className={`font-semibold text-sm mb-2 leading-tight ${
                    filter.enabled ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {filter.name}
                </h4>
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs ${
                      filter.enabled
                        ? 'text-white text-opacity-80'
                        : 'text-gray-500'
                    }`}
                  >
                    {filter.count} propiedades
                  </span>
                  <div
                    className={`px-2 py-1 rounded-full text-xs font-medium`}
                    style={{
                      backgroundColor: filter.enabled
                        ? 'rgba(255, 255, 255, 0.2)'
                        : '#E36E4A',
                      color: filter.enabled ? '#ffffff' : '#ffffff',
                    }}
                  >
                    {filter.count}
                  </div>
                </div>
              </div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
