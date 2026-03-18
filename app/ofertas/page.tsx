import { generateSEOMetadata } from '@/lib/seo-config';
import OfertasClient from './OfertasClient';

export const metadata = generateSEOMetadata({
  title: 'Ofertas de Viaje para Mayores — Hoteles, Vuelos, Cruceros y Seguros',
  description:
    'Descuentos exclusivos en hoteles, vuelos, cruceros y seguros de viaje para adultos mayores. Ofertas verificadas con atención en español.',
  url: '/ofertas',
  tags: [
    'ofertas de viaje para mayores',
    'hoteles con descuento senior',
    'vuelos baratos tercera edad',
    'cruceros para mayores de 60',
    'seguros de viaje senior',
    'ofertas turismo accesible',
  ],
});

export default function OfertasPage() {
  return <OfertasClient />;
}
