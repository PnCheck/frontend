import styles from '@/css/TopNavigation.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

function TopNavigation() {
  const router = useRouter();

  return (
    <nav className={styles.navbar}>
      <ul className={styles.items}>
        <li className={styles.item}>
          <Link href="/">
            <a
              className={`${styles.link}${
                router.pathname === '/' ? ` ${styles.active}` : ''
              }`}
            >
              Home
            </a>
          </Link>
        </li>
        <li className={styles.item}>
          <Link href="/info">
            <a
              className={`${styles.link}${
                router.pathname === '/info' ? ` ${styles.active}` : ''
              }`}
            >
              Info
            </a>
          </Link>
        </li>
        <li className={styles.item}>
          <Link href="/our-api">
            <a
              className={`${styles.link}${
                router.pathname === '/our-api' ? ` ${styles.active}` : ''
              }`}
            >
              API
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default TopNavigation;
