'use client';

import { useTranslations } from 'next-intl';
import { Card } from '@/web/components/ui/card';
import { Button } from '@/web/components/ui/button';
import { MoreHorizontal, User as UserIcon, Shield, Mail, Calendar } from 'lucide-react';
import { useState } from 'react';

// Define a type for the serialized user data passed from the server
export type SerializedUser = {
    id: string;
    name: string | null;
    email: string | null;
    role: string;
    image: string | null;
    createdAt: string; // Serialized date
};

type Props = {
    users: SerializedUser[];
};

export default function PatientTable({ users }: Props) {
    const t = useTranslations('Admin.patients.table');
    const tActions = useTranslations('Admin.patients.actions');
    const [hoveredRow, setHoveredRow] = useState<string | null>(null);

    if (users.length === 0) {
        return (
            <Card className="p-12 text-center bg-surface-container-low border-dashed border-2 border-outline-variant/30">
                <div className="flex flex-col items-center gap-4">
                    <div className="p-4 rounded-full bg-surface-container-high">
                        <UserIcon className="w-8 h-8 text-on-surface-variant" />
                    </div>
                    <p className="text-on-surface-variant text-lg">{t('noPatients')}</p>
                </div>
            </Card>
        );
    }

    return (
        <div className="relative overflow-x-auto rounded-3xl border border-outline-variant/20 shadow-sm bg-surface">
            <table className="w-full text-left text-sm">
                <thead className="bg-surface-container-low text-on-surface-variant uppercase tracking-wider font-bold border-b border-outline-variant/20">
                    <tr>
                        <th scope="col" className="sticky left-0 z-20 bg-surface-container-low px-6 py-4 min-w-[200px] shadow-[4px_0_8px_-4px_rgba(0,0,0,0.05)]">
                            {t('name')}
                        </th>
                        <th scope="col" className="px-6 py-4 min-w-[250px]">
                            {t('email')}
                        </th>
                        <th scope="col" className="px-6 py-4">
                            {t('role')}
                        </th>
                        <th scope="col" className="px-6 py-4">
                            {t('joinedDate')}
                        </th>
                        <th scope="col" className="px-6 py-4 text-right w-[100px]">
                            {t('actions')}
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                    {users.map((user) => (
                        <tr
                            key={user.id}
                            className="group hover:bg-surface-container-highest/30 transition-colors relative"
                            onMouseEnter={() => setHoveredRow(user.id || null)}
                            onMouseLeave={() => setHoveredRow(null)}
                        >
                            <td className="sticky left-0 z-10 bg-surface group-hover:bg-surface-container-highest/30 px-6 py-3 font-medium text-on-surface whitespace-nowrap shadow-[4px_0_8px_-4px_rgba(0,0,0,0.05)] transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                        {user.image ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img src={user.image} alt={user.name || ''} className="w-full h-full rounded-full object-cover" />
                                        ) : (
                                            (user.name?.[0] || 'U').toUpperCase()
                                        )}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold">{user.name || t('noName')}</span>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-3 text-on-surface-variant/80">
                                <div className="flex items-center gap-2">
                                    <Mail className="w-4 h-4 text-primary/60" />
                                    {user.email}
                                </div>
                            </td>
                            <td className="px-6 py-3">
                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    user.role === 'ADMIN'
                                        ? 'bg-error/10 text-error'
                                        : 'bg-primary/10 text-primary'
                                }`}>
                                    <Shield className="w-3 h-3" />
                                    {user.role}
                                </span>
                            </td>
                            <td className="px-6 py-3 text-on-surface-variant/80">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-tertiary/60" />
                                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}
                                </div>
                            </td>
                            <td className="px-6 py-3 text-right">
                                <div className={`flex items-center justify-end gap-2 transition-opacity duration-200 ${hoveredRow === user.id ? 'opacity-100' : 'opacity-0'}`}>
                                    <Button variant="text" size="sm" className="h-8 px-2 text-primary">
                                        {tActions('edit')}
                                    </Button>
                                    <Button variant="text" size="sm" className="h-8 px-2 text-error">
                                        {tActions('delete')}
                                    </Button>
                                </div>
                                <div className={`absolute right-6 top-1/2 -translate-y-1/2 transition-opacity duration-200 ${hoveredRow === user.id ? 'opacity-0' : 'opacity-100'}`}>
                                    <Button variant="text" size="icon" className="h-8 w-8 text-on-surface-variant">
                                        <MoreHorizontal className="w-4 h-4" />
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
