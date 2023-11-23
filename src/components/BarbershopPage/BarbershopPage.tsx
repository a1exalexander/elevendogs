import React, {
  FC,
  MouseEvent,
  MouseEventHandler,
  ReactNode,
  useEffect,
  useRef,
} from "react";
import Head from "next/head";
import Zoom from "react-medium-image-zoom";
import Image, { StaticImageData } from "next/image";
import NextLink from "next/link";
import { locations } from "../../../data";
import { Container } from "../Container";
import { Button } from "../Button";
import icon from "../../assets/icons8-instagram.svg";
import scissorsIcon from "../../assets/scissors.svg";
import styles from "./BarbershopPage.module.scss";
import clsx from "clsx";
import { Routes } from "../../constants";

export interface BarbershopPageProps {
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

const CTA = "✂️ Записатися";

interface LinkData {
  link: string;
  name: string;
  blank: boolean;
  icon: string;
}

export const BarbershopPage: FC<BarbershopPageProps> = ({
  data,
  logo,
  color,
  renderMap,
  photoGrid,
  ogImage,
}) => {
  const itemsRef = useRef([]);
  // you can access the elements with itemsRef.current[n]

  useEffect(() => {
    itemsRef.current = itemsRef.current.slice(0, 100);
  }, []);

  const renderLink = ({ link, name, blank, icon }: LinkData) => {
    return (
      <NextLink key={name} href={link}>
        <a
          target={blank ? "_blank" : "_self"}
          className={clsx(styles.instagram)}
        >
          <span className={styles.icon}>{icon}</span>
          <span className={styles.instaText}>{name}</span>
        </a>
      </NextLink>
    );
  };

  const onMouseEnter = (rotate: string) => (e: MouseEvent<HTMLDivElement>) => {
    // move element on mouse enter
    const element = e.currentTarget;
    const elementRect = element.getBoundingClientRect();
    const elementCenterX = elementRect.x + elementRect.width / 2;
    const elementCenterY = elementRect.y + elementRect.height / 2;
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const deltaX = mouseX - elementCenterX;
    const deltaY = mouseY - elementCenterY;
    const angle = Math.atan2(deltaY, deltaX);
    const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
    const moveX = Math.cos(angle) * distance;
    const moveY = Math.sin(angle) * distance;
    element.style.transform = `${rotate} translate(${moveX}px, ${moveY}px)`;
  };

  const renderScissors = () => {
    return [...new Array(500)].map((n) => {
      const uniqLeft = Math.random() * 100;
      const uniqTop = Math.random() * 100;
      const rotate = `rotate(${Math.random() * 360}deg)`;
      return (
        <div
          onMouseEnter={onMouseEnter(rotate)}
          key={n}
          style={{
            left: `${uniqLeft}%`,
            top: `${uniqTop}%`,
            transform: rotate,
          }}
          className={styles.scissors}
        >
          <Image
            className={styles.scissorsImage}
            loading="lazy"
            layout="responsive"
            src={scissorsIcon}
            alt="scissors"
          />
        </div>
      );
    });
  };

  return (
    <>
      <Head>
        <title>{data.title}</title>
        <meta name="description" content={data.description} />
        <meta name="og:title" content={data.title} />
        <meta name="og:description" content={data.description} />
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
        {renderScissors()}
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
                      objectPosition="50% 60%"
                    />
                  </Zoom>
                </div>
              );
            })}
          </div>
          <main className={styles.main}>
            <Container className={styles.mainContainer}>
              <ul className={styles.list} style={{ borderColor: color }}>
                {data.services.map((service) => (
                  <li key={service.name} className={styles.listItem}>
                    <span className={styles.serviceName}>{service.name}</span>
                    <div className={styles.price}>
                      <span style={{ color }} className={styles.priceValue}>
                        {service.price}
                      </span>
                      <span className={styles.priceCurrency}>грн</span>
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
