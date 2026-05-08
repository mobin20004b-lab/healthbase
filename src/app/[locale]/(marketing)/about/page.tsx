import { Metadata } from 'next';
import Timeline from '@/web/components/about/Timeline';
import TeamGrid from '@/web/components/about/TeamGrid';

export const metadata: Metadata = {
    title: 'About Us - Topmedica',
    description: 'Learn more about Topmedica and our mission.',
};

export default async function AboutPage() {
    return (
        <div className="min-h-screen py-16 bg-background">
            <div className="container mx-auto px-4">
                {/* Hero Section */}
                <div className="max-w-3xl mx-auto text-center mb-24">
                    <h1 className="text-4xl md:text-5xl font-bold text-on-surface mb-6">
                        Convergence of Care, Intelligence, and Design
                    </h1>
                    <p className="text-xl text-on-surface-variant">
                        We are building the future of healthcare discovery. Our platform connects patients with top-tier medical professionals through an intuitive, data-driven experience.
                    </p>
                </div>

                {/* Timeline Section */}
                <div className="mb-32">
                    <h2 className="text-3xl font-bold text-center text-on-surface mb-16">Our Journey</h2>
                    <Timeline />
                </div>

                {/* Team Section */}
                <div>
                    <h2 className="text-3xl font-bold text-center text-on-surface mb-4">Leadership Team</h2>
                    <p className="text-center text-on-surface-variant mb-12 max-w-2xl mx-auto">
                        Meet the experts combining medical knowledge with cutting-edge technology.
                    </p>
                    <TeamGrid />
                </div>
            </div>
        </div>
    );
}
