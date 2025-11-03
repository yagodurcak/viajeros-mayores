'use client';

import { useState, FormEvent } from 'react';

// Definimos un tipo para los datos que esperamos de la API
interface Promotion {
  promotionId: number;
  title: string;
  description: string;
  urlTracking: string; // ¡Este es tu enlace de afiliado!
}

export default function BookingSearch() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('ofertas playa');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setPromotions([]);

    try {
      // Llamamos a NUESTRA API route, no directamente a Awin
      const response = await fetch(
        `/api/booking?query=${encodeURIComponent(searchTerm)}`
      );

      if (!response.ok) {
        throw new Error('No se pudieron obtener los datos.');
      }

      const data: Promotion[] = await response.json();
      setPromotions(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Buscar Ofertas de Booking.com</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Ej: hotel en Madrid"
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Buscando...' : 'Buscar'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {promotions.length > 0 && (
        <ul>
          {promotions.map((promo) => (
            <li key={promo.promotionId}>
              <h3>{promo.title}</h3>
              <p>{promo.description}</p>
              {/* Este es el enlace que monetizas */}
              <a
                href={promo.urlTracking}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver Oferta
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
