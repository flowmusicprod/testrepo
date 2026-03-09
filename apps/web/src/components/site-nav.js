"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/lib/data";

export function SiteNav() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <nav className="main-nav shell">
        <div className="nav-side nav-left">
          <Link href="/catalog">All Pieces</Link>
          <Link href="/showcase">Drops</Link>
          <Link href="/collaboration">Collabs</Link>
        </div>
        <Link href="/" className="brand-mark" aria-label="DE'JERI Home">
          <Image
            src="/assets/brand/logos/Transparent/dejeri_black_trans.png"
            alt="DE'JERI"
            width={170}
            height={58}
            className="brand-logo"
            priority
          />
        </Link>
        <div className="nav-links">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} className={active ? "active" : ""}>
                {item.label}
              </Link>
            );
          })}
        </div>
        <div className="nav-side nav-right">
          <Link href="/social">Instagram</Link>
          <Link href="/social">TikTok</Link>
          <Link href="/atelier/login">Admin</Link>
        </div>
      </nav>
    </header>
  );
}
