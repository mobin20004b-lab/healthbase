"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const milestones = [
    {
        year: '2020',
        title: 'The Inception',
        description: 'Topmedica was founded with a vision to make healthcare accessible and transparent.',
    },
    {
        year: '2021',
        title: 'Platform Beta Launch',
        description: 'Successfully launched our beta platform in the local market, onboarding our first 100 clinics.',
    },
    {
        year: '2022',
        title: 'Series A Funding',
        description: 'Secured $5M in Series A funding to expand our engineering team and enhance the patient experience.',
    },
    {
        year: '2023',
        title: 'National Expansion',
        description: 'Expanded services nationwide, integrating with major healthcare providers and insurance networks.',
    },
    {
        year: '2024',
        title: 'AI-Powered Discovery',
        description: 'Introduced machine learning algorithms to personalize clinic recommendations and reduce wait times.',
    },
];

export default function Timeline() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"],
    });

    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <div ref={containerRef} className="relative max-w-4xl mx-auto px-4 py-8">
            {/* Animated Vertical Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-outline-variant/30 transform md:-translate-x-1/2">
                <motion.div
                    className="w-full bg-primary origin-top"
                    style={{ height: lineHeight }}
                />
            </div>

            <div className="space-y-24">
                {milestones.map((milestone, index) => (
                    <div
                        key={milestone.year}
                        className={`relative flex flex-col md:flex-row items-start md:items-center ${
                            index % 2 === 0 ? 'md:flex-row-reverse' : ''
                        }`}
                    >
                        {/* Dot indicator */}
                        <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-primary transform -translate-x-[6px] md:-translate-x-1/2 mt-1.5 md:mt-0 z-10" />

                        {/* Content */}
                        <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className={`flex flex-col ${
                                    index % 2 === 0 ? 'md:items-start' : 'md:items-end md:text-right'
                                }`}
                            >
                                <span className="text-xl font-bold text-primary mb-2">
                                    {milestone.year}
                                </span>
                                <h3 className="text-2xl font-bold text-on-surface mb-3">
                                    {milestone.title}
                                </h3>
                                <p className="text-on-surface-variant leading-relaxed">
                                    {milestone.description}
                                </p>
                            </motion.div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
