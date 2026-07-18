import Link from 'next/link';

const CATEGORY_CONFIG: Record<
  string,
  { headline: string; sub: string; cta: string; href: string }
> = {
  vuelos: {
    headline: '¿Buscás vuelos con descuento para mayores?',
    sub: 'Reunimos las mejores ofertas de vuelos verificadas para viajeros de 60+.',
    cta: 'Ver ofertas de vuelos →',
    href: '/ofertas',
  },
  cruceros: {
    headline: 'Descuentos en cruceros para viajeros mayores de 60',
    sub: 'Ofertas de cruceros verificadas personalmente, con precios exclusivos para seniors.',
    cta: 'Ver descuentos en cruceros →',
    href: '/ofertas',
  },
  hoteles: {
    headline: 'Hoteles con descuento para viajeros mayores',
    sub: 'Alojamientos verificados con tarifas especiales para adultos de 60+.',
    cta: 'Ver hoteles recomendados →',
    href: '/hoteles',
  },
  seguros: {
    headline: 'Seguros de viaje para mayores — los que recomendamos',
    sub: 'Coberturas pensadas para adultos mayores, con precios actualizados.',
    cta: 'Ver seguros recomendados →',
    href: '/ofertas',
  },
};

const DEFAULT_CONFIG = {
  headline: 'Ofertas verificadas para viajeros mayores de 60',
  sub: 'Reunimos descuentos en vuelos, cruceros, hoteles y seguros seleccionados para vos.',
  cta: 'Ver todas las ofertas →',
  href: '/ofertas',
};

interface ArticleOfferCtaProps {
  category: string;
}

export default function ArticleOfferCta({ category }: ArticleOfferCtaProps) {
  const key = category?.toLowerCase().trim();
  const config = CATEGORY_CONFIG[key] ?? DEFAULT_CONFIG;

  return (
    <div className="not-prose my-10 rounded-2xl bg-[#1B2D4F] px-6 py-7 flex flex-col sm:flex-row items-start sm:items-center gap-5">
      <div className="flex-1">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#E36E4A] mb-1">
          Verificado · Solo para mayores de 60
        </p>
        <h3 className="text-white font-alata text-xl font-bold leading-snug mb-1">
          {config.headline}
        </h3>
        <p className="text-gray-300 text-sm leading-relaxed">{config.sub}</p>
      </div>
      <Link
        href={config.href}
        className="shrink-0 inline-block bg-[#E36E4A] hover:bg-[#c85c3a] text-white font-semibold text-sm px-6 py-3 rounded-xl transition-colors duration-200 whitespace-nowrap"
      >
        {config.cta}
      </Link>
    </div>
  );
}
