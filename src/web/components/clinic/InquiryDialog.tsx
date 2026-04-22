"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { MessageSquare } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/web/components/ui/dialog";
import { Button } from "@/web/components/ui/button";
import { InquiryForm } from "./InquiryForm";

interface InquiryDialogProps {
  clinicId: string;
}

export function InquiryDialog({ clinicId }: InquiryDialogProps) {
  const [open, setOpen] = useState(false);
  const t = useTranslations("ClinicDetail");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="rounded-2xl shadow-xl shadow-primary/20 gap-3 bg-primary text-primary-foreground">
          <MessageSquare className="h-5 w-5" />
          {t("requestInfo") || "Request Info"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("inquiry.title") || "Request Information"}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <InquiryForm clinicId={clinicId} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
