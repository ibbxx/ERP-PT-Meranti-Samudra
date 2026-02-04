"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Squares2X2Icon,
  DocumentTextIcon,
  ClipboardDocumentCheckIcon,
  BanknotesIcon,
  TruckIcon,
  WrenchScrewdriverIcon,
  ArrowRightOnRectangleIcon
} from "@heroicons/react/24/outline";

const menus = [
  {
    label: "Main",
    items: [
      { href: "/dashboard", label: "Dashboard", icon: Squares2X2Icon },
    ]
  },
  {
    label: "Operational",
    items: [
      { href: "/calls", label: "Active Calls", icon: DocumentTextIcon },
      { href: "/tasks-lapangan", label: "Field Tasks", icon: WrenchScrewdriverIcon },
      { href: "/logistics", label: "Logistics", icon: TruckIcon },
    ]
  },
  {
    label: "Finance",
    items: [
      { href: "/approvals", label: "Approvals", icon: ClipboardDocumentCheckIcon },
      { href: "/fund-request", label: "Fund Requests", icon: BanknotesIcon },
      { href: "/invoice-outstanding", label: "Invoices", icon: DocumentTextIcon },
    ]
  }
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [role, setRole] = useState("Guest");
  const [name, setName] = useState("Guest");
  // Default to false for mobile-first approach. Desktop will override via CSS.
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("mps_session");
    if (!stored) return;
    try {
      const parsed = JSON.parse(stored) as { role?: string; name?: string };
      if (parsed.role) setRole(parsed.role);
      if (parsed.name) setName(parsed.name);
    } catch {
      // ignore
    }
  }, []);

  // Close sidebar on route change for mobile
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("mps_session");
    }
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen bg-sand/20">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-ink/20 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white border-r border-ink/5 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex h-16 items-center justify-between px-6 border-b border-ink/5">
          <span className="font-display text-xl font-bold text-ink tracking-tight">Meranti ERP</span>
          {/* Mobile Close Button */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 -mr-2 text-ink/40 hover:text-ink"
          >
            <Squares2X2Icon className="h-5 w-5" />
          </button>
        </div>

        <nav className="p-4 space-y-6 overflow-y-auto max-h-[calc(100vh-4rem)]">
          {menus.map((section) => (
            <div key={section.label}>
              <div className="text-xs font-bold uppercase tracking-wider text-ink/30 mb-3 px-2">
                {section.label}
              </div>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${active
                        ? "bg-ink text-white"
                        : "text-ink/60 hover:bg-ink/5 hover:text-ink"
                        }`}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-ink/5 bg-white">
          <div className="flex items-center gap-3 px-2 mb-3">
            <div className="h-8 w-8 rounded-full bg-ink/10 flex items-center justify-center text-xs font-bold text-ink">
              {name.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <div className="text-sm font-bold text-ink truncate">{name}</div>
              <div className="text-xs text-ink/50 truncate">{role}</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-2 px-2 py-1.5 text-xs font-medium text-danger hover:bg-danger/5 rounded-md transition-colors"
          >
            <ArrowRightOnRectangleIcon className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 flex items-center justify-between px-6 bg-white/50 backdrop-blur border-b border-ink/5 lg:hidden">
          <span className="font-display font-bold text-ink">MPS</span>
          <button onClick={() => setSidebarOpen(true)} className="p-2 -mr-2 text-ink/60">
            <Squares2X2Icon className="h-6 w-6" />
          </button>
        </header>

        <main className="flex-1 p-4 lg:p-10 overflow-x-hidden">
          <div className="mx-auto max-w-6xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
