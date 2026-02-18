'use client'

import * as React from 'react'
import { useActionState } from 'react'
import { submitInquiry, InquiryFormState } from '@/app/actions/inquiry'
import { Button } from '@/web/components/ui/button'
import { Textarea } from '@/web/components/ui/textarea'
import { Label } from '@/web/components/ui/label'
import { Select } from '@/web/components/ui/select'
import { toast } from 'sonner'
import { useDialog } from '@/web/components/ui/dialog'

type Service = {
  id: string
  name: string
}

type InquiryFormProps = {
  clinicId: string
  services: Service[]
  defaultServiceId?: string
}

const initialState: InquiryFormState = {}

export function InquiryForm({ clinicId, services, defaultServiceId }: InquiryFormProps) {
  const [state, formAction, isPending] = useActionState(submitInquiry, initialState)
  const { setOpen } = useDialog()

  React.useEffect(() => {
    if (state.success) {
      toast.success('Inquiry sent successfully!')
      setOpen(false)
    } else if (state.error) {
      toast.error(state.error)
    }
  }, [state, setOpen])

  return (
    <form action={formAction} className="grid gap-4 py-4">
      <input type="hidden" name="clinicId" value={clinicId} />

      <div className="grid gap-2">
        <Label htmlFor="serviceInterest">Service Interest (Optional)</Label>
        <Select
            id="serviceInterest"
            name="serviceInterest"
            defaultValue={defaultServiceId || ""}
        >
          <option value="">-- Select a service --</option>
          {services.map((service) => (
            <option key={service.id} value={service.name}>
              {service.name}
            </option>
          ))}
        </Select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="I am interested in..."
          defaultValue="I am interested in more information about this service."
        />
        {state.fieldErrors?.message && (
          <p className="text-sm text-red-500">{state.fieldErrors.message[0]}</p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="contactMethod">Preferred Contact Method</Label>
        <Select id="contactMethod" name="contactMethod" defaultValue="WHATSAPP">
          <option value="WHATSAPP">WhatsApp</option>
          <option value="PHONE">Phone Call</option>
        </Select>
        {state.fieldErrors?.contactMethod && (
          <p className="text-sm text-red-500">{state.fieldErrors.contactMethod[0]}</p>
        )}
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Sending...' : 'Send Inquiry'}
        </Button>
      </div>
    </form>
  )
}
