import React, { useState, useEffect, useCallback } from 'react';
import cx from 'classnames';
import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import styles from './CampaignCarousel.module.css';

export default function CampaignCarousel({ slidePictures }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, draggable: false }, [
    Autoplay({ delay: 4000 }),
  ]);

  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelectedIndex(embla.selectedScrollSnap());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    embla.on('select', onSelect);
  }, [embla, onSelect]);

  return (
    <>
      <div className={styles.carousel} ref={emblaRef}>
        <div className={styles.slideContainer}>
          {slidePictures.map((picture) => (
            <div key={picture} className={styles.slide}>
              <Image
                layout="responsive"
                src={`/${picture}`}
                alt=""
                width={400}
                height={400}
                sizes="30rem"
              />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.dotGroup}>
        {slidePictures.map((picture, index) => (
          <div
            key={picture}
            className={cx(styles.dot, {
              [styles.selected]: index === selectedIndex,
            })}
          />
        ))}
      </div>
    </>
  );
}
