'use client';

import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-lg font-bold text-gray-800 mb-4">
              AccesiTravel
            </h4>
            <p className="text-gray-600 mb-4">
              Making tourism accessible for everyone
            </p>

            <div
              className="flex space-x-4"
              role="navigation"
              aria-label="Social media"
            >
              <a
                href="#"
                aria-label="AccesiTravel Facebook"
                className="text-[#FF6F61] text-xl hover:text-[#E85A4F] transition-colors"
              >
                <i className="fab fa-facebook" />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="#"
                aria-label="AccesiTravel Twitter"
                className="text-[#FF6F61] text-xl hover:text-[#E85A4F] transition-colors"
              >
                <i className="fab fa-twitter" />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="#"
                aria-label="AccesiTravel Instagram"
                className="text-[#FF6F61] text-xl hover:text-[#E85A4F] transition-colors"
              >
                <i className="fab fa-instagram" />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>

          <div>
            <h5 className="font-semibold text-gray-800 mb-4">
              Accessible Support
            </h5>
            <ul className="space-y-2 text-gray-600">
              <li>
                <button className="hover:text-[#FF6F61] transition-colors">
                  24/7 accessible chat
                </button>
              </li>
              <li>
                <button className="hover:text-[#FF6F61] transition-colors">
                  TTY/TDD line
                </button>
              </li>
              <li>
                <button className="hover:text-[#FF6F61] transition-colors">
                  Sign language video call
                </button>
              </li>
              <li>
                <button className="hover:text-[#FF6F61] transition-colors">
                  Accessibility guide
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-gray-800 mb-4">Certifications</h5>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <i
                  className="fas fa-certificate text-green-500 mr-2"
                  aria-hidden="true"
                />
                <span>WCAG 2.1 AA</span>
              </li>
              <li className="flex items-center">
                <i
                  className="fas fa-universal-access text-blue-500 mr-2"
                  aria-hidden="true"
                />
                <span>Inclusive Tourism</span>
              </li>
              <li className="flex items-center">
                <i
                  className="fas fa-award text-yellow-500 mr-2"
                  aria-hidden="true"
                />
                <span>Certified Accessibility</span>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-gray-800 mb-4">Resources</h5>
            <ul className="space-y-2 text-gray-600">
              <li>
                <button className="hover:text-[#FF6F61] transition-colors">
                  Inclusion policy
                </button>
              </li>
              <li>
                <button className="hover:text-[#FF6F61] transition-colors">
                  Accessibility reviews
                </button>
              </li>
              <li>
                <button className="hover:text-[#FF6F61] transition-colors">
                  Travel tips
                </button>
              </li>
              <li>
                <button className="hover:text-[#FF6F61] transition-colors">
                  AccesiTravel Community
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-300 mt-8 pt-8 text-center text-gray-600">
          <p>
            &copy; {new Date().getFullYear()} AccesiTravel. All rights reserved.
            Committed to inclusive tourism.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
