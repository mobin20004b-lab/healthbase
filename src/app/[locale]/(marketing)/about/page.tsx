import React from 'react';
import { Metadata } from 'next';
import Timeline from '@/web/components/about/Timeline';
import TeamGrid from '@/web/components/about/TeamGrid';

export const metadata: Metadata = {
    title: 'About Us - Topmedica',
    description: 'Learn about the history and the team behind Topmedica.',
};

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative py-24 px-4 overflow-hidden bg-surface-container-low border-b border-outline-variant/10">
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-on-surface mb-6 tracking-tight">
                        Redefining the <br className="hidden md:block"/>
                        <span className="text-primary">Standard of Care</span>
                    </h1>
                    <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto">
                        We believe that distance should never be a barrier to exceptional healthcare.
                        Topmedica seamlessly bridges the gap between patients and the world's leading medical experts.
                    </p>
                </div>

                {/* Abstract background elements */}
                <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 right-0 transform translate-y-1/3 translate-x-1/3 w-[30rem] h-[30rem] bg-tertiary/10 rounded-full blur-3xl pointer-events-none" />
            </section>

            {/* Timeline Component */}
            <section className="py-12">
                <Timeline />
            </section>

            {/* Team Grid Component */}
            <section className="py-12 bg-surface-container-lowest border-t border-outline-variant/10">
                <TeamGrid />
            </section>
        </main>
    );
}
