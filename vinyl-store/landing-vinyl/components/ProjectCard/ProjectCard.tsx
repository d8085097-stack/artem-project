import styles from './ProjectCard.module.css';

type Props = {
  tag: string;
  title: string;
  desc: string;
  href?: string;
};

export default function ProjectCard({ tag, title, desc, href }: Props) {
  const inner = (
    <>
      <span className={styles.tag}>{tag}</span>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.desc}>{desc}</p>
      {href && <span className={styles.arrow}>Открыть →</span>}
    </>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={styles.card}>
        {inner}
      </a>
    );
  }

  return <div className={styles.card}>{inner}</div>;
}
