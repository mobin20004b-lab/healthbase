import type { Metadata } from "next";
import Navbar from "@/web/components/layout/Navbar";
import Footer from "@/web/components/layout/Footer";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Topmedica",
  description: "Convergence of Care, Intelligence, and Design",
};

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans text-on-surface">
      <Navbar session={session} />

      <main className="flex-1">
        {children}
      </main>

      <Footer />
    </div>
  );
}
