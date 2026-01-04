'use client';

import { useTranslations } from 'next-intl';
import { BentoGrid, BentoItem } from '@/web/components/ui/bento-grid';
import { ShieldCheck, Users, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Animated Counter Component
function AnimatedCounter({ from = 0, to, duration = 2 }: { from?: number; to: number; duration?: number }) {
  const [count, setCount] = useState(from);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

      setCount(Math.floor(progress * (to - from) + from));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [from, to, duration]);

  return <span>{count.toLocaleString()}</span>;
}

export default function TrustBento() {
  const t = useTranslations('HomePage.Trust');

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <motion.h2
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6 }}
             className="text-3xl font-bold tracking-tight text-on-surface sm:text-4xl"
          >
            {t.has('title') ? t('title') : "Trusted by Patients and Providers"}
          </motion.h2>
          <motion.p
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6, delay: 0.1 }}
             className="mt-4 text-lg leading-8 text-on-surface-variant"
          >
             {t.has('subtitle') ? t('subtitle') : "Our platform is built on a foundation of security, scale, and satisfaction."}
          </motion.p>
        </div>

        <BentoGrid>
          {/* Cell 1: Counter */}
          <BentoItem colSpan={2} rowSpan={1} className="relative overflow-hidden flex flex-col justify-center items-center bg-primary-container text-on-primary-container">
            <motion.div
               initial={{ scale: 0.8, opacity: 0 }}
               whileInView={{ scale: 1, opacity: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.5 }}
               className="text-center z-10"
            >
              <div className="text-6xl font-black tracking-tight mb-2">
                <AnimatedCounter to={15000} />+
              </div>
              <div className="text-xl font-medium opacity-80">
                {t.has('specialists') ? t('specialists') : "Specialists Onboarded"}
              </div>
            </motion.div>

            {/* Background Icon Decoration */}
            <Users className="absolute -bottom-10 -right-10 w-64 h-64 opacity-10 rotate-12" />
          </BentoItem>

          {/* Cell 2: Security */}
          <BentoItem colSpan={1} rowSpan={1} className="bg-tertiary-container text-on-tertiary-container flex flex-col items-center justify-center text-center">
            <motion.div
              initial={{ rotateY: 180, opacity: 0 }}
              whileInView={{ rotateY: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
               <ShieldCheck className="w-20 h-20 mb-4 mx-auto text-on-tertiary-container" />
            </motion.div>
            <h3 className="text-2xl font-bold mb-2">HIPAA Secure</h3>
            <p className="text-sm opacity-80 px-4">
              {t.has('security') ? t('security') : "Enterprise-grade data protection."}
            </p>
          </BentoItem>

          {/* Cell 3: Testimonials (Carousel Placeholder) */}
          <BentoItem colSpan={1} rowSpan={2} className="bg-surface-container-high relative flex flex-col">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary" />
             <div className="flex-1 flex flex-col justify-between p-2">
                <div className="space-y-4">
                   <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />
                   <p className="text-lg italic text-on-surface font-medium leading-snug">
                     &quot;{t.has('testimonial') ? t('testimonial') : "Topmedica transformed how I manage my clinic's schedule. It's simply intuitive."}&quot;
                   </p>
                </div>
                <div className="flex items-center gap-3 mt-6">
                   <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center text-lg font-bold">
                     DR
                   </div>
                   <div>
                      <div className="font-bold text-on-surface">Dr. A. Rahimi</div>
                      <div className="text-xs text-on-surface-variant">Cardiologist</div>
                   </div>
                </div>
             </div>
          </BentoItem>

           {/* Cell 4: Filler / Visual */}
           <BentoItem colSpan={3} rowSpan={1} className="bg-surface relative overflow-hidden group">
              <div className="absolute inset-0 bg-grid-black/[0.05] -z-10" />
              <div className="flex items-center justify-between h-full px-8">
                 <div className="max-w-md">
                    <h3 className="text-xl font-bold text-primary mb-2">
                       {t.has('joinTitle') ? t('joinTitle') : "Join the Future of Healthcare"}
                    </h3>
                    <p className="text-on-surface-variant text-sm">
                       {t.has('joinSubtitle') ? t('joinSubtitle') : "Seamlessly connect with patients and manage your practice with modern tools designed for efficiency."}
                    </p>
                 </div>
                 <div className="hidden sm:block">
                     <motion.div
                       animate={{ x: [0, 10, 0] }}
                       transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                       className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center"
                     >
                        <div className="w-4 h-4 rounded-full bg-primary" />
                     </motion.div>
                 </div>
              </div>
           </BentoItem>
        </BentoGrid>
      </div>
    </div>
  );
}
