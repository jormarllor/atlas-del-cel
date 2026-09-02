import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Atlas del Cel",
  description: "Una guia visual per aprendre a llegir el cel, reconèixer constel·lacions i descobrir-ne la mitologia.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ca">
      <body>
        <header className="site-header">
          <Link href="/" className="brand" aria-label="Atlas del Cel, inici">
            <span className="brand-mark" aria-hidden="true">✦</span>
            <span>Atlas del Cel</span>
          </Link>
          <nav className="main-nav" aria-label="Navegació principal">
            <Link href="/com-llegir-el-cel">Com llegir el cel</Link>
            <Link href="/constellacions">Constel·lacions</Link>
          </nav>
        </header>
        {children}
        <footer className="site-footer">
          <div className="wrap site-footer-inner">
            <p>Atlas del Cel · astronomia, observació i mites sota una mateixa nit.</p>
            <Link href="/fonts-i-metodologia">Fonts i metodologia</Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
