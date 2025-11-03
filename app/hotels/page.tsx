import PopularDestinations from '../(home)//_components/Destinations/PopularDestinations';
import TrendingDestinations from '../(home)/_components/Destinations/TrendingDestinations';
import Hero from '../(home)/_components/Hero/Hero';
import MissionSection from '../(home)/_components/MissionSection/MissionSection';
import TestimonialsSection from '../(home)/_components/TestimonialsSection/TestimonialsSection';
import WeekendDeals from '../(home)/_components/WeekendDeals/WeekendDeals';

export default function Home() {
  return (
    <div
      className={`min-h-screen`}
      style={{ fontFamily: 'var(--font-nunito-sans)' }}
    >
      <Hero />
      <MissionSection />
      <TrendingDestinations />
      <WeekendDeals />
      <PopularDestinations />
      <TestimonialsSection />
    </div>
  );
}
