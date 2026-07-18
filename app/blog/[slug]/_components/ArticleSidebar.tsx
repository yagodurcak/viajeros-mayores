import Link from 'next/link';
import Image from 'next/image';
import type { BlogArticle } from '@/types/blog';
import { formatBlogDate } from '@/lib/blog-utils';
import { getOptimizedImageUrl } from '@/lib/utils';

interface OfferItem {
  icon: string;
  name: string;
  detail: string;
  price: string;
  href: string;
}

interface SidebarLink {
  href: string;
  label: string;
}

interface SidebarConfig {
  headline: string;
  ctaLabel: string;
  ctaHref: string;
  offers: OfferItem[];
  links: SidebarLink[];
}

const SIDEBAR_CONFIG: Record<string, SidebarConfig> = {
  vuelos: {
    headline: 'Vuelos con descuento para mayores de 60',
    ctaLabel: 'Ver buscadores de vuelos',
    ctaHref: '/vuelos',
    offers: [
      {
        icon: '✈️',
        name: 'Skyscanner',
        detail: 'Filtro por edad y preferencias',
        price: 'Gratis comparar',
        href: '/vuelos',
      },
      {
        icon: '🔍',
        name: 'Google Flights',
        detail: 'Precio más bajo del mes',
        price: 'Sin comisión',
        href: '/vuelos',
      },
      {
        icon: '💳',
        name: 'Descuentos legales',
        detail: 'Por edad en aerolíneas',
        price: 'Hasta 50% OFF',
        href: '/ofertas',
      },
    ],
    links: [
      { href: '/blog', label: 'Todos los artículos de viaje' },
      { href: '/ofertas', label: 'Ofertas verificadas del mes' },
      { href: '/hoteles', label: 'Hoteles recomendados' },
    ],
  },
  cruceros: {
    headline: 'Cruceros verificados para viajeros mayores',
    ctaLabel: 'Ver ofertas de cruceros',
    ctaHref: '/ofertas',
    offers: [
      {
        icon: '🚢',
        name: 'Costa Diadema',
        detail: 'Buenos Aires → Uruguay → Brasil · 7 noches',
        price: 'Desde USD 671',
        href: '/ofertas',
      },
      {
        icon: '🚢',
        name: 'MSC Splendida',
        detail: 'Montevideo → Río · 8 noches',
        price: 'Desde USD 1.235',
        href: '/ofertas',
      },
      {
        icon: '🎉',
        name: 'Año Nuevo en Río',
        detail: 'MSC Splendida · 8 noches',
        price: 'Desde USD 1.849',
        href: '/ofertas',
      },
    ],
    links: [
      { href: '/ofertas', label: 'Todas las ofertas verificadas' },
      { href: '/seguros', label: 'Seguros de viaje para mayores' },
      { href: '/blog', label: 'Más artículos de viaje' },
    ],
  },
  seguros: {
    headline: 'Seguros de viaje para mayores de 60',
    ctaLabel: 'Ver seguros recomendados',
    ctaHref: '/ofertas',
    offers: [
      {
        icon: '🛡️',
        name: 'Assist Card',
        detail: '3 cuotas sin interés',
        price: '60% de descuento',
        href: '/ofertas',
      },
      {
        icon: '🛡️',
        name: 'Assist Card Premium',
        detail: 'Con cupón PROMOS20OFF',
        price: '50% + 20% OFF',
        href: '/ofertas',
      },
      {
        icon: '🌍',
        name: 'Plan Anual Multiviaje',
        detail: 'Cobertura ilimitada de viajes',
        price: 'Desde USD 150',
        href: '/ofertas',
      },
    ],
    links: [
      { href: '/ofertas', label: 'Todas las ofertas verificadas' },
      { href: '/blog', label: 'Guías de viaje para mayores' },
      { href: '/vuelos', label: 'Vuelos con descuento' },
    ],
  },
};

const DEFAULT_CONFIG: SidebarConfig = {
  headline: 'Ofertas verificadas para viajeros mayores de 60',
  ctaLabel: 'Ver todas las ofertas',
  ctaHref: '/ofertas',
  offers: [
    {
      icon: '✈️',
      name: 'Vuelos con descuento',
      detail: 'Descuentos legales por edad',
      price: 'Hasta 50% OFF',
      href: '/vuelos',
    },
    {
      icon: '🚢',
      name: 'Cruceros seniors',
      detail: 'Desde Buenos Aires y Montevideo',
      price: 'Desde USD 671',
      href: '/ofertas',
    },
    {
      icon: '🛡️',
      name: 'Seguros de viaje',
      detail: 'Assist Card con descuento especial',
      price: '60% OFF',
      href: '/ofertas',
    },
  ],
  links: [
    { href: '/ofertas', label: 'Todas las ofertas del mes' },
    { href: '/vuelos', label: 'Buscadores de vuelos recomendados' },
    { href: '/hoteles', label: 'Hoteles verificados para mayores' },
    { href: '/blog', label: 'Más artículos de viaje' },
  ],
};

interface ArticleSidebarProps {
  category: string;
  relatedArticles?: BlogArticle[];
}

export default function ArticleSidebar({ category, relatedArticles = [] }: ArticleSidebarProps) {
  const key = category?.toLowerCase().trim();
  const config = SIDEBAR_CONFIG[key] ?? DEFAULT_CONFIG;

  return (
    <aside className="space-y-4">
      {/* Main offers box */}
      <div className="rounded-2xl overflow-hidden shadow-lg border border-[#E36E4A]/30 animate-bounce [animation-iteration-count:3]">

        {/* Gradient header */}
        <div className="bg-gradient-to-br from-[#E36E4A] via-[#D45A36] to-[#B8421E] px-5 pt-5 pb-6">
          {/* Trust badge */}
          <div className="flex items-center gap-2 mb-3">
            <span className="flex items-center gap-1.5 bg-white/20 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
              <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                <path fillRule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
              Verificado · Mayores de 60
            </span>
          </div>

          <h2 className="font-alata text-white text-[1.15rem] font-bold leading-snug">
            {config.headline}
          </h2>
        </div>

        {/* Offer cards — white background */}
        <div className="bg-white px-4 pt-4 pb-5 space-y-3">
          {config.offers.map((offer) => (
            <Link
              key={offer.name}
              href={offer.href}
              className="group flex items-center gap-3 p-3 rounded-xl bg-[#FDF8F6] border-2 border-transparent hover:border-[#E36E4A] hover:bg-white transition-all duration-150 min-h-[56px]"
            >
              <span className="text-2xl shrink-0">{offer.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900 leading-tight">
                  {offer.name}
                </p>
                <p className="text-xs text-gray-500 leading-tight mt-0.5 truncate">
                  {offer.detail}
                </p>
              </div>
              <span className="shrink-0 text-sm font-black text-[#E36E4A] whitespace-nowrap text-right">
                {offer.price}
              </span>
            </Link>
          ))}

          {/* Primary CTA */}
          <Link
            href={config.ctaHref}
            className="group flex items-center justify-between w-full min-h-[52px] rounded-xl bg-[#1B2D4F] hover:bg-[#0f1e36] px-5 text-white font-bold text-base transition-colors duration-200 mt-1"
          >
            <span>{config.ctaLabel}</span>
            <span className="text-[#E36E4A] text-xl transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>

      {/* También puede interesarte — artículos reales */}
      {relatedArticles.length > 0 && (
        <div className="rounded-2xl bg-white border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-5 pt-4 pb-2 border-b border-gray-100">
            <h3 className="font-alata text-base font-bold text-gray-900">
              También puede interesarte
            </h3>
          </div>
          <ul className="divide-y divide-gray-100">
            {relatedArticles.slice(0, 3).map((article) => (
              <li key={article.id}>
                <Link
                  href={`/blog/${article.slug}`}
                  className="group flex gap-3 p-4 hover:bg-gray-50 transition-colors duration-150"
                >
                  {/* Thumbnail */}
                  <div className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden">
                    <Image
                      src={getOptimizedImageUrl(article.imageUrl)}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="64px"
                    />
                  </div>
                  {/* Text */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <p className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2 group-hover:text-[#E36E4A] transition-colors">
                      {article.title}
                    </p>
                    <span className="text-xs text-gray-400 mt-1">
                      {formatBlogDate(article.createdAt)}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <div className="px-5 py-3 border-t border-gray-100">
            <Link
              href="/blog"
              className="text-sm font-semibold text-[#E36E4A] hover:underline"
            >
              Ver todos los artículos →
            </Link>
          </div>
        </div>
      )}

    </aside>
  );
}
