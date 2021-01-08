import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <link
            href="https://fonts.googleapis.com/css2?family=Open+Sans&family=Rubik:wght@400;500&display=swap"
            rel="stylesheet"
          />
          <title>Organize Reddit saved posts & comments</title>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
