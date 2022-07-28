import React, { useEffect } from 'react';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import { hotjar } from 'react-hotjar';
import Head from 'next/head';
import { BasketProvider } from 'contexts/BasketContext';
import { PersonalDataProvider } from 'contexts/PersonalDataContext';
import 'style/reset.css';
import 'style/vars.css';
import 'style/colors.css';
import 'style/index.css';

// Tell Font Awesome to skip adding the CSS automatically since it's being imported above
config.autoAddCss = false;

export default function App({ Component, pageProps }) {
  useEffect(() => {
    hotjar.initialize(2688511, 6);
  }, []);

  return (
    <>
      <Head>
        <title>Doar - Associação Caminho de Casa</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <BasketProvider>
        <PersonalDataProvider>
          <main
            style={{
              display: 'grid',
              gridTemplateRows: 'auto 1fr auto',
              minHeight: '100vh',
            }}
          >
            <Component {...pageProps} />
          </main>
        </PersonalDataProvider>
      </BasketProvider>
    </>
  );
}
