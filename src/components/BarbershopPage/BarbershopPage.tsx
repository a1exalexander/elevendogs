import React, { FC } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from './BarberShopPage.module.scss';
import { locations } from '../../../data';
import { Container } from '../Container';
import { Button } from '../Button';

export interface BarberShopPageProps {
  data: typeof locations[keyof typeof locations];
  logo: string;
  color: string;
}

export const BarberShopPage: FC<BarberShopPageProps> = ({
  data,
  logo,
  color,
}) => {
  return (
    <>
      <Head>
        <title>{data.title}</title>
        <meta name="description" content={data.description} />
        <meta name="og:title" content={data.title} />
        <meta name="og:description" content={data.description} />
      </Head>
      <div className={styles.container}>
        <div style={{ backgroundColor: color }} className={styles.top}>
          <h1 className={styles.address}>{data.address}</h1>
          <p className={styles.address}>{data.phone}</p>
        </div>
        <header className={styles.header}>
          <Container className={styles.headerContainer}>
            <div className={styles.logo}>
              <Image
                priority
                loading="eager"
                layout="responsive"
                src={logo}
                alt={data.name}
              />
            </div>
          </Container>
        </header>
        <main className={styles.main}>
          <Container className={styles.mainContainer}>
            <Button className={styles.button} href={`tel:${data.phone}`}>
              Записатися
            </Button>
            <ul className={styles.list}>
              {data.services.map((service) => (
                <li key={service.name} className={styles.listItem}>
                  <span className={styles.serviceName}>{service.name}</span>
                  <div className={styles.price}>
                    <span className={styles.priceValue}>{service.price}</span>
                    <span className={styles.priceCurrency}>грн</span>
                  </div>
                </li>
              ))}
            </ul>
          </Container>
        </main>
        <footer className={styles.footer}></footer>
      </div>
    </>
  );
};

export default BarberShopPage;
