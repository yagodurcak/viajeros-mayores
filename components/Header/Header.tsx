'use client';

import { useRouter, usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';
import Avatar from '@/components/Avatar/Avatar';
import Image from 'next/image';

interface HeaderProps {
  session: Session | null;
}

const Header = ({ session: initialSession }: HeaderProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();
  const [session, setSession] = useState<Session | null>(initialSession);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Sincronizar el estado de la sesión cuando cambie
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
    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, router]);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isDropdownOpen && !target.closest('.dropdown-container')) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Cerrar menú móvil cuando cambia la ruta
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const getNavButtonClass = (path: string) => {
    let isActive = false;

    if (path === '/') {
      // Home is active only on the exact home page
      isActive = pathname === '/';
    } else if (path === '/news') {
      // News is active when path starts with /news
      isActive = pathname.startsWith('/news');
    } else if (path === '/blog') {
      // Blog is active when path starts with /blog
      isActive = pathname.startsWith('/blog');
    } else if (path === '/maps') {
      // Maps is active when path starts with /maps
      isActive = pathname.startsWith('/maps');
    } else {
      // Other paths use exact match
      isActive = pathname === path;
    }

    return isActive
      ? 'px-3 py-2 rounded-lg bg-[#E36E4A] text-white font-medium transition-colors'
      : 'px-3 py-2 rounded-lg hover:text-[#E36E4A] hover:bg-gray-100 transition-colors font-medium text-gray-700';
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsDropdownOpen(false);
    router.push('/');
  };

  const handleEditProfile = () => {
    setIsDropdownOpen(false);
    router.push('/profile/edit');
  };

  const handleSignIn = () => {
    router.push('/login');
  };

  const handleSignUp = () => {
    router.push('/signup');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Obtener nombre para mostrar
  const getUserDisplayName = () => {
    if (session?.user?.user_metadata?.full_name) {
      return session.user.user_metadata.full_name;
    }
    if (session?.user?.email) {
      return session.user.email.split('@')[0];
    }
    return 'Usuario';
  };

  return (
    <header className="bg-gray-50 text-gray-800 py-4 px-6 shadow-sm border-b border-gray-100">
      <div className="mx-auto max-w-6xl flex items-center justify-between">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => router.push('/')}
        >
          <div className="relative w-52 h-14">
            <Image
              src="/images/logo.png"
              alt="Viajeros Mayores Logo"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Botón Hamburguesa - Solo visible en móvil */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-200 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Menú"
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        <nav className="hidden md:flex gap-1">
          <button
            className={getNavButtonClass('/maps')}
            onClick={() => router.push('/maps')}
          >
            Analizador de pendientes
          </button>
          <button
            className={getNavButtonClass('/news')}
            onClick={() => router.push('/news')}
          >
            Noticias
          </button>
          <button
            className={getNavButtonClass('/blog')}
            onClick={() => router.push('/blog')}
          >
            Blog
          </button>
          <button
            className={getNavButtonClass('/about-us')}
            onClick={() => router.push('/about')}
          >
            Nosotros
          </button>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {session ? (
            <div className="flex items-center gap-3">
              {/* Avatar con Dropdown */}
              <div className="relative dropdown-container">
                {/* Avatar */}
                <div
                  onClick={toggleDropdown}
                  className="cursor-pointer hover:opacity-90 transition-opacity"
                >
                  <Avatar
                    name={getUserDisplayName()}
                    size="md"
                    gradient
                    className="shadow-md hover:shadow-lg transition-shadow"
                  />
                </div>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 animate-fade-in">
                    {/* User Info */}
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-800">
                        {getUserDisplayName()}
                      </p>
                      {session.user.email && (
                        <p className="text-xs text-gray-500 truncate">
                          {session.user.email}
                        </p>
                      )}
                    </div>

                    {/* Menu Items */}
                    <button
                      onClick={handleEditProfile}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      Editar Perfil
                    </button>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={handleSignIn}
                className="px-4 py-2 bg-[#E36E4A] text-white rounded-lg hover:bg-[#D45A36] transition-colors"
              >
                Iniciar Sesión
              </button>
              <button
                onClick={handleSignUp}
                className="px-4 py-2 border border-[#E36E4A] text-[#E36E4A] rounded-lg hover:bg-[#E36E4A] hover:text-white transition-colors"
              >
                Registrarse
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Menú Móvil Desplegable */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white shadow-lg">
          <nav className="flex flex-col p-4 space-y-2">
            <button
              className={`${getNavButtonClass('/')} w-full text-left`}
              onClick={() => {
                router.push('/');
                setIsMobileMenuOpen(false);
              }}
            >
              Inicio
            </button>
            <button
              className={`${getNavButtonClass('/maps')} w-full text-left`}
              onClick={() => {
                router.push('/maps');
                setIsMobileMenuOpen(false);
              }}
            >
              Analizador de pendientes
            </button>
            <button
              className={`${getNavButtonClass('/news')} w-full text-left`}
              onClick={() => {
                router.push('/news');
                setIsMobileMenuOpen(false);
              }}
            >
              Noticias
            </button>
            <button
              className={`${getNavButtonClass('/blog')} w-full text-left`}
              onClick={() => {
                router.push('/blog');
                setIsMobileMenuOpen(false);
              }}
            >
              Blog
            </button>
            <button
              className={`${getNavButtonClass('/about-us')} w-full text-left`}
              onClick={() => {
                router.push('/about');
                setIsMobileMenuOpen(false);
              }}
            >
              Nosotros
            </button>

            {/* Separador */}
            <div className="border-t border-gray-200 my-2"></div>

            {/* Botones de Auth en móvil */}
            {session ? (
              <div className="flex flex-col space-y-2">
                <div className="flex items-center gap-3 px-4 py-2">
                  <Avatar
                    name={getUserDisplayName()}
                    size="sm"
                    gradient
                    className="shadow-md"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      {getUserDisplayName()}
                    </p>
                    {session.user.email && (
                      <p className="text-xs text-gray-500 truncate">
                        {session.user.email}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => {
                    handleEditProfile();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Editar Perfil
                </button>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => {
                    handleSignIn();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 bg-[#E36E4A] text-white rounded-lg hover:bg-[#D45A36] transition-colors"
                >
                  Iniciar Sesión
                </button>
                <button
                  onClick={() => {
                    handleSignUp();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 border border-[#E36E4A] text-[#E36E4A] rounded-lg hover:bg-[#E36E4A] hover:text-white transition-colors"
                >
                  Registrarse
                </button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
