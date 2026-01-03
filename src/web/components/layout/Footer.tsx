import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function Footer() {
    const t = useTranslations('Footer');
    const h = useTranslations('HomePage');

    return (
        <footer className="bg-surface-container-lowest border-t border-outline-variant/30">
            <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2 space-y-6">
                        <span className="text-3xl font-black tracking-tighter text-primary">Topmedica</span>
                        <p className="text-base text-on-surface-variant max-w-md leading-relaxed font-medium">
                            {h('subtitle')}
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface/50 mb-6">{t('links')}</h3>
                        <ul role="list" className="space-y-4">
                            <li>
                                <Link href="/clinics" className="text-sm font-bold text-on-surface-variant hover:text-primary transition-all">
                                    {h('stats.verified')}
                                </Link>
                            </li>
                            <li>
                                <Link href="/services" className="text-sm font-bold text-on-surface-variant hover:text-primary transition-all">
                                    {t('links')}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface/50 mb-6">{t('legal')}</h3>
                        <ul role="list" className="space-y-4">
                            <li>
                                <Link href="/privacy" className="text-sm font-bold text-on-surface-variant hover:text-primary transition-all">
                                    {t('privacy')}
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-sm font-bold text-on-surface-variant hover:text-primary transition-all">
                                    {t('terms')}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-16 border-t border-outline-variant/20 pt-10">
                    <p className="text-xs font-bold text-on-surface-variant/40 text-center tracking-widest uppercase">
                        &copy; {new Date().getFullYear()} TOPMEDICA. {t('rights')}.
                    </p>
                </div>
            </div>
        </footer>
    );
}
