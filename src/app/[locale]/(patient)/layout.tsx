import type { Metadata } from "next";
import PatientNavigation from "@/web/components/layout/PatientNavigation";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Patient Portal | Topmedica",
};

export default async function PatientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="flex min-h-screen bg-background text-on-surface">
      <PatientNavigation />

      <main className="flex-1 pb-24 md:pb-0 md:pl-0">
        <div className="container mx-auto p-4 md:p-6 lg:p-8">
            {children}
        </div>
      </main>
    </div>
  );
}
