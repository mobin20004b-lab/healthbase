"use client";

import React, { useState } from 'react';
import Image from 'next/image';
interface TeamMember {
    id: string;
    name: string;
    role: string;
    staticImage: string;
    gifImage: string; // The cinemagraph/video source
}

const team: TeamMember[] = [
    {
        id: '1',
        name: 'Dr. Sarah Chen',
        role: 'Chief Medical Officer',
        staticImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=400&auto=format&fit=crop',
        gifImage: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400&auto=format&fit=crop' // Using standard photo as mock gif for now
    },
    {
        id: '2',
        name: 'Marcus Thorne',
        role: 'Head of Patient Experience',
        staticImage: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400&auto=format&fit=crop',
        gifImage: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=400&auto=format&fit=crop'
    },
    {
        id: '3',
        name: 'Elena Rodriguez',
        role: 'VP of Global Operations',
        staticImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
        gifImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop'
    },
    {
        id: '4',
        name: 'David Kim',
        role: 'Lead AI Engineer',
        staticImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
        gifImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop'
    }
];

export default function TeamGrid() {
    return (
        <div className="py-20 px-4 max-w-6xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-on-surface mb-4">Meet the Visionaries</h2>
                <p className="text-on-surface-variant max-w-2xl mx-auto">
                    The intersection of healthcare and technology is driven by people. Get to know the team building the future.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {team.map((member) => (
                    <TeamMemberCard key={member.id} member={member} />
                ))}
            </div>
        </div>
    );
}

function TeamMemberCard({ member }: { member: TeamMember }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="group cursor-pointer flex flex-col items-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden mb-4 bg-surface-container-highest shadow-sm">
                {/* Static Image */}
                <Image
                    src={member.staticImage}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className={`object-cover transition-opacity duration-700 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
                />

                {/* Cinemagraph / GIF (Simulated with second image) */}
                <Image
                    src={member.gifImage}
                    alt={`${member.name} motion`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className={`object-cover transition-opacity duration-700 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                />

                {/* Optional overlay gradient for better text legibility if needed */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <h3 className="text-lg font-bold text-on-surface text-center">{member.name}</h3>
            <p className="text-sm text-on-surface-variant text-center">{member.role}</p>
        </div>
    );
}
