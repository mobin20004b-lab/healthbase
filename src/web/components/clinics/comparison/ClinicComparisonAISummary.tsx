'use client';

import React from 'react';
import { Card } from '@/web/components/ui/card';
import { Sparkles } from 'lucide-react';
import { ClinicWithRelations } from '@/services/clinics';

interface ClinicDetails {
  nextAvailable: string;
  waitTime: number;
  costLevel: number;
  costRange: string;
}

interface ClinicWithDetails extends ClinicWithRelations {
  details: ClinicDetails;
}

interface ClinicComparisonAISummaryProps {
  clinics: ClinicWithDetails[];
}

export default function ClinicComparisonAISummary({ clinics }: ClinicComparisonAISummaryProps) {
  if (!clinics || clinics.length < 2) {
    return null;
  }

  // Generate a mock AI summary based on deterministic details
  const generateSummary = () => {
    // Find clinic with shortest wait time
    const fastestWaitClinic = [...clinics].sort((a, b) => a.details.waitTime - b.details.waitTime)[0];
    // Find clinic with most available schedule
    const soonestAvailableClinic = [...clinics].sort((a, b) => {
        const order = ["Tomorrow", "In 2 days", "Next week", "In 3 weeks"];
        return order.indexOf(a.details.nextAvailable) - order.indexOf(b.details.nextAvailable);
    })[0];
    // Find most affordable clinic
    const cheapestClinic = [...clinics].sort((a, b) => a.details.costLevel - b.details.costLevel)[0];

    return (
      <div className="space-y-4">
        <p>Based on your selected clinics, here is a quick summary:</p>
        <ul className="list-disc pl-5 space-y-2">
            <li>
                <strong>Most Affordable:</strong> <span className="text-primary font-medium">{cheapestClinic.name}</span> offers the lowest estimated cost range ({cheapestClinic.details.costRange}).
            </li>
            <li>
                <strong>Fastest Service:</strong> <span className="text-primary font-medium">{fastestWaitClinic.name}</span> has the shortest average wait time of {fastestWaitClinic.details.waitTime} minutes.
            </li>
            <li>
                <strong>Soonest Appointment:</strong> <span className="text-primary font-medium">{soonestAvailableClinic.name}</span> has availability as soon as {soonestAvailableClinic.details.nextAvailable.toLowerCase()}.
            </li>
        </ul>
        <p className="text-sm italic text-on-surface-variant">
            Note: This is an AI-generated summary based on estimated clinic data.
        </p>
      </div>
    );
  };

  return (
    <Card variant="filled" className="mb-8 p-6 bg-primary/5 border border-primary/20">
      <div className="flex items-start gap-4">
        <div className="bg-primary/10 p-3 rounded-full">
            <Sparkles className="h-6 w-6 text-primary" />
        </div>
        <div>
            <h2 className="text-xl font-bold text-on-surface mb-2 flex items-center gap-2">
                AI Strength Summary
            </h2>
            <div className="text-on-surface-variant">
                {generateSummary()}
            </div>
        </div>
      </div>
    </Card>
  );
}
