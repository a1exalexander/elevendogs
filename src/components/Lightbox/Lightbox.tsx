import React, { useCallback, useEffect } from 'react';
import Image, { StaticImageData } from 'next/image';
import clsx from 'clsx';
import styles from './Lightbox.module.scss';

export interface LightboxProps {
  images: (string | StaticImageData)[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

export const Lightbox = ({
  images,
  index,
  onClose,
  onIndexChange,
}: LightboxProps) => {
  const isOpen = index !== null;

  const step = useCallback(
    (delta: number) => {
      if (index === null || images.length === 0) return;
      const length = images.length;
      onIndexChange((index + delta + length) % length);
    },
    [index, images.length, onIndexChange]
  );

  useEffect(() => {
    if (!isOpen) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      else if (event.key === 'ArrowRight') step(1);
      else if (event.key === 'ArrowLeft') step(-1);
    };

    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, step]);

  if (index === null || !images[index]) return null;

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true">
      <button
        type="button"
        className={styles.backdrop}
        aria-label="Закрити"
        onClick={onClose}
      />
      <div className={styles.imageWrap}>
        <Image
          src={images[index]}
          alt=""
          fill
          sizes="92vw"
          priority
          style={{ objectFit: 'contain' }}
        />
      </div>
      <button
        type="button"
        className={clsx(styles.navButton, styles.prev)}
        onClick={() => step(-1)}
        aria-label="Попереднє фото"
      >
        <span className={styles.chevron} aria-hidden="true">
          ‹
        </span>
      </button>
      <button
        type="button"
        className={clsx(styles.navButton, styles.next)}
        onClick={() => step(1)}
        aria-label="Наступне фото"
      >
        <span className={styles.chevron} aria-hidden="true">
          ›
        </span>
      </button>
      <button
        type="button"
        className={clsx(styles.navButton, styles.close)}
        onClick={onClose}
        aria-label="Закрити"
      >
        ✕
      </button>
    </div>
  );
};

export default Lightbox;
