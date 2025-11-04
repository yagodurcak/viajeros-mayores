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
            Acerca de Travel4All
          </h1>
          <p className="text-xl md:text-2xl text-white/95 max-w-3xl font-light leading-relaxed">
            Haciendo los viajes accesibles para todos, un viaje a la vez
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6 font-alata">
                Nuestra Historia
              </h2>
              <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                <p>
                  Viajeros Mayores nació de una experiencia profundamente
                  personal. La idea surgió de los innumerables viajes que
                  compartí con mi madre —mi primera compañera de aventuras, la
                  mujer que me enseñó a mirar el mundo con asombro y curiosidad.
                </p>
                <p>
                  Con el paso de los años, sin embargo, vi cómo el simple acto
                  de viajar comenzó a transformarse. Lo que antes eran paseos
                  espontáneos se convirtieron en verdaderas pruebas: escaleras
                  que no esperábamos, calles empinadas, hoteles que prometían
                  accesibilidad pero no cumplían. Cada viaje requería horas de
                  investigación, buscando en foros y reseñas lo que nadie decía
                  con claridad: cuánto esfuerzo cuesta realmente disfrutar un
                  lugar.
                </p>
                <p>
                  Y lo más duro era ver la ilusión de mi madre transformarse en
                  frustración. Fue entonces cuando entendí que este no era solo
                  nuestro problema: millones de personas con movilidad reducida,
                  y sus familias, viven esa misma incertidumbre antes de cada
                  viaje.
                </p>
                <p>
                  Así nació Viajeros Mayores. No como una simple web, sino como
                  una misión: construir la comunidad que mi madre y yo siempre
                  necesitamos. Un espacio donde las experiencias reales valen
                  más que las descripciones publicitarias, donde la empatía guía
                  la información, y donde cada consejo puede hacer la diferencia
                  entre un viaje difícil y una experiencia inolvidable.
                </p>
                <p>
                  Queremos que viajar vuelva a ser lo que siempre fue: libertad,
                  descubrimiento y alegría. Queremos desafiar la idea de que la
                  edad o la movilidad definen los límites de una aventura.
                  Porque todos merecemos explorar el mundo —sin miedo, sin
                  barreras, sin decepciones.
                </p>
              </div>
            </div>
            <div className="relative h-full min-h-[600px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/mama.jpg"
                alt="Comunidad Travel4All"
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
              Nuestra Misión y Valores
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Estamos comprometidos a derribar barreras y abrir el mundo de los
              viajes para todos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Community */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-[#FF6F61] rounded-xl flex items-center justify-center mb-6">
                <span className="text-4xl">🤝</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 font-alata">
                Comunidad
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Somos una red de apoyo donde los viajeros se unen para ayudarse
                mutuamente. Al compartir nuestras experiencias reales y
                soluciones, empoderamos a todos para seguir viajando y
                disfrutando del mundo.
              </p>
            </div>
            {/* Empowerment */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-[#FF6F61] rounded-xl flex items-center justify-center mb-6">
                <span className="text-4xl">🚀</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 font-alata">
                Empoderamiento
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Te damos las herramientas, la información y la confianza que
                necesitas para planificar tu viaje perfecto, sabiendo que cada
                detalle ha sido considerado con tus necesidades en mente.
              </p>
            </div>
            {/* Innovation */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-[#FF6F61] rounded-xl flex items-center justify-center mb-6">
                <span className="text-4xl">💡</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 font-alata">
                Innovación
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Mejoramos continuamente nuestra plataforma con tecnología de
                vanguardia para hacer que la planificación de viajes accesibles
                sea más fácil, rápida y confiable que nunca.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-[#FF6F61] to-[#FF8A80]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6 font-alata">
            ¿Listo para Comenzar tu Viaje?
          </h2>
          <p className="text-xl text-white/95 mb-8 leading-relaxed">
            Únete a miles de viajeros que confían en Travel4All para ayudarles a
            explorar el mundo con confianza y comodidad.
          </p>
          <div className="flex justify-center">
            <Link
              href="/signup"
              className="px-12 py-4 bg-white text-[#FF6F61] rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              Crear Cuenta
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
