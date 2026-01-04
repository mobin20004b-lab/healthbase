'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from '@/routing'; // Localized router
import { Search } from 'lucide-react';
import { Button } from '@/web/components/ui/button';
import { Input } from '@/web/components/ui/input';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Hero() {
  const t = useTranslations('HomePage');
  const router = useRouter();
  const [q, setQ] = useState('');

  const handleSearch = () => {
    if (!q.trim()) return;
    router.push(`/clinics?q=${encodeURIComponent(q)}`);
  };

  return (
    <div className="relative overflow-hidden bg-background py-20 sm:py-32 lg:pb-32 xl:pb-36 rtl:text-right">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-primary/10 blur-[100px] m3-shape-flower"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -45, 0],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-tertiary/10 blur-[80px] m3-shape-flower"
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20 flex flex-col items-center">
          <div className="relative z-10 mx-auto max-w-2xl lg:col-span-7 lg:max-w-none lg:pt-6 xl:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl font-extrabold tracking-tight text-on-surface sm:text-6xl text-balance leading-tight">
                {/* Fallback to hardcoded string if translation is missing, but assume translation exists */}
                {t.has('heroTitle') ? t('heroTitle') : "Convergence of Care, Intelligence, and Design"}
              </h1>
              <p className="mt-6 text-lg text-on-surface-variant leading-relaxed">
                {t.has('heroSubtitle') ? t('heroSubtitle') : t('subtitle')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-10"
            >
              {/* Smart Search Bar - Spatial UI */}
              <div className="flex w-full max-w-lg items-center rounded-extra-large border border-outline-variant bg-surface-container-lowest/80 backdrop-blur-xl p-2 shadow-2xl shadow-primary/5 focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent transition-all hover:shadow-primary/10">
                <div className="pl-4 pr-2">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <Input
                  type="text"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder={t('searchPlaceholder')}
                  className="flex-1 border-none bg-transparent shadow-none focus-visible:ring-0 text-lg h-auto py-3 placeholder:text-on-surface-variant/50"
                />
                <Button
                  onClick={handleSearch}
                  size="lg"
                  className="rounded-xl px-8"
                >
                  {t('searchButton')}
                </Button>
              </div>

              {/* Suggested tags - simulated dropdown style */}
              <div className="mt-4 flex flex-wrap gap-2">
                 {/* This could be dynamic later */}
                 {['Cardiology', 'Dermatology', 'Dentistry'].map((tag, i) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + (i * 0.1) }}
                      className="px-3 py-1 text-sm bg-surface-container-high rounded-full text-on-surface-variant border border-outline-variant/50 cursor-pointer hover:bg-surface-container-highest transition-colors"
                      onClick={() => {
                          setQ(tag);
                          // Optionally search immediately
                      }}
                    >
                      {tag}
                    </motion.span>
                 ))}
              </div>
            </motion.div>
          </div>

          <div className="relative mt-10 sm:mt-20 lg:col-span-5 lg:row-span-2 lg:mt-0 xl:col-span-6 flex justify-center items-center">
             {/* Abstract 3D/Floating Nodes Animation */}
             <motion.div
               className="relative w-full h-[400px] flex items-center justify-center perspective-[1000px]"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 1 }}
             >
                {/* Central Core */}
                <motion.div
                  animate={{
                    y: [0, -20, 0],
                    rotateZ: [0, 5, -5, 0]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-32 h-32 bg-gradient-to-br from-primary to-primary-container rounded-3xl m3-shape-squircle shadow-2xl z-20 flex items-center justify-center relative"
                >
                   <div className="w-16 h-16 bg-on-primary/20 rounded-full blur-xl absolute" />
                   <div className="w-8 h-8 bg-surface rounded-full shadow-inner" />
                </motion.div>

                {/* Satellite 1 */}
                <motion.div
                  animate={{
                    x: [80, 100, 80],
                    y: [-60, -80, -60],
                    rotate: [0, 45, 0]
                  }}
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                  className="absolute w-20 h-20 bg-surface-container-high/80 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg z-10 flex items-center justify-center"
                >
                   <div className="w-8 h-2 bg-secondary/50 rounded-full" />
                </motion.div>

                {/* Satellite 2 */}
                <motion.div
                   animate={{
                    x: [-80, -100, -80],
                    y: [60, 80, 60],
                    rotate: [0, -30, 0]
                   }}
                   transition={{
                     duration: 8,
                     repeat: Infinity,
                     ease: "easeInOut",
                     delay: 1
                   }}
                   className="absolute w-24 h-24 bg-tertiary-container/80 backdrop-blur-md border border-white/20 rounded-full shadow-lg z-10 flex items-center justify-center"
                >
                   <div className="w-10 h-10 border-2 border-on-tertiary-container/30 rounded-full" />
                </motion.div>

                 {/* Connecting Lines (SVG) */}
                 <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-30">
                    <motion.path
                       d="M200 200 L 280 140" // Approx coords, assumes center 200,200
                       stroke="currentColor"
                       strokeWidth="2"
                       className="text-outline"
                       animate={{ pathLength: [0, 1, 0], opacity: [0, 0.5, 0] }}
                       transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    />
                     <motion.path
                       d="M200 200 L 120 260"
                       stroke="currentColor"
                       strokeWidth="2"
                       className="text-outline"
                       animate={{ pathLength: [0, 1, 0], opacity: [0, 0.5, 0] }}
                       transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: 2 }}
                    />
                 </svg>
             </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
