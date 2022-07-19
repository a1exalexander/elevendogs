import React, { FC } from "react";
import Head from "next/head";
import Image from "next/image";
import { education } from "../../../data";
import { Container } from "../Container";
import { Button } from "../Button";
import styles from "./EducationPage.module.scss";

export interface EducationPageProps {
  data: typeof education;
}

export const EducationPage: FC<EducationPageProps> = ({ data }) => {
  return (
    <>
      <Head>
        <title>{data.title}</title>
        <meta name="description" content={data.description} />
        <meta name="og:title" content={data.title} />
        <meta name="og:description" content={data.description} />
      </Head>
      <div className={styles.container}>
        <main className={styles.main}>
          <Container className={styles.mainContainer}>
            <ul className={styles.list}>
              {data.data.map((service) => (
                <li key={service.name} className={styles.listItem}>
                  <span className={styles.serviceName}>{service.name}</span>
                  {service.stages.map((stage, idx) => (
                    <ul key={stage.name + String(idx)} className={styles.stagesList}>
                      <li className={styles.stageItem}>
                        <span className={styles.stageName}>{stage.name}</span>
                        <ul className={styles.valuesList}>
                          {stage.values.map((value) => (
                            <li key={value} className={styles.valuesItem}>
                              {value}
                            </li>
                          ))}
                        </ul>
                      </li>
                    </ul>
                  ))}
                </li>
              ))}
            </ul>
            <Button className={styles.button} href={`tel:${data.phone}`}>
              Записатися
            </Button>
          </Container>
        </main>
        <footer className={styles.footer}></footer>
      </div>
    </>
  );
};

export default EducationPage;
