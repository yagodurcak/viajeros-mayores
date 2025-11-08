'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-lg font-bold text-gray-800 mb-4">
              Viajeros Mayores
            </h4>
            <p className="text-gray-600 mb-4">
              Haciendo el turismo accesible para todos
            </p>

            {/* <div
              className="flex space-x-4"
              role="navigation"
              aria-label="Social media"
            >
              <a
                href="#"
                aria-label="Viajeros Mayores Facebook"
                className="text-[#FF6F61] text-xl hover:text-[#E85A4F] transition-colors"
              >
                <i className="fab fa-facebook" />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="#"
                aria-label="Viajeros Mayores Twitter"
                className="text-[#FF6F61] text-xl hover:text-[#E85A4F] transition-colors"
              >
                <i className="fab fa-twitter" />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="#"
                aria-label="Viajeros Mayores Instagram"
                className="text-[#FF6F61] text-xl hover:text-[#E85A4F] transition-colors"
              >
                <i className="fab fa-instagram" />
                <span className="sr-only">Instagram</span>
              </a>
            </div> */}
          </div>

          <div>
            <h5 className="font-semibold text-gray-800 mb-4">
              Enlaces Rápidos
            </h5>
            <ul className="space-y-2 text-gray-600">
              <li>
                <Link
                  href="/"
                  className="hover:text-[#FF6F61] transition-colors"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="/news"
                  className="hover:text-[#FF6F61] transition-colors"
                >
                  Noticias
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-[#FF6F61] transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-[#FF6F61] transition-colors"
                >
                  Acerca de Nosotros
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-gray-800 mb-4">Recursos</h5>
            <ul className="space-y-2 text-gray-600">
              <li>
                <Link
                  href="https://europa.eu/youreurope/citizens/travel/transport-disability/reduced-mobility/index_en.htm"
                  target="_blank"
                  className="hover:text-[#FF6F61] transition-colors"
                >
                  European Commission
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.untourism.int/accessibility"
                  target="_blank"
                  className="hover:text-[#FF6F61] transition-colors"
                >
                  UN Tourism – Accessible tourism
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.accessibletourism.org"
                  target="_blank"
                  className="hover:text-[#FF6F61] transition-colors"
                >
                  ENAT – Accessible Tourism
                </Link>
              </li>
              <li>
                <Link
                  href="https://travel.state.gov/en/international-travel/planning/personal-needs/accessibility.html"
                  target="_blank"
                  className="hover:text-[#FF6F61] transition-colors"
                >
                  Accessibility Needs – Travel.State.gov
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex justify-center items-start">
            <div className="relative w-44 h-32">
              <Image
                src="/images/logo.png"
                alt="Viajeros Mayores Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-300 mt-8 pt-8 text-center text-gray-600">
          <p>
            &copy; {new Date().getFullYear()} Viajeros Mayores. Todos los
            derechos reservados. Comprometidos con el turismo inclusivo.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
