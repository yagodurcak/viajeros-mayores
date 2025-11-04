'use client';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Elena Martínez',
    location: 'Madrid, España',
    avatar: 'EM',
    rating: 5,
    text: 'Gracias a AccesiTravel descubrí lugares increíbles que nunca pensé que podría visitar. La información sobre accesibilidad es muy detallada.',
  },
  {
    id: 2,
    name: 'Jorge Ramírez',
    location: 'Buenos Aires, Argentina',
    avatar: 'JR',
    rating: 5,
    text: 'La comunidad es fantástica. Siempre encuentro consejos útiles de otros viajeros con experiencias similares a la mía.',
  },
  {
    id: 3,
    name: 'Sofía Chen',
    location: 'Barcelona, España',
    avatar: 'SC',
    rating: 5,
    text: 'Como persona con dificultades de movilidad, valoro mucho la información que me proporciona.',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h3
          className="text-3xl font-boldxw text-gray-800 mb-2 text-center"
          style={{ fontFamily: 'Alata, sans-serif' }}
        >
          Testimonios de la Comunidad
        </h3>
        <p className="text-lg text-gray-600 mb-12 text-center font-light">
          Experiencias reales de viajeros accesibles
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#FF6F61] rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">
                    {testimonial.avatar}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-gray-800">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {testimonial.location}
                  </div>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 italic">
                &quot;{testimonial.text}&quot;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
