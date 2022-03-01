import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SiGithub, SiLinkedin, SiTwitter } from 'react-icons/si';
import { Logo } from './Icons';
const Footer = () => {
  const router = useRouter();
  if (router.pathname === '/') return <div></div>;
  return (
    <div className="bg-white bg-opacity-10 px-6 dark:bg-black dark:bg-opacity-30 lg:-ml-20 lg:w-[calc(100vw_-_17px)] ">
      <div className=" mx-auto flex max-w-6xl flex-col items-center gap-12 px-12  py-10 sm:flex-row ">
        <div className=" relative aspect-square  h-24 overflow-hidden rounded-full">
          <div className="absolute top-0 left-0 z-10 m-4 fill-white text-3xl opacity-30">
            <Logo />
          </div>
          <Image
            layout="fill"
            src="/images/logo.jpg"
            alt="Logo"
            objectFit="cover"
            className="blur-xl"
          />
        </div>
        <div className="flex w-full flex-1 flex-col items-center justify-between gap-4  md:flex-row ">
          <div className="flex flex-col gap-2">
            <div className="flex gap-4">
              <Link href="/">
                <a className="bg-growing-underline bg-gradient-to-t from-red-500 to-red-500 tracking-widest ">
                  Home
                </a>
              </Link>
              <Link href="/blog">
                <a className="bg-growing-underline bg-gradient-to-t from-red-500 to-red-500 tracking-widest  ">
                  Projects
                </a>
              </Link>
              <Link href="/about">
                <a className="bg-growing-underline bg-gradient-to-t from-red-500 to-red-500 tracking-widest">
                  About
                </a>
              </Link>
            </div>
            <p className="text-center text-black text-opacity-50 dark:text-white dark:text-opacity-50">
              © Andrew Dorobantu - 2022
            </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="flex gap-8 ">
              <a
                className="opacity-50 transition-opacity hover:opacity-100 "
                target="_blank"
                rel="noopener noreferrer"
                href="https://twitter.com/andrewdorobantu">
                <SiTwitter className="text-2xl" />
              </a>
              <a
                className="opacity-50 transition-opacity hover:opacity-100 "
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/andrewdoro">
                <SiGithub className="text-2xl" />
              </a>
              <a
                className="opacity-50 transition-opacity hover:opacity-100"
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.linkedin.com/in/andrei-ovidiu-dorobantu/">
                <SiLinkedin className="text-2xl" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
