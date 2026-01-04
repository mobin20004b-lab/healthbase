"use client";

import { usePathname } from "@/routing";
import { Link } from "@/routing";
import { LayoutDashboard, FileText, Calendar, User, LogOut } from "lucide-react";
import { NavigationRail, NavigationRailItem } from "@/web/components/ui/nav-rail";
import { BottomNav, BottomNavItem } from "@/web/components/ui/bottom-nav";
import { useTranslations } from "next-intl";

export default function PatientNavigation() {
  const pathname = usePathname();
  const t = useTranslations("Navigation"); // Assuming keys exist, or I'll use hardcoded for now and update messages later.

  const navItems = [
    { href: "/dashboard", icon: <LayoutDashboard />, label: "Dashboard" }, // keys: dashboard
    { href: "/records", icon: <FileText />, label: "Records" }, // records
    { href: "/appointments", icon: <Calendar />, label: "Appointments" }, // appointments
    { href: "/profile", icon: <User />, label: "Profile" }, // profile
  ];

  const isActive = (href: string) => pathname === href || pathname.startsWith(href);

  return (
    <>
      {/* Desktop Navigation Rail */}
      <div className="hidden md:block">
        <NavigationRail header={<div className="h-8 w-8 rounded-full bg-primary/20" />}>
           {/* Logo placeholder above */}
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

      {/* Mobile Bottom Navigation */}
      <BottomNav>
        {navItems.map((item) => (
           <Link key={item.href} href={item.href} className="flex-1">
              <BottomNavItem
                icon={item.icon}
                label={item.label}
                active={isActive(item.href)}
              />
           </Link>
        ))}
      </BottomNav>
    </>
  );
}
