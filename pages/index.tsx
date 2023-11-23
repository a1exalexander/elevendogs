import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { locations, seo } from '../data';
import styles from '../styles/pages/index.module.scss';
import mainLogo from '../src/assets/eleven_dogs_logo_1.png';
import secondaryLogo from '../src/assets/eleven_dogs_logo_2.png';
import { HiddenTitle } from '../src/components';
import { Routes } from '../src/constants';

const Home: NextPage = () => {
  return (
    <div className={styles.page}>
      <HiddenTitle>{`${seo.title} ${seo.description}`}</HiddenTitle>
      <main className={styles.barbers}>
        <Link href={Routes.MAIN}>
          <a className={clsx(styles.barber, styles.isMain)}>
            <div className={styles.image}>
              <Image
                priority
                loading="eager"
                layout="responsive"
                src={mainLogo}
                alt={locations.main.name}
              />
            </div>
            <p className={styles.address}>{locations.main.address}</p>
          </a>
        </Link>
        <Link href={Routes.SECONDARY}>
          <a className={clsx(styles.barber, styles.isSecondary)}>
            <div className={styles.image}>
              <Image
                priority
                loading="eager"
                layout="responsive"
                src={secondaryLogo}
                alt={locations.secondary.name}
              />
            </div>
            <p className={styles.address}>{locations.secondary.address}</p>
          </a>
        </Link>
      </main>
      <footer className={styles.footer}>
        <nav className={styles.nav}>
          <Link href={Routes.EDUCATION}>
            <a className={styles.link}>
              Навчання{' '}
              <svg
                className={styles.arrow}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.05244 6.04879C6.50015 6.04879 6.05244 6.4965 6.05244 7.04879C6.05244 7.60107 6.50015 8.04879 7.05244 8.04879L14.5377 8.04879L6.34533 16.2412C5.95481 16.6317 5.95481 17.2649 6.34533 17.6554C6.73586 18.0459 7.36902 18.0459 7.75955 17.6554L15.9519 9.463V16.9483C15.9519 17.5006 16.3997 17.9483 16.9519 17.9483C17.5042 17.9483 17.9519 17.5006 17.9519 16.9483V7.0498C17.9519 7.04638 17.9519 7.04297 17.9519 7.03956C17.9496 6.78765 17.8527 6.53644 17.6612 6.3438C17.6605 6.34309 17.6597 6.34239 17.659 6.34168C17.6583 6.34097 17.6576 6.34027 17.6569 6.33956C17.5615 6.24474 17.4518 6.17311 17.3347 6.12467C17.2195 6.07688 17.0934 6.05002 16.9612 6.04883C16.9578 6.0488 16.9544 6.04878 16.9511 6.04879M7.05244 6.04879L16.9511 6.04879L7.05244 6.04879Z"
                />
              </svg>
            </a>
          </Link>
        </nav>
      </footer>
    </div>
  );
};

export default Home;
