import { useState, useEffect, FC, useContext } from 'react';
import { useRouter } from 'next/dist/client/router';
import { useTheme } from 'next-themes';
import Link from 'next/link';

import { CustomCursorContext } from './context/cursor';

import { HomeIcon, AboutIcon, ProjectsIcon, MenuIcon } from './Icons';
import { motion, Variants, useAnimation, AnimatePresence } from 'framer-motion';
import { useMediaQuery } from './hooks/hooks';
import cn from 'classnames';

interface NavItemProps {
  href: string;
  Icon: FC<{ outline: boolean }>;
  name: string;
  open: boolean;
  setOpen: (active: boolean) => void;
}
const item: Variants = {
  rest: {
    opacity: 0,
    y: 50,
  },
  hover: {
    opacity: 1,
    y: 0,
  },
  view: {
    opacity: 1,
    transition: { delay: 0.3 },
    x: 0,
  },
  hidden: {
    opacity: 0,
    x: 50,
  },
  exit: {
    opacity: 0,
    x: 100,
  },
};

export const NavItem = ({ href, name, open, Icon, setOpen }: NavItemProps) => {
  const router = useRouter();
  const isActive = router.asPath === href;
  const { setType } = useContext(CustomCursorContext);
  const isMobile = useMediaQuery('(max-width: 1024px)');
  return (
    <Link href={href} passHref>
      <motion.a
        onClick={() => setOpen(false)}
        onMouseEnter={() => setType('none')}
        onMouseLeave={() => setType('default')}
        initial="rest"
        whileHover="hover"
        className={cn(
          isActive
            ? 'font-semibold text-gray-800  dark:text-gray-200'
            : 'font-normal text-gray-600 dark:text-gray-400',
          'group relative flex h-12 w-12 cursor-pointer items-center justify-center gap-2 rounded-lg bg-zinc-50 text-2xl hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800  '
        )}>
        <Icon outline={!isActive} />
        {!isMobile && (
          <motion.p
            variants={item}
            transition={{ ease: 'easeInOut' }}
            className="pointer-events-none absolute left-14 rounded-lg bg-zinc-50 px-2 py-3 text-base tracking-widest dark:bg-zinc-900 ">
            {name}
          </motion.p>
        )}

        <AnimatePresence exitBeforeEnter>
          {open && (
            <motion.p
              className="absolute left-16 flex w-32 justify-center rounded-lg bg-zinc-50 py-3 text-base
                tracking-widest group-hover:bg-zinc-200 dark:bg-zinc-900  dark:group-hover:bg-zinc-800"
              initial="hidden"
              animate="view"
              exit="exit"
              variants={item}>
              {name}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.a>
    </Link>
  );
};

const drawer: Variants = {
  active: {
    x: 0,
    opacity: 1,
  },
  inactive: {
    x: -100,
    opacity: 0,
  },
};
const modal: Variants = {
  active: {
    opacity: 1,
  },
  inactive: {
    opacity: 0,
  },
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const controls = useAnimation();
  const isMobile = useMediaQuery('(max-width: 1024px)');
  useEffect(() => {
    isMobile
      ? controls.start(open ? 'active' : 'inactive')
      : controls.start(!open ? 'active' : 'inactive');

    !isMobile && setOpen(false);
  }, [controls, open, isMobile]);
  useEffect(() => setMounted(true), []);

  return (
    <>
      <button
        aria-label="Menu"
        className=" fixed top-0 left-0 z-[101] m-4 flex rounded-full
        bg-zinc-100 p-3 text-2xl ring-gray-400 transition-shadow
        hover:ring-2 dark:bg-zinc-900 dark:ring-gray-300 lg:hidden"
        onClick={() => setOpen(true)}>
        <MenuIcon />
      </button>
      <AnimatePresence exitBeforeEnter>
        {open && (
          <motion.div
            className="fixed top-0 left-0 z-50 h-screen w-screen bg-black bg-opacity-30 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            variants={modal}
            initial="inactive"
            animate="active"
            exit="inactive"
          />
        )}
      </AnimatePresence>
      <motion.div
        className="fixed z-[100] flex h-screen items-center opacity-0 lg:sticky lg:top-0 lg:opacity-100 "
        animate={controls}
        variants={drawer}>
        <nav className="z-10 flex flex-col items-center justify-center gap-6 px-4 ">
          <NavItem href="/" name="Home" Icon={HomeIcon} open={open} setOpen={setOpen} />
          <NavItem href="/blog" name="Blog" Icon={ProjectsIcon} open={open} setOpen={setOpen} />
          <NavItem href="/about" name="About" Icon={AboutIcon} open={open} setOpen={setOpen} />
          <button
            aria-label="Toggle Dark Mode"
            type="button"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 ring-gray-400
               hover:ring-2 dark:bg-zinc-900 dark:ring-gray-300"
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}>
            {mounted && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="h-6 w-6 text-gray-800 dark:text-gray-200">
                {resolvedTheme === 'dark' ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                )}
              </svg>
            )}
          </button>
        </nav>
      </motion.div>
    </>
  );
}
