import Hero from '@/web/components/landing/Hero';
import TrustBento from '@/web/components/landing/TrustBento';
import ValueProps from '@/web/components/landing/ValueProps';
import { ScrollAnimationWrapper } from '@/web/components/landing/ScrollAnimationWrapper';

export default function Home() {
  return (
    <main>
      <Hero />
      <ScrollAnimationWrapper>
        <TrustBento />
      </ScrollAnimationWrapper>
      <ScrollAnimationWrapper>
        <ValueProps />
      </ScrollAnimationWrapper>
    </main>
  );
}
