import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { locations } from '../data';
import { Routes } from '../src/constants';
import styles from '../styles/pages/index.module.scss';
import imageMain from '../src/assets/ed2/DSCF5198-Edit-2.jpg';
import imageSecondary from '../src/assets/new2025/1IMG_3516.JPG';
import imageEducation from '../src/assets/ed2/DSCF5220-Edit-2.jpg';

const Home: NextPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.topbar}>
        <div className={styles.wordmark}>Eleven Dogs</div>
        <div className={styles.city}>Кременчук</div>
      </div>

      <div className={styles.intro}>
        <div className={styles.kicker}>Барбершоп · 2 локації</div>
        <h1 className={styles.title}>Мережа барбершопів в Кременчуці</h1>
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
          <div className={styles.cardContent}>
            <div className={styles.cardIndexYoung}>02 — Водоканал</div>
            <div className={styles.cardNameYoung}>Youngsters</div>
            <div className={styles.cardAddressYoung}>пр-т Свободи, 39/43</div>
            <div className={styles.cardTagYoung}>Комфорт · вайб →</div>
          </div>
        </Link>
      </div>

      <Link href={Routes.EDUCATION} className={styles.edu}>
        <Image
          src={imageEducation}
          alt=""
          fill
          sizes="100vw"
          className={styles.eduImage}
          style={{ objectFit: 'cover', objectPosition: '50% 15%' }}
        />
        <div className={styles.eduOverlay} />
        <div className={styles.eduContent}>
          <div className={styles.eduText}>
            <div className={styles.eduIndex}>03 — Академія</div>
            <div className={styles.eduName}>Навчання барберів</div>
            <div className={styles.eduDesc}>
              Барбер з нуля · Інтенсив · Підвищення кваліфікації
            </div>
          </div>
          <div className={styles.eduCta}>Дізнатися більше →</div>
        </div>
      </Link>

      <footer className={styles.footer}>
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
