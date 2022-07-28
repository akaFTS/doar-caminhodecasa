import React, { useEffect, useRef, useState } from 'react';
import useMutationObserver from '@rooks/use-mutation-observer';
import logo from 'public/logo.png';
import styles from './SocialWall.module.css';

export default function SocialWall() {
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.juicer.io/embed.js';
    script.async = true;
    document.body.appendChild(script);

    const link = document.createElement('link');
    link.href = 'https://assets.juicer.io/embed.css';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    document.head.appendChild(link);

    return () => {
      document.body.removeChild(script);
      document.head.removeChild(link);
    };
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    const logos = Array.from(document.querySelectorAll('.j-logo'));
    if (logos.length > 0) return;

    const divs = Array.from(document.querySelectorAll('.j-poster a'));
    divs.forEach((el) => {
      const img = document.createElement('img');
      img.src = logo;
      img.className = 'j-logo';
      el.prepend(img);
    });
  }, [isLoaded]);

  const wallRef = useRef();
  useMutationObserver(wallRef, (mutationList) => {
    if (isLoaded) return;

    // We use <some> to return early when the div is found
    mutationList.some((mutation) => {
      if (!mutation.removedNodes) return false;

      return Array.from(mutation.removedNodes).some((node) => {
        if (node.className === 'j-loading-wrapper') {
          setLoaded(true);
          return true;
        }

        return false;
      });
    });
  });

  return (
    <section className={styles.social}>
      <h2 className={styles.title}>
        Últimas <span className={styles.highlight}>postagens</span>
      </h2>
      <div className={styles.underline} />
      <div className={styles.wall}>
        <ul
          className="juicer-feed"
          data-feed-id="associacao_caminhodecasa"
          ref={wallRef}
        >
          <h1 className="referral">
            <a href="https://www.juicer.io">Powered by Juicer.io</a>
          </h1>
        </ul>
      </div>
    </section>
  );
}
