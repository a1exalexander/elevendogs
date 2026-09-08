import React, { FC, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { education } from "../../../data";
import { Routes } from "../../constants";
import { Lightbox } from "../Lightbox";
import styles from "./EducationPage.module.scss";
import logo from "../../assets/new_logo_2024.jpg";
import photo1 from "../../assets/ed/a00001.jpg";
import photo2 from "../../assets/ed/a00003.jpg";
import photo3 from "../../assets/ed/a00005.jpg";
import photo4 from "../../assets/ed/a00007.jpg";

export interface EducationPageProps {
  data: typeof education;
}

const galleryPhotos = [photo1, photo2, photo3, photo4];

export const EducationPage: FC<EducationPageProps> = ({ data }) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <Head>
        <title>{data.title}</title>
        <meta name="description" content={data.description} />
        <meta name="og:title" content={data.title} />
        <meta name="og:description" content={data.description} />
      </Head>

      <div className={styles.page}>
        <header className={styles.header}>
          <div className={styles.headerInner}>
            <Link
              href={Routes.HOME}
              className={styles.brand}
              aria-label="Eleven Dogs"
            >
              <Image
                priority
                src={logo}
                alt="Eleven Dogs"
                className={styles.brandLogo}
                style={{ width: "auto" }}
              />
            </Link>
            <a href={`tel:${data.phone}`} className={styles.cta}>
              Зв&apos;язатися
            </a>
          </div>
        </header>

        <section className={styles.hero}>
          <div className={styles.kicker}>Eleven Dogs · Кременчук</div>
          <h1 className={styles.heroTitle}>Навчання</h1>
          <p className={styles.heroText}>{data.description}</p>
        </section>

        <section className={styles.gallerySection}>
          <div className={styles.galleryGrid}>
            {galleryPhotos.map((src, index) => (
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
                  sizes="(max-width: 600px) 50vw, 200px"
                  style={{ objectFit: "cover" }}
                />
              </button>
            ))}
          </div>
        </section>

        <section className={styles.programsSection}>
          {data.data.map((program, index) => (
            <div key={program.name} className={styles.program}>
              <div className={styles.programHead}>
                <div className={styles.kicker}>
                  Програма {String(index + 1).padStart(2, "0")}
                </div>
                <h2 className={styles.programTitle}>{program.name}</h2>
              </div>
              <div className={styles.programStages}>
                {program.stages.map((stage, stageIndex) => (
                  <div key={(stage.name ?? "") + stageIndex}>
                    {stage.name && (
                      <div className={styles.stageName}>{stage.name}</div>
                    )}
                    <ul className={styles.valuesList}>
                      {stage.values.map((value) => (
                        <li key={value} className={styles.valuesItem}>
                          <span className={styles.dash}>—</span>
                          <span>{value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>Записатися на навчання</h2>
          <div className={styles.ctaActions}>
            <a href={`tel:${data.phone}`} className={styles.cta}>
              {data.phone}
            </a>
            <a
              href="https://www.instagram.com/eleven.dogs/"
              target="_blank"
              rel="noreferrer"
              className={styles.ctaGhost}
            >
              @eleven.dogs
            </a>
          </div>
        </section>

        <footer className={styles.footer}>
          <div className={styles.footerBrand}>Eleven Dogs</div>
          <div className={styles.footerLinks}>
            <Link href={Routes.MAIN} className={styles.footerLink}>
              Eleven Dogs
            </Link>
            <Link href={Routes.SECONDARY} className={styles.footerLink}>
              Youngsters
            </Link>
            <span className={styles.footerCopy}>© Eleven Dogs</span>
          </div>
        </footer>
      </div>

      <Lightbox
        images={galleryPhotos}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onIndexChange={setLightboxIndex}
      />
    </>
  );
};

export default EducationPage;
