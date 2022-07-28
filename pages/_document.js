import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

class NextDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <meta property="og:locale" content="pt_BR" />
          <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
          <meta property="og:type" content="website" />
          <meta property="og:image" content="https://i.imgur.com/hkxVz0e.jpg" />
          <meta property="og:image:type" content="img/jpeg" />
          <meta property="og:image:width" content="200" />
          <meta property="og:image:height" content="200" />
          <link rel="shortcut icon" href="./favicon.ico" />
          <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap"
            rel="stylesheet"
          />
          {/* <script
      type="text/javascript"
      src="https://sandbox.boletobancario.com/boletofacil/wro/direct-checkout.min.js"
    ></script> */}

          <script
            async
            type="text/javascript"
            src="https://www.boletobancario.com/boletofacil/wro/direct-checkout.min.js"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default NextDocument;
