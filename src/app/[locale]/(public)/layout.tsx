import Navbar from '@/web/components/layout/Navbar';
import Footer from '@/web/components/layout/Footer';
import { auth } from '@/auth';

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <>
      <Navbar session={session} />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
