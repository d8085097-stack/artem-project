import type { Metadata } from 'next';
import './globals.css';
import styles from './layout.module.css';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Vinyl Haus — Редкие записи. Живой звук.',
  description: 'Лендинг магазина виниловых пластинок. SSR на Next.js, данные из Vinyl Haus API.',
};

const TICKER_ITEMS = [
  'VINYL HAUS', '—', 'РЕДКИЕ ЗАПИСИ', '—', 'ЖИВОЙ ЗВУК', '—',
  'JAZZ', '—', 'ROCK', '—', 'ELECTRONIC', '—', 'SOUL', '—',
  'HIP-HOP', '—', 'SSR', '—', 'NEXT.JS', '—', 'NODE.JS', '—',
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const ticks = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <html lang="ru">
      <body>
        <header className={styles.header}>
          <div className={styles.headerInner}>
            <Link href="/" className={styles.logoBlock}>
              <span className={styles.logoSmall}>Vinyl Store · 2026</span>
              <span className={styles.logo}>VINYL HAUS</span>
              <span className={styles.logoSub}>Редкие записи. Живой звук.</span>
            </Link>
            <nav className={styles.nav}>
              <Link href="/#about"   className={styles.navLink}>О магазине</Link>
              <Link href="/#catalog" className={styles.navLink}>Каталог</Link>
              <Link href="/#stack"   className={styles.navLink}>Стек</Link>
              <Link href="/#projects" className={styles.navLink}>Проекты</Link>
            </nav>
          </div>
        </header>

        <div className={styles.ticker} aria-hidden="true">
          <div className={styles.tickerInner}>
            {ticks.map((t, i) => (
              <span key={i} className={styles.tick}>{t}&nbsp;&nbsp;</span>
            ))}
          </div>
        </div>

        <main>{children}</main>

        <footer className={styles.footer}>
          <span className={styles.footerLogo}>VINYL HAUS</span>
          <span className={styles.footerMeta}>© 2026 — Редкие записи. Живой звук.</span>
        </footer>
      </body>
    </html>
  );
}
