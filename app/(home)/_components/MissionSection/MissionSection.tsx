'use client';

import React from 'react';
import Image from 'next/image';
import { missionValues } from '@/lib/constants';

const MissionSection: React.FC = () => {
  return (
    <section className="py-16 px-6 bg-gradient-to-r from-[#FFF5F4] to-[#FEF2F2]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          <div className="flex flex-col justify-center">
            <h3 className="text-4xl font-bold text-gray-800 mb-6 font-alata">
              Our Mission & Values
            </h3>
            <p className="text-lg text-gray-700 mb-8 font-light leading-relaxed">
              We understand that for many people, traveling long or short
              distances, climbing stairs, or walking uphill can be a significant
              challenge. Our goal is to provide practical and accessible
              information and create a supportive community where we can share
              experiences and solutions. We want you to continue enjoying what
              you love: traveling, exploring, and living life to the fullest.
            </p>
            <div className="space-y-6">
              {missionValues.map((value) => (
                <div key={value.id} className="flex items-start space-x-4">
                  <div
                    className={`w-12 h-12 ${value.color} rounded-xl flex items-center justify-center flex-shrink-0`}
                  >
                    <i className={`${value.icon} text-white text-xl`} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-800 mb-2">
                      {value.title}
                    </h4>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-full min-h-[500px]">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-100 h-full">
              <Image
                src="/images/women.png"
                alt="Our accessible tourism mission"
                fill
                className="object-cover object-center"
                priority={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default MissionSection;
