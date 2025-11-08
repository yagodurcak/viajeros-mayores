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

        {/* Instructions */}
        <div className="mt-8 rounded-lg bg-blue-50 p-6">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Cómo usar el analizador
          </h2>
          <ol className="space-y-3 text-gray-700">
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                1
              </span>
              <span>
                Selecciona tu ubicación de origen (desde) y destino (hasta) en
                el mapa o escríbelas en los campos de búsqueda
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                2
              </span>
              <span>
                Haz clic en el botón &quot;Calcular Pendiente&quot; para
                analizar la ruta seleccionada
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                3
              </span>
              <span>
                Observa cómo la ruta se colorea según las diferentes pendientes
                del terreno
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                4
              </span>
              <span>
                Utiliza la leyenda del mapa para entender el nivel de dificultad
                de cada tramo
              </span>
            </li>
          </ol>
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
