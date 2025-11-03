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

  const getNavButtonClass = (path: string) => {
    let isActive = false;

    if (path === '/') {
      // Home is active only on the exact home page
      isActive = pathname === '/';
    } else if (path === '/hotels') {
      // Hotels is active when path starts with /hotels
      isActive = pathname.startsWith('/hotels');
    } else if (path === '/news') {
      // News is active when path starts with /news
      isActive = pathname.startsWith('/news');
    } else if (path === '/blog') {
      // Blog is active when path starts with /blog
      isActive = pathname.startsWith('/blog');
    } else {
      // Other paths use exact match
      isActive = pathname === path;
    }

    return isActive
      ? 'px-4 py-2 rounded-lg bg-[#FF6F61] text-white font-medium transition-colors'
      : 'px-4 py-2 rounded-lg hover:text-[#FF6F61] hover:bg-gray-100 transition-colors font-medium text-gray-700';
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
    return 'User';
  };

  return (
    <header className="bg-gray-50 text-gray-800 py-4 px-6 shadow-sm border-b border-gray-100">
      <div className="mx-auto max-w-6xl flex items-center justify-between">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => router.push('/')}
        >
          <div className="relative w-44 h-14">
            <Image
              src="/images/logo.png"
              alt="Explore4All Logo"
              fill
              className="object-contain"
            />
          </div>
        </div>

        <nav className="hidden md:flex gap-2">
          <button
            className={getNavButtonClass('/')}
            onClick={() => router.push('/')}
          >
            Home
          </button>
          <button
            className={getNavButtonClass('/news')}
            onClick={() => router.push('/news')}
          >
            News
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
            About Us
          </button>
        </nav>

        <div className="flex items-center gap-4">
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
                      Edit Profile
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
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={handleSignIn}
                className="px-4 py-2 bg-[#FF6F61] text-white rounded-lg hover:bg-[#FF5A4A] transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={handleSignUp}
                className="px-4 py-2 border border-[#FF6F61] text-[#FF6F61] rounded-lg hover:bg-[#FF6F61] hover:text-white transition-colors"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
