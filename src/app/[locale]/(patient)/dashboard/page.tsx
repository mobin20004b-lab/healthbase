
import { setRequestLocale } from 'next-intl/server';
import { auth } from '@/auth';
import { BentoGrid, BentoItem } from '@/web/components/ui/bento-grid';
import { ActivityChart } from '@/web/components/patient/ActivityChart';
import { CarePlan } from '@/web/components/patient/CarePlan';
import { MedicationTracker } from '@/web/components/patient/MedicationTracker';
import { Card } from '@/web/components/ui/card';
import { CalendarDays, FileText, Stethoscope } from 'lucide-react';
import Link from 'next/link';

export default async function PatientDashboard({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale;
  setRequestLocale(locale);
  // Using generic namespace for now as Patient.dashboard might not exist yet
  // Falling back to common strings if not found or empty
  // Assuming 'Common' or similar exists, but creating placeholders mostly.

  const session = await auth();
  if (!session) {
    // In real app, middleware handles this, but safe check
    // redirect(`/${locale}/auth/login`);
  }

  // Mock Data Logic
  const userFirstName = session?.user?.name?.split(' ')[0] || 'Patient';

  return (
    <div className="min-h-screen bg-background pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">

        {/* Welcome Section */}
        <div className="mb-8">
            <h1 className="text-3xl font-black text-on-surface mb-2">
                Hello, {userFirstName} 👋
            </h1>
            <p className="text-lg text-on-surface-variant font-medium">
                Here is your daily health summary.
            </p>
        </div>

        {/* Quick Actions Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
             {[
                 { label: 'Book Appointment', icon: CalendarDays, href: `/${locale}/search` },
                 { label: 'My Records', icon: FileText, href: `/${locale}/dashboard/records` },
                 { label: 'Find a Doctor', icon: Stethoscope, href: `/${locale}/search` },
                 { label: 'Prescriptions', icon: FileText, href: `/${locale}/dashboard/prescriptions` }, // Placeholder
             ].map((action, i) => (
                 <Link key={i} href={action.href}>
                    <Card variant="bento" className="p-4 flex flex-col items-center justify-center gap-2 hover:bg-surface-container-high transition-colors cursor-pointer group h-full">
                        <div className="p-3 rounded-full bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-on-secondary transition-colors m3-motion">
                            <action.icon className="w-6 h-6" />
                        </div>
                        <span className="text-sm font-bold text-on-surface text-center">{action.label}</span>
                    </Card>
                 </Link>
             ))}
        </div>

        {/* Main Bento Grid */}
        <BentoGrid>
            {/* 1. Activity Chart (Large) */}
            <BentoItem colSpan={2} rowSpan={2}>
                <ActivityChart />
            </BentoItem>

            {/* 2. Care Plan (Medium) */}
            <BentoItem colSpan={1} rowSpan={1}>
                <CarePlan
                    progress={75}
                    title="Diabetes Care"
                    subtitle="On track this week"
                />
            </BentoItem>

            {/* 3. Medication Tracker (Tall) */}
            <BentoItem colSpan={1} rowSpan={2}>
                <MedicationTracker />
            </BentoItem>

            {/* 4. Upcoming Appointment (Medium) */}
            <BentoItem colSpan={1} rowSpan={1}>
                 <Card variant="bento" className="p-6 bg-primary-container/20 border-primary/20 h-full flex flex-col justify-between">
                     <div>
                         <div className="flex items-center gap-2 mb-2">
                             <CalendarDays className="w-5 h-5 text-primary" />
                             <span className="text-xs font-bold text-primary uppercase tracking-wide">Next Visit</span>
                         </div>
                         <h3 className="text-lg font-black text-on-surface">Dr. Sarah Smith</h3>
                         <p className="text-sm text-on-surface-variant font-medium">Cardiologist</p>
                     </div>
                     <div className="mt-4">
                         <div className="text-2xl font-black text-primary">Wed, 12</div>
                         <div className="text-sm font-bold text-on-surface-variant">10:00 AM</div>
                     </div>
                 </Card>
            </BentoItem>

        </BentoGrid>
      </div>
    </div>
  );
}
