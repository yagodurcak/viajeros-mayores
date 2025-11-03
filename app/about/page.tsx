'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[30vh] min-h-[500px] bg-gradient-to-r from-[#FF6F61] to-[#FF8A80]">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative h-full max-w-6xl mx-auto px-6 flex flex-col justify-center items-center text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 font-alata">
            About Travel4All
          </h1>
          <p className="text-xl md:text-2xl text-white/95 max-w-3xl font-light leading-relaxed">
            Making travel accessible for everyone, one journey at a time
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6 font-alata">
                Our Story
              </h2>
              <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                <p>
                  Explore4All was born from a deeply personal experience. The
                  idea came from the countless trips I&apos;ve shared with my
                  mother. She was the one who taught me how beautiful it is to
                  travel, experience new cultures, and marvel at the world.
                  However, with each passing year, I watched the simple act of
                  traveling become more complicated for her. Stretches that were
                  once just a simple walk turned into challenges: long treks,
                  unexpected stairs, or steep paths started to become obstacles.
                </p>
                <p>
                  Every new trip turned into an exhaustive research mission. We
                  spent hours digging for honest opinions about the cost (in
                  effort) of getting to a tourist spot. We faced hotels that
                  lied in their accessibility descriptions and, unfortunately,
                  we endured several disappointments upon arriving at a
                  destination that wasn&apos;t prepared for us.
                </p>
                <p>
                  I realized our problem wasn&apos;t unique. Millions of people
                  with reduced mobility, and their families, face this same
                  uncertainty and frustration. That is why I created this
                  platform. The idea behind Explore4All is simple: to build the
                  community my mother and I always needed. A place to provide
                  people with reduced mobility with the honest information,
                  practical advice, and real-world experiences from fellow
                  travelers. We want to eliminate the disappointment and anxiety
                  from planning, so that your next trip can be exactly what
                  it&apos;s meant to be: a prepared, joyful, and limitless
                  experience.
                </p>
              </div>
            </div>
            <div className="relative h-full min-h-[600px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/mama.jpg"
                alt="Travel4All community"
                fill
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-[#FFF5F4] to-[#FEF2F2]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4 font-alata">
              Our Mission & Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We&apos;re committed to breaking down barriers and opening up the
              world of travel to everyone
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Community */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-[#FF6F61] rounded-xl flex items-center justify-center mb-6">
                <span className="text-4xl">🤝</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 font-alata">
                Community
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We are a support network where travelers come together to help
                one another. By sharing our real experiences and solutions, we
                empower everyone to keep traveling and enjoying the world.
              </p>
            </div>
            {/* Empowerment */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-[#FF6F61] rounded-xl flex items-center justify-center mb-6">
                <span className="text-4xl">🚀</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 font-alata">
                Empowerment
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We give you the tools, information, and confidence you need to
                plan your perfect trip, knowing that every detail has been
                considered with your needs in mind.
              </p>
            </div>
            {/* Innovation */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-[#FF6F61] rounded-xl flex items-center justify-center mb-6">
                <span className="text-4xl">💡</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 font-alata">
                Innovation
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We continuously improve our platform with cutting-edge
                technology to make accessible travel planning easier, faster,
                and more reliable than ever before.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-[#FF6F61] to-[#FF8A80]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6 font-alata">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-white/95 mb-8 leading-relaxed">
            Join thousands of travelers who trust Travel4All to help them
            explore the world with confidence and comfort.
          </p>
          <div className="flex justify-center">
            <Link
              href="/signup"
              className="px-12 py-4 bg-white text-[#FF6F61] rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              Create Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
