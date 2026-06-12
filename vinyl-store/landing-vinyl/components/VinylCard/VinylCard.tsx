import type { VinylRecord } from '@/app/page';
import styles from './VinylCard.module.css';

const GENRE_LABELS: Record<string, string> = {
  jazz: 'JAZZ', rock: 'ROCK', electronic: 'ELECTRO',
  classical: 'CLASSICAL', hiphop: 'HIP-HOP', soul: 'SOUL',
};

export default function VinylCard({ record }: { record: VinylRecord }) {
  return (
    <div className={`${styles.card} ${!record.inStock ? styles.soldOut : ''}`}>
      <div className={styles.imgWrap}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={record.image} alt={record.title} className={styles.img} />

        <div className={styles.overlay}>
          <button className={styles.viewBtn}>СМОТРЕТЬ</button>
        </div>

        {!record.inStock && (
          <span className={styles.soldBadge}>SOLD OUT</span>
        )}
        <span className={styles.genreBadge}>
          {GENRE_LABELS[record.genre] ?? record.genre}
        </span>
      </div>

      <div className={styles.body}>
        <p className={styles.year}>{record.year} · {record.label}</p>
        <h3 className={styles.title}>{record.title}</h3>
        <p className={styles.artist}>{record.artist}</p>
        <div className={styles.footer}>
          <span className={styles.rating}>
            ★ {record.rating}
            <span className={styles.ratingCount}>/5</span>
          </span>
          <span className={styles.price}>{record.price.toLocaleString('ru')} ₽</span>
        </div>
      </div>
    </div>
  );
}
