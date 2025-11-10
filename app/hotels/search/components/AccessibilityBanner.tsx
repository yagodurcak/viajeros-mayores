export default function AccessibilityBanner() {
  return (
    <div
      className="py-3"
      style={{ backgroundColor: '#FFF5F4', borderLeft: '4px solid #E36E4A' }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-center">
          <svg
            className="w-6 h-6 mr-3"
            style={{ color: '#E36E4A' }}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
          </svg>
          <p className="font-medium" style={{ color: '#C94A3F' }}>
            Hoteles accesibles para todos — encuentra alojamiento adaptado a tus
            necesidades
          </p>
        </div>
      </div>
    </div>
  );
}
