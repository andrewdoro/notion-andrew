import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';

import 'prismjs/themes/prism-tomorrow.css';
import '../styles/globals.css';

import { AuthProvider } from '../components/context/auth';
import CustomCursorProvider from '../components/context/cursor';
import CustomCusor from 'components/CustomCursor';
import Layout from 'layouts/Layout';
import Script from 'next/script';

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />

      <Script id="google-analytics" strategy="lazyOnload">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
                `}
      </Script>
      <ThemeProvider attribute="class">
        <CustomCursorProvider>
          <AuthProvider>
            <DefaultSeo
              title=""
              defaultTitle="Andrew Dorobantu - Front-end developer"
              titleTemplate="%s - Andrew Dorobantu"
              description="I am a Front-end developer, currently living in Cluj-Napoca. I strive to learn the best technologies in the field of web development. Using Next.js and TailwindCSS as basics, I possess good problem-solving skills and innovative ideas."
              canonical={`https://${process.env.NEXT_PUBLIC_VERCEL_URL}`}
              openGraph={{
                type: 'website',
                url: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`,
                title: 'Andrew Dorobantu',
                description: 'Portofolio Website using the latest tehnologies.',
                images: [
                  {
                    url: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/images/og-image.jpg`,
                    width: 1200,
                    height: 630,
                    alt: 'Andrew Dorobantu Website',
                  },
                ],
              }}
              twitter={{
                handle: '@andrewdorobantu',
                site: '@notion-andrew.com',
                cardType: 'summary_large_image',
              }}
            />

            <Layout>
              <Component {...pageProps} />
            </Layout>
            {router.pathname.split('/')[2] !== 'open-graph' && <CustomCusor />}
          </AuthProvider>
        </CustomCursorProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
