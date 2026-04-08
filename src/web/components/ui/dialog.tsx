'use client';

import * as React from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { Button } from '@/web/components/ui/button';

interface DialogContextType {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

const DialogContext = React.createContext<DialogContextType | undefined>(undefined);

export function useDialog() {
    const context = React.useContext(DialogContext);
    if (!context) {
        throw new Error('useDialog must be used within a Dialog');
    }
    return context;
}

export function Dialog({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = React.useState(false);
    const open = React.useCallback(() => setIsOpen(true), []);
    const close = React.useCallback(() => setIsOpen(false), []);

    return (
        <DialogContext.Provider value={{ isOpen, open, close }}>
            {children}
        </DialogContext.Provider>
    );
}

export function DialogTrigger({ children, asChild }: { children: React.ReactNode; asChild?: boolean }) {
    const { open } = useDialog();

    if (asChild && React.isValidElement(children)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return React.cloneElement(children as React.ReactElement<any>, {
            onClick: (e: React.MouseEvent) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                if ((children as any).props.onClick) (children as any).props.onClick(e);
                open();
            },
        });
    }

    return (
        <button type="button" onClick={open}>
            {children}
        </button>
    );
}

export function DialogContent({ children, title }: { children: React.ReactNode; title?: string }) {
    const { isOpen, close } = useDialog();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            const handleKeyDown = (e: KeyboardEvent) => {
                if (e.key === 'Escape') close();
            };
            window.addEventListener('keydown', handleKeyDown);
            return () => {
                document.body.style.overflow = '';
                window.removeEventListener('keydown', handleKeyDown);
            };
        }
    }, [isOpen, close]);

    if (!isOpen || !mounted) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={close}
                aria-hidden="true"
            />

            {/* Modal Content */}
            <div
                className="relative z-50 w-full max-w-lg rounded-3xl bg-surface p-6 shadow-2xl transition-all sm:p-8 overflow-y-auto max-h-[90vh]"
                role="dialog"
                aria-modal="true"
                aria-labelledby={title ? "dialog-title" : undefined}
            >
                <div className="flex items-center justify-between mb-6">
                    {title && (
                        <h2 id="dialog-title" className="text-2xl font-black text-on-surface">
                            {title}
                        </h2>
                    )}
                    <Button
                        variant="tertiary"
                        size="icon"
                        onClick={close}
                        className="rounded-full ml-auto hover:bg-outline-variant/20"
                        aria-label="Close dialog"
                    >
                        <X className="h-5 w-5 text-on-surface-variant" />
                    </Button>
                </div>
                {children}
            </div>
        </div>,
        document.body
    );
}
