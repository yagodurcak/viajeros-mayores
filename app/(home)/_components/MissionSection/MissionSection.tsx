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
              Viajar Después de los 60: Nuestra Misión
            </h3>
            <p className="text-lg text-gray-700 mb-8 font-light leading-relaxed">
              Creemos que viajar después de los 60 años puede ser una de las
              experiencias más enriquecedoras de la vida. Nuestro objetivo es
              proporcionar consejos prácticos, información sobre destinos
              culturales accesibles y crear una comunidad de apoyo para
              viajeros mayores activos. Queremos ayudarte a planificar tu viaje
              en la tercera edad con confianza, disfrutando de experiencias
              culturales, turismo de naturaleza y exploración urbana adaptada a
              tu ritmo.
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
                alt="Viajeros mayores de 60 años planificando viajes culturales y destinos accesibles"
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
