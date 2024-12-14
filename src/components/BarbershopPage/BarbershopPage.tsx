import React, { ReactNode, useEffect, useRef } from "react";
import Head from "next/head";
import Zoom from "react-medium-image-zoom";
import Image, { StaticImageData } from "next/image";
import NextLink from "next/link";
import { locations } from "../../../data";
import { Container } from "../Container";
import { Button } from "../Button";
import icon from "../../assets/icons8-instagram.svg";
import styles from "./BarbershopPage.module.scss";
import clsx from "clsx";
import { Routes } from "../../constants";
import { Pricing } from "../../types/Pricing";

export interface BarbershopPageProps {
  pricing: Pricing[];
  data: (typeof locations)[keyof typeof locations];
  logo: string | StaticImageData;
  color: string;
  renderMap?: ReactNode;
  photoGrid?: {
    id: string | number;
    src: string | StaticImageData;
    type: "big" | "horizontal" | "vertical" | "square";
  }[];
  ogImage?: string;
}

const CTA = "Записатися";

interface LinkData {
  link: string;
  name: string;
  blank: boolean;
  icon: string;
}

export const BarbershopPage = ({
  pricing,
  data,
  logo,
  color,
  renderMap,
  photoGrid,
  ogImage,
}: BarbershopPageProps) => {
  const itemsRef = useRef([]);
  // you can access the elements with itemsRef.current[n]

  useEffect(() => {
    itemsRef.current = itemsRef.current.slice(0, 100);
  }, []);

  const renderLink = ({ link, name, blank, icon }: LinkData) => {
    return (
      <>
        <NextLink
          key={name}
          href={link}
        >
          <a
            target={blank ? '_blank' : '_self'}
            className={clsx(styles.instagram)}
          >
            <span className={styles.icon}>{icon}</span>
            <span className={styles.instaText}>{name}</span>
          </a>
        </NextLink>
      </>
    );
  };

  return (
    <>
      <Head>
        <title>{data.title}</title>
        <meta
          name="description"
          content={data.description}
        />
        <meta
          name="og:title"
          content={data.title}
        />
        <meta
          name="og:description"
          content={data.description}
        />
        <meta name="twitter:title" content={data.title} />
        <meta name="twitter:description" content={data.description} />
        {ogImage && (
          <>
            <meta name="og:image" content={ogImage} />
            <meta name="twitter:image" content={ogImage} />
          </>
        )}
      </Head>
      <div className={styles.container}>
        <div className={styles.inner}>
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
              <nav className={styles.nav}>
                {(
                  [
                    {
                      blank: false,
                      icon: "💈",
                      link: Routes.HOME,
                      name: "Головна",
                    },
                    {
                      blank: true,
                      icon: "🗺",
                      link: data.map,
                      name: data.address,
                    },
                    {
                      blank: false,
                      icon: "📞",
                      link: `tel:${data.phone}`,
                      name: data.phone,
                    },
                    {
                      blank: true,
                      icon: (
                        <Image
                          priority
                          loading="eager"
                          layout="responsive"
                          src={icon}
                          alt="instagram"
                        />
                      ),
                      link: `https://www.instagram.com/${data.instagram}/`,
                      name: data.instagram,
                    },
                  ] as LinkData[]
                ).map(renderLink)}
              </nav>
            </Container>
          </header>
          <Container className={styles.buttonWrapper}>
            <Button
              className={styles.button}
              href={data.booking}
              backgroundColor={color}
            >
              {CTA}
            </Button>
          </Container>
          <div className={clsx("grid", styles.photoGrid)}>
            {(photoGrid || []).map(({ src, type, id }) => {
              return (
                <div key={id} className={clsx("grid__item", type)}>
                  <Zoom
                    zoomImg={{
                      src: String(src),
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <Image
                      src={src}
                      alt={data.title}
                      layout="fill"
                      loading="lazy"
                      placeholder="blur"
                      objectFit="cover"
                      objectPosition="50% 50%"
                    />
                  </Zoom>
                </div>
              );
            })}
          </div>
          <main className={styles.main}>
            <Container className={styles.mainContainer}>
              <ul className={styles.list} style={{ borderColor: color }}>
                {pricing.map((service) => (
                  <li key={service.id} className={styles.listItem}>
                    <span className={styles.serviceName}>{service.title}</span>
                    <div className={styles.price}>
                      <span className={styles.priceValue}>{service.price}</span>
                    </div>
                  </li>
                ))}
              </ul>
              <Button
                className={styles.button}
                href={data.booking}
                backgroundColor={color}
              >
                {CTA}
              </Button>
            </Container>
          </main>
          <footer className={styles.footer}>
            <div className={styles.map}>{renderMap}</div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default BarbershopPage;
