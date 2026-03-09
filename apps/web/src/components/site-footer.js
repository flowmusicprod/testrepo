import Image from "next/image";

export function SiteFooter() {
  return (
    <footer className="site-footer shell">
      <Image
        src="/assets/brand/logos/Transparent/dejeri_black_trans.png"
        alt="DE'JERI"
        width={160}
        height={48}
        className="footer-logo"
      />
      <p>DE&apos;JERI Atelier. Motion-first storefront for culture, drops, and visual identity.</p>
      <p>Private admin access is restricted to approved operators.</p>
    </footer>
  );
}
