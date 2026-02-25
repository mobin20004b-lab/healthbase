'use client';

import { useActionState, useEffect, useState } from 'react';
import { Button } from '@/web/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/web/components/ui/dialog';
import { Input } from '@/web/components/ui/input';
import { submitInquiry, InquiryState } from '@/app/actions/inquiry';
import { toast } from 'sonner';
import { Loader2, Send } from 'lucide-react';

interface InquiryDialogProps {
  clinicId: string;
  clinicName?: string;
}

const initialState: InquiryState = {
  message: '',
  errors: {},
};

export function InquiryDialog({ clinicId, clinicName }: InquiryDialogProps) {
  const [open, setOpen] = useState(false);
  const [state, formAction, isPending] = useActionState(submitInquiry, initialState);

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      // Wait for toast to appear before closing to avoid sync state update warning
      const timer = setTimeout(() => {
        setOpen(false);
      }, 0);
      return () => clearTimeout(timer);
    } else if (state.message && !state.success) {
        // Only show error toast if it's not a validation error (which are shown inline)
        // or maybe show generic error
        if (!state.errors || Object.keys(state.errors).length === 0) {
            toast.error(state.message);
        }
    }
  }, [state, setOpen]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="rounded-2xl shadow-lg shadow-primary/20 gap-3 bg-primary text-on-primary hover:bg-primary/90">
          <Send className="h-5 w-5" />
          Request Info
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Contact {clinicName || 'Clinic'}</DialogTitle>
          <DialogDescription>
            Send a message to inquire about services or availability.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction} className="grid gap-4 py-4">
          <input type="hidden" name="clinicId" value={clinicId} />

          <div className="grid gap-2">
            <label htmlFor="serviceInterest" className="text-sm font-medium">
              Service of Interest
            </label>
            <Input
              id="serviceInterest"
              name="serviceInterest"
              placeholder="e.g. Dental Checkup"
            />
            {state.errors?.serviceInterest && (
              <p className="text-sm text-red-500">{state.errors.serviceInterest.join(', ')}</p>
            )}
          </div>

          <div className="grid gap-2">
            <label htmlFor="contactMethod" className="text-sm font-medium">
              Preferred Contact Method
            </label>
            <select
              id="contactMethod"
              name="contactMethod"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              defaultValue="Phone"
            >
              <option value="Phone">Phone</option>
              <option value="WhatsApp">WhatsApp</option>
              <option value="Email">Email</option>
            </select>
             {state.errors?.contactMethod && (
              <p className="text-sm text-red-500">{state.errors.contactMethod.join(', ')}</p>
            )}
          </div>

          <div className="grid gap-2">
            <label htmlFor="message" className="text-sm font-medium">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="I would like to know more about..."
            />
            {state.errors?.message && (
              <p className="text-sm text-red-500">{state.errors.message.join(', ')}</p>
            )}
          </div>

            {state.message && !state.success && (state.errors === undefined || Object.keys(state.errors).length === 0) && (
                <p className="text-sm text-red-500">{state.message}</p>
            )}

          <div className="flex justify-end mt-4">
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Send Inquiry
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
