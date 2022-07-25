import React, { FC, ReactNode } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { locations } from '../../../data';
import { Container } from '../Container';
import { Button } from '../Button';
import icon from '../../assets/icons8-instagram.svg';
import styles from './BarbershopPage.module.scss';
import clsx from 'clsx';

export interface BarbershopPageProps {
  data: typeof locations[keyof typeof locations];
  logo: string;
  color: string;
  renderMap?: ReactNode;
  photoGrid?: {
    src: string;
    type: 'big' | 'horizontal' | 'vertical' | 'square';
  }[];
}

export const BarbershopPage: FC<BarbershopPageProps> = ({
  data,
  logo,
  color,
  renderMap,
  photoGrid,
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
            <a
              href={`https://www.instagram.com/${data.instagram}/`}
              rel="noreferrer"
              target="_blank"
              className={styles.instagram}
            >
              <span className={styles.icon}>
                <Image
                  priority
                  loading="eager"
                  layout="responsive"
                  src={icon}
                  alt="instagram"
                />
              </span>
              <span className={styles.instaText}>{data.instagram}</span>
            </a>
          </Container>
        </header>
        <Container className={styles.buttonWrapper}>
          <Button
            className={styles.button}
            href={`tel:${data.phone}`}
            backgroundColor={color}
          >
            Записатися
          </Button>
        </Container>
        <div className={clsx('grid', styles.photoGrid)}>
          {(photoGrid || []).map(({ src, type }) => {
            return (
              <div key={src} className={type}>
                <Image
                  src={src}
                  alt={data.title}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            );
          })}
        </div>
        <main className={styles.main}>
          <Container className={styles.mainContainer}>
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
            <Button
              className={styles.button}
              href={`tel:${data.phone}`}
              backgroundColor={color}
            >
              Записатися
            </Button>
          </Container>
        </main>
        <footer className={styles.footer}>
          <Container className={styles.mainContainer}>
            <div className={styles.map}>{renderMap}</div>
          </Container>
        </footer>
      </div>
    </>
  );
};

export default BarbershopPage;
