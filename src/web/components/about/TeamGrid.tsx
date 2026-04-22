"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/web/components/ui/card';

const teamMembers = [
    {
        id: 1,
        name: 'Dr. Sarah Jenkins',
        role: 'Chief Medical Officer',
        // Using generic Unsplash portraits for static images
        staticImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400&h=400',
        // Using placeholder URLs for GIF cinemagraphs to simulate the effect
        gifImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400&h=400&gif=true',
    },
    {
        id: 2,
        name: 'Michael Chen',
        role: 'Head of Engineering',
        staticImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400&h=400',
        gifImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400&h=400&gif=true',
    },
    {
        id: 3,
        name: 'Elena Rodriguez',
        role: 'Director of Product',
        staticImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=400',
        gifImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=400&gif=true',
    },
];

export default function TeamGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto px-4">
            {teamMembers.map((member) => (
                <TeamMemberCard key={member.id} member={member} />
            ))}
        </div>
    );
}

function TeamMemberCard({ member }: { member: typeof teamMembers[0] }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Card
            variant="elevated"
            className="overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-lg"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative w-full aspect-square bg-surface-container-high overflow-hidden">
                <Image
                    src={isHovered ? member.gifImage : member.staticImage}
                    alt={member.name}
                    fill
                    className="object-cover transition-opacity duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                />
            </div>
            <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold text-on-surface">{member.name}</h3>
                <p className="text-sm text-primary mt-1 font-medium">{member.role}</p>
            </CardContent>
        </Card>
    );
}
