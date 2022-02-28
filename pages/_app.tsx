import { useEffect, useState } from 'react';

import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';

import 'prismjs/themes/prism-tomorrow.css';
import '../styles/globals.css';

import LoadingScreen from 'components/LoadingScreen';
import { AuthProvider } from '../components/context/auth';
import CustomCursorProvider from '../components/context/cursor';
import CustomCusor from 'components/CustomCursor';
import Layout from 'layouts/Layout';
import { AnimatePresence } from 'framer-motion';

function MyApp({ Component, pageProps, router }: AppProps) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2250);
    return () => clearTimeout(timer);
  }, [router]);
  return (
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
          <AnimatePresence exitBeforeEnter>
            {router.pathname === '/' && loading && <LoadingScreen />}
          </AnimatePresence>

          <Layout>
            <Component {...pageProps} />
          </Layout>
          {router.pathname.split('/')[2] !== 'open-graph' && <CustomCusor />}
        </AuthProvider>
      </CustomCursorProvider>
    </ThemeProvider>
  );
}

export default MyApp;
