'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';
import Avatar from '@/components/Avatar/Avatar';
import Image from 'next/image';

interface HeaderProps {
  session: Session | null;
}

const NAV_COMMUNITY = [
  { href: '/', label: 'Ofertas', exact: true },
  { href: '/comunidad', label: 'Comunidad', exact: false },
  { href: '/blog', label: 'Artículos', exact: false },
  { href: '/news', label: 'Noticias', exact: false },
  { href: '/about', label: 'Nosotros', exact: false },
];

const NAV_SERVICES = [
  { href: '/hoteles', label: 'Hoteles', icon: '🏨' },
  { href: '/vuelos', label: 'Vuelos', icon: '✈️' },
  { href: '/seguros', label: 'Seguros', icon: '🛡️' },
];

const Header = ({ session: initialSession }: HeaderProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();
  const [session, setSession] = useState<Session | null>(initialSession);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setSession(initialSession);
  }, [initialSession]);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, currentSession) => {
      setSession(currentSession);
      if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
        router.refresh();
      }
    });
    return () => subscription.unsubscribe();
  }, [supabase, router]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isDropdownOpen && !target.closest('.dropdown-container')) {
        setIsDropdownOpen(false);
      }
    };
    if (isDropdownOpen) document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isDropdownOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const isCommunityActive = (href: string, exact: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  const isServiceActive = (href: string) => pathname.startsWith(href);

  const communityNavClass = (href: string, exact: boolean) =>
    isCommunityActive(href, exact)
      ? 'px-3 py-2 rounded-lg bg-[#E36E4A] text-white font-semibold transition-colors text-sm'
      : 'px-3 py-2 rounded-lg text-gray-700 hover:text-[#E36E4A] hover:bg-gray-100 transition-colors font-medium text-sm';

  const serviceNavClass = (href: string) =>
    isServiceActive(href)
      ? 'flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-[#C4532F] font-bold text-sm transition-all min-h-[36px] whitespace-nowrap shadow-sm'
      : 'flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/20 text-white border border-white/30 hover:bg-white/30 font-medium text-sm transition-all min-h-[36px] whitespace-nowrap';

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsDropdownOpen(false);
    router.push('/');
  };

  const handleEditProfile = () => {
    setIsDropdownOpen(false);
    router.push('/profile/edit');
  };

  const getUserDisplayName = () => {
    if (session?.user?.user_metadata?.full_name) return session.user.user_metadata.full_name;
    if (session?.user?.email) return session.user.email.split('@')[0];
    return 'Usuario';
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">

      {/* ── Barra 1: Comunidad ──────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">

          {/* Logo */}
          <button
            onClick={() => router.push('/')}
            className="flex items-center flex-shrink-0"
            aria-label="Ir al inicio"
          >
            <div className="relative w-44 h-12">
              <Image
                src="/images/logo.png"
                alt="Viajeros Mayores"
                fill
                className="object-contain"
                priority
              />
            </div>
          </button>

          {/* Nav comunidad — desktop */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Navegación principal">
            {NAV_COMMUNITY.map(({ href, label, exact }) => (
              <button
                key={href}
                onClick={() => router.push(href)}
                className={communityNavClass(href, exact)}
              >
                {label}
              </button>
            ))}
          </nav>

          {/* Derecha: Avatar + hamburguesa móvil */}
          <div className="flex items-center gap-3">
            {/* Avatar desktop */}
            {session && (
              <div className="relative dropdown-container hidden md:block">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="cursor-pointer hover:opacity-90 transition-opacity"
                  aria-label="Menú de usuario"
                  aria-expanded={isDropdownOpen}
                >
                  <Avatar
                    name={getUserDisplayName()}
                    size="md"
                    gradient
                    className="shadow-md hover:shadow-lg transition-shadow"
                  />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-800">{getUserDisplayName()}</p>
                      {session.user.email && (
                        <p className="text-xs text-gray-500 truncate mt-0.5">{session.user.email}</p>
                      )}
                    </div>
                    <button
                      onClick={handleEditProfile}
                      className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2 min-h-[44px]"
                    >
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Editar Perfil
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2 min-h-[44px]"
                    >
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Hamburguesa — solo móvil */}
            <button
              className="md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={isMobileMenuOpen}
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ── Barra 2: Servicios de viaje — siempre visible ──────────────── */}
      <div className="bg-gradient-to-r from-[#E36E4A] via-[#D45A36] to-[#B8421E]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-center gap-3 overflow-x-auto py-3 scrollbar-hide" role="navigation" aria-label="Mis recomendaciones">
            <span className="text-xs font-semibold text-white uppercase tracking-widest whitespace-nowrap flex-shrink-0">
              Mis recomendaciones en:
            </span>
            {NAV_SERVICES.map(({ href, label, icon }) => (
              <button
                key={href}
                onClick={() => router.push(href)}
                className={serviceNavClass(href)}
                aria-current={isServiceActive(href) ? 'page' : undefined}
              >
                <span aria-hidden="true">{icon}</span>
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Menú móvil desplegable ──────────────────────────────────────── */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-4 space-y-1">

            {/* Sección comunidad */}
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 pb-1">
              Comunidad
            </p>
            {NAV_COMMUNITY.map(({ href, label, exact }) => (
              <button
                key={href}
                onClick={() => router.push(href)}
                className={`${communityNavClass(href, exact)} w-full text-left min-h-[48px] text-base`}
              >
                {label}
              </button>
            ))}

            <div className="border-t border-gray-100 my-3" />

            {/* Usuario en móvil */}
            {session && (
              <>
                <div className="flex items-center gap-3 px-3 py-2">
                  <Avatar name={getUserDisplayName()} size="sm" gradient />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{getUserDisplayName()}</p>
                    {session.user.email && (
                      <p className="text-xs text-gray-500 truncate">{session.user.email}</p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => { handleEditProfile(); setIsMobileMenuOpen(false); }}
                  className="w-full text-left px-3 py-3 text-base text-gray-700 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2 min-h-[48px]"
                >
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Editar Perfil
                </button>
                <button
                  onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                  className="w-full text-left px-3 py-3 text-base text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2 min-h-[48px]"
                >
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Cerrar Sesión
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
