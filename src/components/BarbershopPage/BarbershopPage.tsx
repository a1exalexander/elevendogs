import React, { useState } from "react";
import Head from "next/head";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { locations } from "../../../data";
import { Routes } from "../../constants";
import { Pricing } from "../../types/Pricing";
import { Lightbox } from "../Lightbox";
import styles from "./BarbershopPage.module.scss";

export interface Barber {
  id: string | number;
  name: string;
  role: string;
  bio: string;
  photo: string | StaticImageData;
}

export interface BarbershopPageProps {
  variant: "minimal" | "loud";
  data: (typeof locations)[keyof typeof locations];
  pricing: Pricing[];
  heroImage: string | StaticImageData;
  heroLogo: string | StaticImageData;
  gallery: (string | StaticImageData)[];
  barbers: Barber[];
  contactImage: string | StaticImageData;
  crossLink: { label: string; href: string };
  ogImage?: string;
  showTicker?: boolean;
  showStickers?: boolean;
}

const TICKER_PHRASE =
  "Пострижись як в прошлий раз ✦ Eleven Dogs Youngsters ✦ ";

export const BarbershopPage = ({
  variant,
  data,
  pricing,
  heroImage,
  heroLogo,
  gallery,
  barbers,
  contactImage,
  crossLink,
  ogImage,
  showTicker = true,
  showStickers = true,
}: BarbershopPageProps) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const isLoud = variant === "loud";
  const instagramUrl = `https://www.instagram.com/${data.instagram}/`;

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

      <div className={clsx(styles.page, isLoud ? styles.loud : styles.minimal)}>
        <header className={styles.header}>
          <div className={styles.headerInner}>
            <Link
              href={Routes.HOME}
              className={styles.brand}
              aria-label={data.name}
            >
              ELEVEN DOGS
            </Link>
            <a
              href={data.booking}
              target="_blank"
              rel="noreferrer"
              className={styles.cta}
            >
              Записатися
            </a>
          </div>
          <nav className={styles.nav}>
            <a href="#services" className={styles.navLink}>
              Послуги
            </a>
            <a href="#gallery" className={styles.navLink}>
              Галерея
            </a>
            <a href="#team" className={styles.navLink}>
              Майстри
            </a>
            <a href="#contacts" className={styles.navLink}>
              Контакти
            </a>
            <Link
              href={crossLink.href}
              className={clsx(styles.navLink, styles.navCross)}
            >
              {crossLink.label} →
            </Link>
          </nav>
        </header>

        <section className={styles.hero}>
          <Image
            src={heroImage}
            alt={data.name}
            fill
            priority
            sizes="100vw"
            className={styles.heroImage}
            style={{ objectFit: "cover" }}
          />
          <div className={styles.heroOverlay} />
          {isLoud && showStickers && (
            <div className={styles.sticker}>COLOR IS LIFE</div>
          )}
          <div className={styles.heroContent}>
            <Image
              src={heroLogo}
              alt={data.name}
              priority
              className={styles.heroLogo}
              style={{ width: "auto" }}
            />
            <div className={styles.heroAddress}>{data.address}</div>
            <h1 className={styles.heroTitle}>
              {isLoud ? (
                <>
                  Young
                  <br />
                  sters
                </>
              ) : (
                <>
                  Eleven
                  <br />
                  Dogs
                </>
              )}
            </h1>
            <div className={styles.heroSubtitle}>
              {isLoud
                ? "Eleven Dogs · район Водоканал"
                : "barbershop & men's club · центр"}
            </div>
            <div className={styles.heroActions}>
              <a
                href={data.booking}
                target="_blank"
                rel="noreferrer"
                className={styles.cta}
              >
                Записатися онлайн
              </a>
              <a href="#services" className={styles.ctaGhost}>
                Прайс
              </a>
            </div>
          </div>
        </section>

        {isLoud
          ? showTicker && (
              <div className={styles.ticker}>
                <div className={styles.tickerTrack}>
                  <span>{TICKER_PHRASE.repeat(4)}</span>
                  <span>{TICKER_PHRASE.repeat(4)}</span>
                </div>
              </div>
            )
          : (
              <section className={styles.about}>
                <div className={styles.aboutHead}>
                  <div className={styles.kicker}>01 — Локація</div>
                  <h2 className={styles.aboutTitle}>
                    Пострижись як в прошлий раз
                  </h2>
                </div>
                <div className={styles.aboutBody}>
                  <p>
                    Барбершоп в центрі Кременчука та в районі зупинки Водоканал —
                    мережа Eleven Dogs.
                  </p>
                  <p className={styles.aboutMail}>hello@elevendogs.com.ua</p>
                </div>
              </section>
            )}

        <section id="services" className={styles.section}>
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>
              {isLoud ? "Прайс" : "Послуги"}
            </h2>
            <div className={styles.kicker}>
              {isLoud ? "грн · Youngsters" : "Прайс · грн"}
            </div>
          </div>

          {isLoud ? (
            <div className={styles.priceGrid}>
              {pricing.map((service, index) => (
                <div key={service.id} className={styles.priceCard}>
                  <span className={styles.priceNum}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.priceName}>{service.title}</span>
                  <span className={styles.priceValue}>{service.price}</span>
                </div>
              ))}
            </div>
          ) : (
            <ul className={styles.priceList}>
              {pricing.map((service, index) => (
                <li key={service.id} className={styles.priceRow}>
                  <span className={styles.priceNum}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.priceName}>{service.title}</span>
                  <span className={styles.priceValue}>{service.price}</span>
                </li>
              ))}
            </ul>
          )}

          <div className={styles.sectionActions}>
            <a
              href={data.booking}
              target="_blank"
              rel="noreferrer"
              className={styles.cta}
            >
              Записатися онлайн
            </a>
          </div>
        </section>

        <section id="gallery" className={styles.section}>
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>Галерея</h2>
            <div className={styles.kicker}>
              {isLoud ? "вайб · стиль" : "Інтер'єр · роботи"}
            </div>
          </div>
          <div className={styles.galleryGrid}>
            {gallery.map((src, index) => (
              <button
                type="button"
                key={index}
                className={styles.galleryItem}
                onClick={() => setLightboxIndex(index)}
                aria-label={`Відкрити фото ${index + 1}`}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  loading="lazy"
                  sizes="(max-width: 600px) 50vw, 210px"
                  style={{ objectFit: "cover" }}
                />
                <span className={styles.galleryNum}>
                  {String(index + 1).padStart(2, "0")}
                </span>
              </button>
            ))}
          </div>
        </section>

        <section id="team" className={styles.section}>
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>Майстри</h2>
            <div className={styles.kicker}>
              {isLoud ? "команда · Youngsters" : "Команда · Eleven Dogs"}
            </div>
          </div>
          <div className={styles.teamGrid}>
            {barbers.map((barber) => (
              <article key={barber.id} className={styles.barberCard}>
                <div className={styles.barberPhoto}>
                  <Image
                    src={barber.photo}
                    alt={barber.name}
                    fill
                    loading="lazy"
                    sizes="(max-width: 600px) 100vw, 240px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className={styles.barberInfo}>
                  <div className={styles.barberName}>{barber.name}</div>
                  <div className={styles.barberRole}>{barber.role}</div>
                  <p className={styles.barberBio}>{barber.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="contacts" className={styles.contacts}>
          <div className={styles.contactsInfo}>
            <div className={styles.kicker}>
              {isLoud ? "Контакти · Локація 02" : "Контакти · Локація 01"}
            </div>
            <h2 className={styles.contactsTitle}>{data.address}</h2>
            <div className={styles.contactRows}>
              <a href={`tel:${data.phone}`} className={styles.contactRow}>
                <span className={styles.contactLabel}>ТЕЛЕФОН</span>
                {data.phone}
              </a>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noreferrer"
                className={styles.contactRow}
              >
                <span className={styles.contactLabel}>INSTAGRAM</span>@
                {data.instagram}
              </a>
              <div className={styles.contactRow}>
                <span className={styles.contactLabel}>МІСТО</span>Кременчук
              </div>
            </div>
            <div className={styles.contactsActions}>
              <a
                href={data.booking}
                target="_blank"
                rel="noreferrer"
                className={styles.cta}
              >
                Записатися
              </a>
              <a
                href={data.map}
                target="_blank"
                rel="noreferrer"
                className={styles.ctaGhost}
              >
                На мапі
              </a>
            </div>
          </div>
          <div className={styles.contactsPhoto}>
            <Image
              src={contactImage}
              alt={data.name}
              fill
              loading="lazy"
              sizes="(max-width: 900px) 100vw, 600px"
              style={{ objectFit: "cover" }}
            />
          </div>
        </section>

        <footer className={styles.footer}>
          <div className={styles.footerBrand}>
            {isLoud ? "Youngsters" : "Eleven Dogs"}
          </div>
          <div className={styles.footerLinks}>
            <Link href={crossLink.href} className={styles.footerLink}>
              {crossLink.label}
            </Link>
            <Link href={Routes.EDUCATION} className={styles.footerLink}>
              Навчання
            </Link>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noreferrer"
              className={styles.footerLink}
            >
              @{data.instagram}
            </a>
            <span className={styles.footerCopy}>© Eleven Dogs</span>
          </div>
        </footer>
      </div>

      <Lightbox
        images={gallery}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onIndexChange={setLightboxIndex}
      />
    </>
  );
};

export default BarbershopPage;
