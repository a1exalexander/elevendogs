import type { NextPage } from 'next';
import Image from 'next/image';
import clsx from 'clsx';
import { locations, seo } from '../data';
import styles from '../styles/pages/index.module.scss';
import mainLogo from '../src/assets/eleven_dogs.svg';
import secondaryLogo from '../src/assets/eleven_dogs_youngsters.svg';
import { HiddenTitle } from '../src/components';

const Home: NextPage = () => {
  return (
    <main className={styles.page}>
      <HiddenTitle>{`${seo.title} ${seo.description}`}</HiddenTitle>
      <div className={clsx(styles.barber, styles.isMain)}>
        <Image
          priority
          loading="eager"
          layout="responsive"
          src={mainLogo}
          alt={locations.main.name}
        />
        <p className={styles.address}>{locations.main.address}</p>
      </div>
      <div className={clsx(styles.barber, styles.isSecondary)}>
        <Image
          priority
          loading="eager"
          layout="responsive"
          src={secondaryLogo}
          alt={locations.secondary.name}
        />
        <p className={styles.address}>{locations.secondary.address}</p>
      </div>
    </main>
  );
};

export default Home;
