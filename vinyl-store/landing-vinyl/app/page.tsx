import type { Metadata } from 'next';
import styles from './page.module.css';
import VinylCard from '@/components/VinylCard/VinylCard';
import TechCard from '@/components/TechCard/TechCard';
import ProjectCard from '@/components/ProjectCard/ProjectCard';

export const metadata: Metadata = {
  title: 'Vinyl Haus — Редкие записи. Живой звук.',
  description: 'Магазин виниловых пластинок. SSR-лендинг на Next.js.',
};

export type VinylRecord = {
  id: number;
  title: string;
  artist: string;
  price: number;
  inStock: boolean;
  image: string;
  description: string;
  rating: number;
  genre: 'jazz' | 'rock' | 'electronic' | 'classical' | 'hiphop' | 'soul';
  year: number;
  label: string;
  tracklist: string;
};

// Серверный fetch — выполняется до отправки HTML
async function getVinyl(): Promise<VinylRecord[]> {
  try {
    const res = await fetch('http://localhost:3001/api/vinyl', {
      cache: 'no-store', // всегда свежие данные из API
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

const techStack = [
  { icon: '⚛️', name: 'React',      desc: 'UI на функциональных компонентах' },
  { icon: '🔷', name: 'TypeScript', desc: 'Строгая типизация всего проекта' },
  { icon: '⚡', name: 'Vite',       desc: 'Быстрая сборка для витрины и админки' },
  { icon: '🟩', name: 'Node.js',    desc: 'Бэкенд на Express + JSON база данных' },
  { icon: '🗂️', name: 'Монорепа',  desc: 'Три проекта в одном репозитории' },
  { icon: '▲',  name: 'Next.js',   desc: 'SSR-лендинг — HTML с данными сразу' },
];

const projects = [
  {
    tag: 'Витрина',
    title: 'Vinyl Haus Shop',
    desc: 'SPA каталог пластинок с поиском, фильтрами по жанру, модалкой карточки.',
    href: 'http://localhost:3000',
  },
  {
    tag: 'Админка',
    title: 'Admin Panel',
    desc: 'CRUD-интерфейс. Тёмная тема, таблица записей, форма добавления и редактирования.',
    href: 'http://localhost:3000/admin',
  },
  {
    tag: 'Лендинг',
    title: 'Этот сайт',
    desc: 'SSR Next.js — страница приходит с готовым HTML. Карточки из API без useEffect.',
  },
];

export default async function Home() {
  // async — страница ждёт данных до return (SSR)
  const records = await getVinyl();

  const inStock   = records.filter(r => r.inStock).length;
  const avgRating = records.length
    ? (records.reduce((s, r) => s + r.rating, 0) / records.length).toFixed(1)
    : '—';
  const avgPrice  = records.length
    ? Math.round(records.reduce((s, r) => s + r.price, 0) / records.length)
    : 0;

  return (
    <>
      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} aria-hidden="true" />
        <div className={styles.heroContent}>
          <p className={styles.heroEyebrow}>Vinyl Haus · Mini-Store · SSR</p>
          <h1 className={styles.heroTitle}>
            РЕДКИЕ<br />
            <span className={styles.heroTitleAccent}>ЗАПИСИ.</span><br />
            ЖИВОЙ<br />ЗВУК.
          </h1>
          <p className={styles.heroDesc}>
            Магазин виниловых пластинок — от бэкенда до лендинга.
            Три проекта в одной монорепе. Этот лендинг рендерится
            на сервере: HTML с карточками приходит сразу.
          </p>
          <div className={styles.heroActions}>
            <a href="#catalog"  className={styles.btnPrimary}>Смотреть каталог</a>
            <a href="#projects" className={styles.btnSecondary}>Все проекты</a>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <div className={styles.statsBar}>
        <div className={styles.statItem}>
          <span className={styles.statValue}>{records.length || '—'}</span>
          <span className={styles.statLabel}>Пластинок</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statValue}>{records.length ? inStock : '—'}</span>
          <span className={styles.statLabel}>В наличии</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statValue}>{avgRating}</span>
          <span className={styles.statLabel}>Средний рейтинг</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statValue}>{records.length ? `${avgPrice}₽` : '—'}</span>
          <span className={styles.statLabel}>Средняя цена</span>
        </div>
      </div>

      {/* ── О МАГАЗИНЕ ── */}
      <section id="about" className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <p className={styles.sectionTag}>О проекте</p>
            <h2 className={styles.sectionTitle}>ЧТО СДЕЛАНО</h2>
          </div>
        </div>
        <div className={styles.aboutGrid}>
          <div className={styles.aboutCard}>
            <div className={styles.aboutIcon}>🏗️</div>
            <h3>МОНОРЕПА</h3>
            <p>Настроил монорепозиторий: витрина, админка и лендинг живут в одном репо и общаются через единый бэкенд.</p>
          </div>
          <div className={styles.aboutCard}>
            <div className={styles.aboutIcon}>🔌</div>
            <h3>REST API</h3>
            <p>Написал бэкенд на Node.js + Express. CRUD для пластинок, хранение в JSON, эндпоинт статистики.</p>
          </div>
          <div className={styles.aboutCard}>
            <div className={styles.aboutIcon}>🎨</div>
            <h3>ВИТРИНА + АДМИНКА</h3>
            <p>SPA на React + Vite. Поиск, фильтры по жанру, модалка карточки. Тёмная тема в админ-панели.</p>
          </div>
          <div className={styles.aboutCard}>
            <div className={styles.aboutIcon}>▲</div>
            <h3>SSR ЛЕНДИНГ</h3>
            <p>Next.js App Router. Серверный компонент делает fetch до рендера — HTML с карточками приходит сразу.</p>
          </div>
        </div>
      </section>

      {/* ── КАТАЛОГ ── */}
      <section id="catalog" className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <p className={styles.sectionTag}>Каталог · SSR</p>
            <h2 className={styles.sectionTitle}>ПЛАСТИНКИ</h2>
          </div>
          <span className={styles.sectionCount}>
            {records.length
              ? `${records.length} записей`
              : 'Запустите сервер'}
          </span>
        </div>

        {records.length === 0 ? (
          <p className={styles.noData}>
            [ Запустите бэкенд: <code>npm run server:dev</code> ]
          </p>
        ) : (
          // .map() — один объект → одна карточка, как в презентации
          <div className={styles.vinylGrid}>
            {records.map((record) => (
              <VinylCard key={record.id} record={record} />
            ))}
          </div>
        )}
      </section>

      {/* ── СТЕК ── */}
      <section id="stack" className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <p className={styles.sectionTag}>Технологии</p>
            <h2 className={styles.sectionTitle}>СТЕК</h2>
          </div>
        </div>
        <div className={styles.techGrid}>
          {techStack.map((t) => (
            <TechCard key={t.name} {...t} />
          ))}
        </div>
      </section>

      {/* ── ПРОЕКТЫ ── */}
      <section id="projects" className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <p className={styles.sectionTag}>Результат</p>
            <h2 className={styles.sectionTitle}>ТРИ ПРОЕКТА</h2>
          </div>
        </div>
        <div className={styles.projectsGrid}>
          {projects.map((p) => (
            <ProjectCard key={p.tag} {...p} />
          ))}
        </div>
      </section>
    </>
  );
}
