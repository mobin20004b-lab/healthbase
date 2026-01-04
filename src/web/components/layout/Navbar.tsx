'use client';

import { useTranslations, useLocale } from 'next-intl';
import { usePathname } from '@/routing';
import { Link } from '@/routing';
import { Menu, Globe } from 'lucide-react';
import { Button } from '@/web/components/ui/button';
import { Session } from 'next-auth';
import { StickyHeader } from '@/web/components/ui/sticky-header';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetClose, useSheet } from '@/web/components/ui/sheet';
import * as React from "react";

interface NavbarProps {
    session: Session | null;
}

// Wrapper to close sheet on navigation
function MobileLink({ href, locale, children, className }: { href: string, locale?: string, children: React.ReactNode, className?: string }) {
    const { setOpen } = useSheet();
    return (
        <Link
            href={href}
            locale={locale}
            className={className}
            onClick={() => setOpen(false)}
        >
            {children}
        </Link>
    )
}

export default function Navbar({ session }: NavbarProps) {
    const t = useTranslations('Navigation');
    const locale = useLocale();
    const pathname = usePathname();

    const otherLocale = locale === 'fa' ? 'en' : 'fa';
    const otherLocaleLabel = locale === 'fa' ? 'EN' : 'FA';
    const isRTL = locale === 'fa';

    return (
        <StickyHeader>
            <nav className="flex w-full items-center justify-between" aria-label="Global">
                <div className="flex lg:flex-1">
                    <Link href="/" className="-m-1.5 p-1.5 group">
                        <span className="text-2xl font-black tracking-tighter text-primary group-hover:opacity-80 transition-all">Topmedica</span>
                    </Link>
                </div>

                {/* Mobile menu button via Sheet */}
                <div className="flex lg:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-xl text-on-surface hover:bg-surface-container-high"
                            >
                                <span className="sr-only">Open menu</span>
                                <Menu className="h-6 w-6" aria-hidden="true" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side={isRTL ? 'right' : 'left'}>
                            <SheetHeader className="text-left rtl:text-right">
                                <SheetTitle className="text-2xl font-black text-primary">Topmedica</SheetTitle>
                            </SheetHeader>
                            <div className="flex flex-col gap-4 mt-8">
                                <MobileLink
                                    href="/clinics"
                                    className="block rounded-2xl px-4 py-3 text-base font-bold leading-7 text-on-surface hover:bg-surface-container-high transition-all"
                                >
                                    {t('clinics')}
                                </MobileLink>
                                <MobileLink
                                    href="/services"
                                    className="block rounded-2xl px-4 py-3 text-base font-bold leading-7 text-on-surface hover:bg-surface-container-high transition-all"
                                >
                                    {t('services')}
                                </MobileLink>
                                <MobileLink
                                    href="/favorites"
                                    className="block rounded-2xl px-4 py-3 text-base font-bold leading-7 text-on-surface hover:bg-surface-container-high transition-all"
                                >
                                    {t('favorites')}
                                </MobileLink>
                                <MobileLink
                                    href="/about"
                                    className="block rounded-2xl px-4 py-3 text-base font-bold leading-7 text-on-surface hover:bg-surface-container-high transition-all"
                                >
                                    {t('about')}
                                </MobileLink>
                                <div className="space-y-4 pt-4 border-t border-outline-variant/20">
                                    {!session ? (
                                        <MobileLink href="/auth/login" className="block">
                                            <Button className="w-full rounded-2xl font-black py-6 shadow-xl shadow-primary/10">
                                                {t('login')}
                                            </Button>
                                        </MobileLink>
                                    ) : (
                                         <div className="flex items-center gap-3 px-4">
                                            <div className="h-10 w-10 rounded-full bg-surface-container-high flex items-center justify-center font-black text-on-surface m3-shape-flower">
                                                {session.user?.name?.[0] || 'U'}
                                            </div>
                                            <span className="font-bold">{session.user?.name}</span>
                                        </div>
                                    )}
                                    <MobileLink href={pathname} locale={otherLocale} className="block">
                                        <Button variant="tonal" className="w-full rounded-2xl font-bold py-6 gap-2">
                                            <Globe className="h-5 w-5" />
                                            {otherLocale === 'en' ? 'English' : 'فارسی'}
                                        </Button>
                                    </MobileLink>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
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
        </StickyHeader>
    );
}
