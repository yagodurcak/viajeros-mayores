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
              Nuestra Misión y Valores
            </h3>
            <p className="text-lg text-gray-700 mb-8 font-light leading-relaxed">
              Entendemos que para muchas personas, recorrer largas o cortas
              distancias, subir escaleras o caminar cuesta arriba puede ser un
              desafío significativo. Nuestro objetivo es proporcionar
              información práctica y accesible, y crear una comunidad de apoyo
              donde podamos compartir experiencias y soluciones. Queremos que
              sigas disfrutando de lo que amas: viajar, explorar y vivir la vida
              al máximo.
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
                src="/images/ancianosmapa.png"
                alt="Nuestra misión de turismo accesible"
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
