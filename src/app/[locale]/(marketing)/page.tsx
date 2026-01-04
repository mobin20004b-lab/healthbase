import Hero from '@/web/components/landing/Hero';
import StatsGrid from '@/web/components/landing/StatsGrid';
import ValueProps from '@/web/components/landing/ValueProps';

export default function Home() {
  return (
    <main>
      <Hero />
      <StatsGrid />
      <ValueProps />
    </main>
  );
}
