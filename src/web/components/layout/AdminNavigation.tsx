"use client";

import { usePathname } from "@/routing";
import { Link } from "@/routing";
import {
  LayoutDashboard,
  Users,
  Building2,
  MessageSquare,
  Tags,
  Calendar,
  LogOut
} from "lucide-react";
import { NavigationRail, NavigationRailItem } from "@/web/components/ui/nav-rail";
import { BottomNav, BottomNavItem } from "@/web/components/ui/bottom-nav";
import { useTranslations } from "next-intl";

export default function AdminNavigation() {
  const pathname = usePathname();
  // const t = useTranslations("AdminNavigation");

  const navItems = [
    { href: "/admin", icon: <LayoutDashboard />, label: "Overview" },
    { href: "/admin/patients", icon: <Users />, label: "Patients" }, // Assuming this exists or will exist
    { href: "/admin/clinics", icon: <Building2 />, label: "Clinics" },
    { href: "/admin/reviews", icon: <MessageSquare />, label: "Reviews" },
    { href: "/admin/taxonomy", icon: <Tags />, label: "Taxonomy" },
    { href: "/admin/schedule", icon: <Calendar />, label: "Schedule" },
  ];

  const isActive = (href: string) => {
      if (href === "/admin") return pathname === "/admin";
      return pathname.startsWith(href);
  };

  return (
    <>
      {/* Desktop Navigation Rail */}
      <div className="hidden md:block">
        <NavigationRail header={<div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center text-on-primary font-bold">A</div>}>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <NavigationRailItem
                icon={item.icon}
                label={item.label}
                active={isActive(item.href)}
              />
            </Link>
          ))}
          <div className="mt-auto">
             <NavigationRailItem icon={<LogOut />} label="Logout" />
          </div>
        </NavigationRail>
      </div>

      {/* Mobile Bottom Navigation - Admin on mobile might be rare but good to have */}
      <BottomNav className="md:hidden">
        {navItems.slice(0, 4).map((item) => ( // Show only top 4 on mobile to fit
           <Link key={item.href} href={item.href} className="flex-1">
              <BottomNavItem
                icon={item.icon}
                label={item.label}
                active={isActive(item.href)}
              />
           </Link>
        ))}
        {/* Maybe a 'More' button? For MVP just show main ones */}
      </BottomNav>
    </>
  );
}
