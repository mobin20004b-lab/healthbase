"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/web/components/ui/sheet";
import { Button } from "@/web/components/ui/button";
import { Filter } from "lucide-react";
import SearchFilters from "./SearchFilters";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function MobileFilters() {
    const [open, setOpen] = useState(false);
    const t = useTranslations('Clinics');

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="outlined" size="sm" className="gap-2">
                    <Filter className="h-4 w-4" />
                    {t('filters')}
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full sm:w-[350px] p-0 border-r border-outline-variant/20">
                <div className="h-full overflow-y-auto p-4 bg-surface">
                    <SearchFilters onSearchComplete={() => setOpen(false)} />
                </div>
            </SheetContent>
        </Sheet>
    );
}
