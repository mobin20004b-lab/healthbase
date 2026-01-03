'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from 'next/navigation';
import { Menu, X, Globe } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/web/components/ui/button';
import { Session } from 'next-auth';

interface NavbarProps {
    session: Session | null;
}

export default function Navbar({ session }: NavbarProps) {
    const t = useTranslations('Navigation');
    const locale = useLocale();
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const otherLocale = locale === 'fa' ? 'en' : 'fa';
    const otherLocaleLabel = locale === 'fa' ? 'EN' : 'FA';

    return (
        <header className="bg-surface-container-lowest/80 backdrop-blur-xl sticky top-0 z-50 border-b border-outline-variant/20 shadow-sm leading-none">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <Link href="/" className="-m-1.5 p-1.5 group">
                        <span className="text-2xl font-black tracking-tighter text-primary group-hover:opacity-80 transition-all">Topmedica</span>
                    </Link>
                </div>

                {/* Mobile menu button */}
                <div className="flex lg:hidden">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-xl text-on-surface hover:bg-surface-container-high"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <span className="sr-only">Open menu</span>
                        {mobileMenuOpen ? (
                            <X className="h-6 w-6" aria-hidden="true" />
                        ) : (
                            <Menu className="h-6 w-6" aria-hidden="true" />
                        )}
                    </Button>
                </div>

                {/* Desktop navigation */}
                <div className="hidden lg:flex lg:gap-x-10">
                    <Link href="/clinics" className="text-sm font-bold leading-6 text-on-surface-variant hover:text-primary transition-all relative group">
                        {t('clinics')}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                    </Link>
                    <Link href="/services" className="text-sm font-bold leading-6 text-on-surface-variant hover:text-primary transition-all relative group">
                        {t('services')}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                    </Link>
                    <Link href="/favorites" className="text-sm font-bold leading-6 text-on-surface-variant hover:text-primary transition-all relative group">
                        {t('favorites')}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                    </Link>
                    <Link href="/about" className="text-sm font-bold leading-6 text-on-surface-variant hover:text-primary transition-all relative group">
                        {t('about')}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                    </Link>
                </div>

                <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-6 lg:items-center">
                    {/* Language Switcher */}
                    <Link href={pathname} locale={otherLocale}>
                        <Button variant="ghost" size="sm" className="flex items-center gap-1.5 font-bold text-on-surface-variant hover:text-primary bg-surface-container-low border border-outline-variant/20 rounded-full px-4">
                            <Globe className="h-4 w-4" />
                            {otherLocaleLabel}
                        </Button>
                    </Link>
                    {session?.user?.role === 'ADMIN' && (
                        <Link href="/admin">
                            <Button variant="ghost" className="text-sm font-black text-primary hover:bg-primary/5 rounded-full px-4">
                                Admin
                            </Button>
                        </Link>
                    )}
                    {session ? (
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-surface-container-high flex items-center justify-center font-black text-on-surface m3-shape-flower">
                                {session.user?.name?.[0] || 'U'}
                            </div>
                        </div>
                    ) : (
                        <Link href="/auth/login">
                            <Button variant="default" className="rounded-full px-6 font-black shadow-lg shadow-primary/10">
                                {t('login')}
                            </Button>
                        </Link>
                    )}
                </div>
            </nav>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="space-y-1 px-4 pb-6 pt-2 bg-surface-container-lowest border-b border-outline-variant/20">
                        <Link
                            href="/clinics"
                            className="block rounded-2xl px-4 py-3 text-base font-bold leading-7 text-on-surface hover:bg-surface-container-high transition-all"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {t('clinics')}
                        </Link>
                        <Link
                            href="/services"
                            className="block rounded-2xl px-4 py-3 text-base font-bold leading-7 text-on-surface hover:bg-surface-container-high transition-all"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {t('services')}
                        </Link>
                        <Link
                            href="/favorites"
                            className="block rounded-2xl px-4 py-3 text-base font-bold leading-7 text-on-surface hover:bg-surface-container-high transition-all"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {t('favorites')}
                        </Link>
                        <Link
                            href="/about"
                            className="block rounded-2xl px-4 py-3 text-base font-bold leading-7 text-on-surface hover:bg-surface-container-high transition-all"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {t('about')}
                        </Link>
                        <div className="px-4 py-3 space-y-4">
                            <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                                <Button className="w-full rounded-2xl font-black py-6 shadow-xl shadow-primary/10">
                                    {t('login')}
                                </Button>
                            </Link>
                            <Link href={pathname} locale={otherLocale} onClick={() => setMobileMenuOpen(false)}>
                                <Button variant="tonal" className="w-full rounded-2xl font-bold py-6 gap-2">
                                    <Globe className="h-5 w-5" />
                                    {otherLocale === 'en' ? 'English' : 'فارسی'}
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
