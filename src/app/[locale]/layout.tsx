import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { Inter, Vazirmatn } from 'next/font/google';
import '../globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from 'sonner';
import Navbar from '@/web/components/layout/Navbar';
import Footer from '@/web/components/layout/Footer';
import { auth } from '@/auth';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const vazir = Vazirmatn({ subsets: ['arabic', 'latin'], variable: '--font-vazir' });

export const metadata: Metadata = {
  title: 'Topmedica',
  description: 'Transparency in Healthcare',
};

// Generate static params for both locales
export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'fa' }];
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Await params in Next.js 15
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  const messages = await getMessages();
  const session = await auth();

  return (
    <html lang={locale} dir={locale === 'fa' ? 'rtl' : 'ltr'}>
      <body className={cn(
        inter.variable,
        vazir.variable,
        "font-sans min-h-screen bg-background antialiased flex flex-col"
      )}>
        <NextIntlClientProvider messages={messages}>
          <Navbar session={session} />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
