import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { locations, seo } from '../data';
import styles from '../styles/pages/index.module.scss';
import mainLogo from '../src/assets/eleven_dogs.svg';
import secondaryLogo from '../src/assets/eleven_dogs_youngsters.svg';
import { HiddenTitle } from '../src/components';
import { Routes } from '../src/constants';

const Home: NextPage = () => {
  return (
    <div className={styles.page}>
      <HiddenTitle>{`${seo.title} ${seo.description}`}</HiddenTitle>
      <main className={styles.barbers}>
        <Link href={Routes.MAIN}>
          <a className={clsx(styles.barber, styles.isMain)}>
            <Image
              priority
              loading="eager"
              layout="responsive"
              src={mainLogo}
              alt={locations.main.name}
            />
            <p className={styles.address}>{locations.main.address}</p>
          </a>
        </Link>
        <Link href={Routes.SECONDARY}>
          <a className={clsx(styles.barber, styles.isSecondary)}>
            <Image
              priority
              loading="eager"
              layout="responsive"
              src={secondaryLogo}
              alt={locations.secondary.name}
            />
            <p className={styles.address}>{locations.secondary.address}</p>
          </a>
        </Link>
      </main>
      <footer className={styles.footer}>
        <nav className={styles.nav}>
          <Link href={Routes.EDUCATION}>
            <a className={styles.link}>Навчання</a>
          </Link>
        </nav>
      </footer>
    </div>
  );
};

export default Home;
