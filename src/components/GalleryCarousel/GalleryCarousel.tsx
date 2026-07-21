import React, { useCallback, useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import clsx from "clsx";
import useEmblaCarousel from "embla-carousel-react";
import styles from "./GalleryCarousel.module.scss";

export interface GalleryCarouselProps {
  images: (string | StaticImageData)[];
  variant?: "minimal" | "loud";
  onImageClick?: (index: number) => void;
}

export const GalleryCarousel = ({
  images,
  variant = "minimal",
  onImageClick,
}: GalleryCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className={clsx(variant === "loud" && styles.loud)}>
      <div className={styles.viewport} ref={emblaRef}>
        <div className={styles.container}>
          {images.map((src, index) => (
            <div key={index} className={styles.slide}>
              <button
                type="button"
                className={styles.slideButton}
                onClick={() => onImageClick?.(index)}
                aria-label={`Відкрити фото ${index + 1}`}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  loading="lazy"
                  sizes="(max-width: 600px) 78vw, 320px"
                  style={{ objectFit: "cover" }}
                />
                <span className={styles.slideNum}>
                  {String(index + 1).padStart(2, "0")}
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.controls}>
        <button
          type="button"
          className={styles.arrow}
          onClick={() => emblaApi?.scrollPrev()}
          aria-label="Попереднє фото"
        >
          ←
        </button>
        <button
          type="button"
          className={styles.arrow}
          onClick={() => emblaApi?.scrollNext()}
          aria-label="Наступне фото"
        >
          →
        </button>
        <div className={styles.counter} aria-live="polite">
          {String(selectedIndex + 1).padStart(2, "0")} /{" "}
          {String(images.length).padStart(2, "0")}
        </div>
      </div>
    </div>
  );
};

export default GalleryCarousel;
