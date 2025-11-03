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
    description: 'Highly accessible',
  },
  {
    id: 'cordoba',
    name: 'Córdoba',
    country: 'Argentina',
    flag: '🇦🇷',
    accessibilityLevel: 'AA',
    image:
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/04/92/1c/d6/la-falda.jpg?w=1400&h=1400&s=1',
    description: 'Very accessible',
  },
  {
    id: 'madrid',
    name: 'Madrid',
    country: 'España',
    flag: '🇪🇸',
    accessibilityLevel: 'AAA',
    image:
      'https://media.viajando.travel/p/5ab10d44d4413324b6b53e55f6d45832/adjuntos/236/imagenes/000/486/0000486164/1200x0/smart/a-traves-forward_mad-madrid-buscara-potenciar-el-turismo-alta-gama.jpg',
    description: 'Highly accessible',
  },
  {
    id: 'mar-del-plata',
    name: 'Mar del Plata',
    country: 'Argentina',
    flag: '🇦🇷',
    accessibilityLevel: 'AA',
    image:
      'https://portalargentina.com.ar/wp-content/uploads/2024/07/LOBO-MARINO.webp',
    description: 'Very accessible',
  },
  {
    id: 'mendoza',
    name: 'Mendoza',
    country: 'Argentina',
    flag: '🇦🇷',
    accessibilityLevel: 'A',
    image:
      'https://www.mendoza.gov.ar/wp-content/uploads/sites/5/2024/02/WhatsApp-Image-2024-02-02-at-12.15.35.jpeg',
    description: 'Accessible',
  },
];

export const popularDestinations: Destination[] = [
  {
    id: 'barcelona',
    name: 'Barcelona',
    country: 'Spain',
    flag: '🇪🇸',
    accessibilityLevel: 'AAA',
    image:
      'https://imgcap.capturetheatlas.com/wp-content/uploads/2020/10/park-guell-best-things-to-do-in-barcelona.jpg',
    description: 'Highly accessible',
  },
  {
    id: 'amsterdam',
    name: 'Amsterdam',
    country: 'Netherlands',
    flag: '🇳🇱',
    accessibilityLevel: 'AA',
    image:
      'https://a.travel-assets.com/findyours-php/viewfinder/images/res70/504000/504208-north-holland.jpg',
    description: 'Very accessible',
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    flag: '🇯🇵',
    accessibilityLevel: 'AAA',
    image:
      'https://content-viajes.nationalgeographic.com.es/medio/2021/01/26/templo-de-asakusa_ec512f37_1249x840.jpg',
    description: 'Highly accessible',
  },
  {
    id: 'sydney',
    name: 'Sydney',
    country: 'Australia',
    flag: '🇦🇺',
    accessibilityLevel: 'AA',
    image: 'https://www.viajarsydney.com/img/que-visitar-sydney.jpg',
    description: 'Very accessible',
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
    features: ['Wheelchair', 'Roll-in shower', 'Ramps'],
    accessibilityFeatures: ['fas fa-wheelchair', 'fas fa-bath', 'fas fa-road'],
    type: 'AAA Accessible',
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
    features: ['Pool', 'Elevator', 'Restaurant'],
    accessibilityFeatures: [
      'fas fa-swimming-pool',
      'fas fa-elevator',
      'fas fa-utensils',
    ],
    type: 'Accessible Resort',
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
    features: ['Winery', 'View', 'Transfer'],
    accessibilityFeatures: [
      'fas fa-wine-glass-alt',
      'fas fa-mountain',
      'fas fa-shuttle-van',
    ],
    type: 'Wine Experience',
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
    features: ['Beach', 'Beach chair', 'Security'],
    accessibilityFeatures: [
      'fas fa-umbrella-beach',
      'fas fa-chair',
      'fas fa-life-ring',
    ],
    type: 'Accessible Beach',
  },
];

export const missionValues: MissionValue[] = [
  {
    id: 'community',
    title: 'Community',
    description:
      'We are a support network where travelers come together to help each other with feedback and suggestions. By sharing experiences and real solutions, we empower everyone to continue traveling and enjoying the world without disappointment.',
    icon: 'fas fa-users',
    color: 'bg-[#FF6F61]',
  },
];
