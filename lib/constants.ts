import { Destination, HotelDeal, MissionValue } from '@/types';

export const trendingDestinations: Destination[] = [
  {
    id: 'buenos-aires',
    name: 'Buenos Aires',
    country: 'Argentina',
    flag: '🇦🇷',
    accessibilityLevel: 'AAA',
    image:
      'https://media.staticontent.com/media/pictures/77797799-6ce3-42b4-92b4-38d73009e47b',
    description: 'Altamente accesible',
  },
  {
    id: 'cordoba',
    name: 'Córdoba',
    country: 'Argentina',
    flag: '🇦🇷',
    accessibilityLevel: 'AA',
    image:
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/04/92/1c/d6/la-falda.jpg?w=1400&h=1400&s=1',
    description: 'Muy accesible',
  },
  {
    id: 'madrid',
    name: 'Madrid',
    country: 'España',
    flag: '🇪🇸',
    accessibilityLevel: 'AAA',
    image:
      'https://media.viajando.travel/p/5ab10d44d4413324b6b53e55f6d45832/adjuntos/236/imagenes/000/486/0000486164/1200x0/smart/a-traves-forward_mad-madrid-buscara-potenciar-el-turismo-alta-gama.jpg',
    description: 'Altamente accesible',
  },
  {
    id: 'mar-del-plata',
    name: 'Mar del Plata',
    country: 'Argentina',
    flag: '🇦🇷',
    accessibilityLevel: 'AA',
    image:
      'https://portalargentina.com.ar/wp-content/uploads/2024/07/LOBO-MARINO.webp',
    description: 'Muy accesible',
  },
  {
    id: 'mendoza',
    name: 'Mendoza',
    country: 'Argentina',
    flag: '🇦🇷',
    accessibilityLevel: 'A',
    image:
      'https://www.mendoza.gov.ar/wp-content/uploads/sites/5/2024/02/WhatsApp-Image-2024-02-02-at-12.15.35.jpeg',
    description: 'Accesible',
  },
];

export const popularDestinations: Destination[] = [
  {
    id: 'barcelona',
    name: 'Barcelona',
    country: 'España',
    flag: '🇪🇸',
    accessibilityLevel: 'AAA',
    image:
      'https://imgcap.capturetheatlas.com/wp-content/uploads/2020/10/park-guell-best-things-to-do-in-barcelona.jpg',
    description: 'Altamente accesible',
  },
  {
    id: 'amsterdam',
    name: 'Ámsterdam',
    country: 'Países Bajos',
    flag: '🇳🇱',
    accessibilityLevel: 'AA',
    image:
      'https://a.travel-assets.com/findyours-php/viewfinder/images/res70/504000/504208-north-holland.jpg',
    description: 'Muy accesible',
  },
  {
    id: 'tokyo',
    name: 'Tokio',
    country: 'Japón',
    flag: '🇯🇵',
    accessibilityLevel: 'AAA',
    image:
      'https://content-viajes.nationalgeographic.com.es/medio/2021/01/26/templo-de-asakusa_ec512f37_1249x840.jpg',
    description: 'Altamente accesible',
  },
  {
    id: 'sydney',
    name: 'Sídney',
    country: 'Australia',
    flag: '🇦🇺',
    accessibilityLevel: 'AA',
    image: 'https://www.viajarsydney.com/img/que-visitar-sydney.jpg',
    description: 'Muy accesible',
  },
];

export const weekendDeals: HotelDeal[] = [
  {
    id: 'gran-buenos-aires',
    name: 'Gran Buenos Aires',
    location: 'Buenos Aires, Argentina',
    originalPrice: 425890,
    discountedPrice: 340712,
    discount: '20% OFF',
    rating: 5,
    reviewCount: 2180,
    image:
      'https://media.staticontent.com/media/pictures/77797799-6ce3-42b4-92b4-38d73009e47b',
    features: ['Silla de ruedas', 'Ducha accesible', 'Rampas'],
    accessibilityFeatures: ['fas fa-wheelchair', 'fas fa-bath', 'fas fa-road'],
    type: 'AAA Accesible',
  },
  {
    id: 'resort-cordoba',
    name: 'Resort Córdoba',
    location: 'Villa Carlos Paz, Argentina',
    originalPrice: 256420,
    discountedPrice: 205136,
    discount: '25% OFF',
    rating: 4,
    reviewCount: 1742,
    image:
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/04/92/1c/d6/la-falda.jpg?w=1400&h=1400&s=1',
    features: ['Piscina', 'Ascensor', 'Restaurante'],
    accessibilityFeatures: [
      'fas fa-swimming-pool',
      'fas fa-elevator',
      'fas fa-utensils',
    ],
    type: 'Resort Accesible',
  },
  {
    id: 'hotel-mendoza',
    name: 'Hotel Mendoza',
    location: 'Mendoza, Argentina',
    originalPrice: 380650,
    discountedPrice: 304520,
    discount: '18% OFF',
    rating: 4.5,
    reviewCount: 3125,
    image:
      'https://www.mendoza.gov.ar/wp-content/uploads/sites/5/2024/02/WhatsApp-Image-2024-02-02-at-12.15.35.jpeg',
    features: ['Bodega', 'Vista', 'Traslado'],
    accessibilityFeatures: [
      'fas fa-wine-glass-alt',
      'fas fa-mountain',
      'fas fa-shuttle-van',
    ],
    type: 'Experiencia Vinícola',
  },
  {
    id: 'resort-mar-del-plata',
    name: 'Resort Mar del Plata',
    location: 'Mar del Plata, Argentina',
    originalPrice: 412380,
    discountedPrice: 329904,
    discount: '22% OFF',
    rating: 4,
    reviewCount: 1956,
    image:
      'https://portalargentina.com.ar/wp-content/uploads/2024/07/LOBO-MARINO.webp',
    features: ['Playa', 'Silla de playa', 'Seguridad'],
    accessibilityFeatures: [
      'fas fa-umbrella-beach',
      'fas fa-chair',
      'fas fa-life-ring',
    ],
    type: 'Playa Accesible',
  },
];

export const missionValues: MissionValue[] = [
  {
    id: 'community',
    title: 'Comunidad',
    description:
      'Somos una red de apoyo donde los viajeros se unen para ayudarse mutuamente con comentarios y sugerencias. Al compartir experiencias y soluciones reales, empoderamos a todos para seguir viajando y disfrutando del mundo sin decepciones.',
    icon: 'fas fa-users',
    color: 'bg-[#E36E4A]',
  },
];
