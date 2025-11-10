import MapComponent from '@/components/MapComponent/MapComponent';

const MapsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            Analizador de Pendientes
          </h1>
          <p className="text-lg text-gray-600">
            Calcula y visualiza las pendientes de rutas para una mejor
            planificación de tus viajes a pie. Ideal para personas con movilidad
            reducida.
          </p>
        </div>

        {/* Map Component */}
        <div className="rounded-lg bg-white p-6 shadow-lg">
          <MapComponent />
        </div>
      </div>
    </div>
  );
};

export default MapsPage;
