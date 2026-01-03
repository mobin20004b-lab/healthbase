
'use client';

import { useState } from 'react';
import { useRouter } from '@/routing'; // Localized router
import { Button } from '@/web/components/ui/button';
import { CheckCircle, XCircle, Trash2 } from 'lucide-react';

interface ReviewModerationActionsProps {
    reviewId: string;
}

export function ReviewModerationActions({ reviewId }: ReviewModerationActionsProps) {
    const router = useRouter();
    const [isUpdating, setIsUpdating] = useState(false);

    const handleAction = async (status: 'APPROVED' | 'REJECTED' | 'DELETE') => {
        setIsUpdating(true);
        try {
            if (status === 'DELETE') {
                const res = await fetch(`/api/admin/reviews/${reviewId}`, {
                    method: 'DELETE',
                });
                if (!res.ok) throw new Error('Failed to delete review');
            } else {
                const res = await fetch(`/api/admin/reviews/${reviewId}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ status }),
                });
                if (!res.ok) throw new Error(`Failed to ${status.toLowerCase()} review`);
            }
            router.refresh();
        } catch (error) {
            console.error(error);
            alert('Action failed');
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <>
            <Button
                variant="default"
                className="w-full rounded-2xl gap-3 font-black shadow-lg shadow-primary/20"
                onClick={() => handleAction('APPROVED')}
                disabled={isUpdating}
            >
                <CheckCircle className="h-5 w-5" />
                Approve
            </Button>
            <Button
                variant="tonal"
                className="w-full rounded-2xl gap-3 font-black"
                onClick={() => handleAction('REJECTED')}
                disabled={isUpdating}
            >
                <XCircle className="h-5 w-5" />
                Reject
            </Button>
            <Button
                variant="ghost"
                className="w-full rounded-2xl gap-3 font-black text-error hover:bg-error/5"
                onClick={() => handleAction('DELETE')}
                disabled={isUpdating}
            >
                <Trash2 className="h-5 w-5" />
                Delete
            </Button>
        </>
    );
}
