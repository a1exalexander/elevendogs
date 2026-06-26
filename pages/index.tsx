import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { locations } from '../data';
import { Routes } from '../src/constants';
import styles from '../styles/pages/index.module.scss';
import imageMain from '../src/assets/shop-1.jpg';
import imageSecondary from '../src/assets/shop-2.jpg';

const Home: NextPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.topbar}>
        <div className={styles.wordmark}>Eleven Dogs</div>
        <div className={styles.city}>Кременчук</div>
      </div>

      <div className={styles.intro}>
        <div className={styles.kicker}>Барбершоп · 2 локації</div>
        <h1 className={styles.title}>Пострижись як в&nbsp;прошлий раз</h1>
      </div>

      <div className={styles.cards}>
        <Link
          href={Routes.MAIN}
          className={clsx(styles.card, styles.cardMain)}
          aria-label={locations.main.name}
        >
          <Image
            src={imageMain}
            alt={locations.main.name}
            fill
            priority
            sizes="(max-width: 760px) 100vw, 50vw"
            className={styles.cardImage}
            style={{ objectFit: 'cover' }}
          />
          <div className={styles.cardOverlay} />
          <div className={styles.cardContent}>
            <div className={styles.cardIndex}>01 — Центр</div>
            <div className={styles.cardName}>Eleven Dogs</div>
            <div className={styles.cardAddress}>вул. Івана Мазепи, 28</div>
            <div className={styles.cardTag}>Мінімалізм · men&apos;s club →</div>
          </div>
        </Link>

        <Link
          href={Routes.SECONDARY}
          className={clsx(styles.card, styles.cardYoung)}
          aria-label={locations.secondary.name}
        >
          <Image
            src={imageSecondary}
            alt={locations.secondary.name}
            fill
            priority
            sizes="(max-width: 760px) 100vw, 50vw"
            className={styles.cardImageYoung}
            style={{ objectFit: 'cover' }}
          />
          <div className={styles.cardOverlayYoung} />
          <div className={styles.badge}>для своїх</div>
          <div className={styles.cardContent}>
            <div className={styles.cardIndexYoung}>02 — Водоканал</div>
            <div className={styles.cardNameYoung}>Youngsters</div>
            <div className={styles.cardAddressYoung}>пр-т Свободи, 39/43</div>
            <div className={styles.cardTagYoung}>Комфорт · вайб →</div>
          </div>
        </Link>
      </div>

      <footer className={styles.footer}>
        <Link href={Routes.EDUCATION} className={styles.eduButton}>
          Навчання →
        </Link>
        <div className={styles.footerMeta}>
          <a
            href="https://www.instagram.com/eleven.dogs/"
            target="_blank"
            rel="noreferrer"
          >
            @eleven.dogs
          </a>
          <span>Кременчук</span>
        </div>
      </footer>
    </div>
  );
};

export default Home;
