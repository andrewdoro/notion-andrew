import { PropsWithChildren } from 'react';
import Navbar from '../components/Navbar';
import Footer from 'components/Footer';

export default function Layout({ children }: PropsWithChildren<{}>) {
  return (
    <>
      <Navbar />
      <main className="flex w-full min-w-0 flex-1 flex-col">
        <div className="min-h-screen">{children}</div>
        <div className="fixed right-0 bottom-0 z-[-2] aspect-square w-1/3 rounded-full bg-red-500 bg-opacity-50 blur-3xl dark:bg-opacity-20" />
        <div className="fixed right-0 top-0 z-[-2]  aspect-square w-2/4 rounded-full bg-blue-500 bg-opacity-50 blur-3xl dark:bg-opacity-20 sm:w-1/4" />
        <div className="fixed left-0 top-1/2 z-[-2] aspect-square w-2/5 rounded-full bg-orange-500 bg-opacity-50 blur-3xl dark:bg-opacity-20 sm:w-1/5" />
        <Footer />
      </main>
    </>
  );
}
