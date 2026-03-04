"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const events = [
    {
        year: '2019',
        title: 'The Inception',
        description: 'Topmedica was founded with a vision to connect patients with top-tier medical specialists globally.',
    },
    {
        year: '2020',
        title: 'First 1,000 Partners',
        description: 'Reached a milestone of 1,000 verified specialist clinics across 15 countries.',
    },
    {
        year: '2022',
        title: 'AI Integration',
        description: 'Launched our AI-driven recommendation engine to provide hyper-personalized care matching.',
    },
    {
        year: '2024',
        title: 'Global Expansion',
        description: 'Expanded operations into the MENA region with full localized support in Arabic and Persian.',
    },
];

export default function Timeline() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <div className="relative py-20 px-4 max-w-4xl mx-auto" ref={containerRef}>
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-on-surface mb-4">Our Journey</h2>
                <p className="text-on-surface-variant max-w-2xl mx-auto">
                    A timeline of innovation, growth, and our relentless pursuit of democratizing access to premium healthcare.
                </p>
            </div>

            <div className="relative">
                {/* The vertical track */}
                <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-outline-variant/30 transform md:-translate-x-1/2 rounded-full" />

                {/* The animated drawing line */}
                <motion.div
                    className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-primary transform md:-translate-x-1/2 origin-top rounded-full"
                    style={{ scaleY }}
                />

                <div className="flex flex-col gap-12">
                    {events.map((event, index) => {
                        const isEven = index % 2 === 0;
                        return (
                            <motion.div
                                key={event.year}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className={`relative flex items-center justify-between w-full md:w-[120%] md:-ml-[10%] ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'} flex-row`}
                            >
                                {/* Dot indicator */}
                                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-surface border-4 border-primary rounded-full transform -translate-x-1/2 z-10" />

                                {/* Empty space for alternating layout on desktop */}
                                <div className="hidden md:block md:w-[45%]" />

                                {/* Content Card */}
                                <div className="ml-16 md:ml-0 md:w-[45%] w-full">
                                    <div className={`p-6 bg-surface-container-low rounded-2xl border border-outline-variant/20 shadow-sm hover:shadow-md transition-shadow relative
                                        ${isEven ? 'md:text-right' : 'md:text-left'} text-left`}
                                    >
                                        <div className="text-primary font-bold text-xl mb-2">{event.year}</div>
                                        <h3 className="text-xl font-bold text-on-surface mb-2">{event.title}</h3>
                                        <p className="text-on-surface-variant leading-relaxed">
                                            {event.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
