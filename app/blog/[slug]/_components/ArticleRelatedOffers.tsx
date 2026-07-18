import Link from 'next/link';

interface Card {
  href: string;
  label: string;
  title: string;
  desc: string;
  icon: string;
}

const BASE_CARDS: Card[] = [
  {
    href: '/ofertas',
    label: 'Ofertas del mes',
    title: 'Descuentos verificados para mayores de 60',
    desc: 'Vuelos, cruceros, hoteles y seguros seleccionados para vos.',
    icon: '🏷️',
  },
  {
    href: '/blog',
    label: 'Más artículos',
    title: 'Guías y consejos de viaje para seniors',
    desc: 'Destinos, tips de salud, equipaje y mucho más.',
    icon: '📖',
  },
];

const CATEGORY_CARD: Record<string, Card> = {
  vuelos: {
    href: '/vuelos',
    label: 'Buscadores recomendados',
    title: 'Buscadores de vuelos para mayores',
    desc: 'Los que usamos para encontrar los mejores precios.',
    icon: '✈️',
  },
  cruceros: {
    href: '/ofertas',
    label: 'Cruceros con descuento',
    title: 'Cruceros verificados para viajeros mayores',
    desc: 'Descuentos exclusivos en salidas desde Buenos Aires y Montevideo.',
    icon: '🚢',
  },
  hoteles: {
    href: '/hoteles',
    label: 'Hoteles recomendados',
    title: 'Hoteles verificados para adultos mayores',
    desc: 'Seleccionados por accesibilidad, tranquilidad y precio.',
    icon: '🏨',
  },
};

interface ArticleRelatedOffersProps {
  category: string;
}

export default function ArticleRelatedOffers({
  category,
}: ArticleRelatedOffersProps) {
  const key = category?.toLowerCase().trim();
  const extra = CATEGORY_CARD[key];
  const cards = extra ? [extra, ...BASE_CARDS] : BASE_CARDS;

  return (
    <div className="not-prose my-10">
      <h2 className="font-alata text-xl font-bold text-gray-900 mb-4">
        También puede interesarte
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => (
          <Link
            key={card.href + card.title}
            href={card.href}
            className="group flex flex-col gap-2 rounded-xl border border-gray-200 bg-white p-5 hover:border-[#E36E4A] hover:shadow-md transition-all duration-200"
          >
            <span className="text-2xl">{card.icon}</span>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#E36E4A]">
              {card.label}
            </span>
            <span className="font-alata font-bold text-gray-900 text-base leading-snug group-hover:text-[#E36E4A] transition-colors">
              {card.title}
            </span>
            <span className="text-sm text-gray-600 leading-relaxed">
              {card.desc}
            </span>
            <span className="mt-auto text-sm font-semibold text-[#E36E4A]">
              Ver más →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
