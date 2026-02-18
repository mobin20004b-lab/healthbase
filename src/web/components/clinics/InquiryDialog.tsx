'use client'

import * as React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/web/components/ui/dialog'
import { Button } from '@/web/components/ui/button'
import { InquiryForm } from './InquiryForm'

type Service = {
  id: string
  name: string
}

type InquiryDialogProps = {
  clinicId: string
  services: Service[]
}

export function InquiryDialog({ clinicId, services }: InquiryDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Request Info</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Contact Clinic</DialogTitle>
          <DialogDescription>
            Send a message to the clinic to request more information.
          </DialogDescription>
        </DialogHeader>
        <InquiryForm clinicId={clinicId} services={services} />
      </DialogContent>
    </Dialog>
  )
}
