import { AnimatePresence, motion, Transition, Variants } from 'framer-motion';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

async function fetcher(arg: any, ...args: any) {
  const res = await fetch(arg, ...args);
  return res.json();
}

export default function BlogViewCounter({
  slug,
  register = false,
}: {
  slug: string;
  register: boolean;
}) {
  const { data } = useSWR(`/api/views/${slug}`, fetcher);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(data === undefined), 750);
    return () => {
      clearTimeout(timer);
    };
  }, [data]);
  const views = new Number(data?.total);
  useEffect(() => {
    const registerView = () => {
      fetch(`/api/views/${slug}`, {
        method: 'POST',
      });
    };
    if (register) registerView();
  }, [slug, register]);
  return (
    <div className="relative flex  items-center gap-2">
      <svg
        className="h-6 w-6"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
        <path
          fillRule="evenodd"
          d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
          clipRule="evenodd"
        />
      </svg>
      <AnimatePresence exitBeforeEnter>
        {!loading ? (
          <motion.p
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="tracking-wide">
            {views.toLocaleString()} views
          </motion.p>
        ) : (
          <motion.div
            className="flex gap-1 rounded-full  py-1 px-2 "
            variants={ContainerVariants}
            initial="initial"
            exit="exit"
            key="dots"
            animate="animate">
            <motion.div
              className="h-2 w-2 rounded-full bg-yellow-500"
              transition={DotTransition}
              variants={DotVariants}></motion.div>
            <motion.div
              className="h-2 w-2 rounded-full bg-red-500"
              transition={DotTransition}
              variants={DotVariants}></motion.div>
            <motion.div
              className="h-2 w-2 rounded-full bg-green-500"
              transition={DotTransition}
              variants={DotVariants}></motion.div>
            <motion.div
              className="h-2 w-2 rounded-full bg-blue-500"
              transition={DotTransition}
              variants={DotVariants}></motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
const ContainerVariants: Variants = {
  initial: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
  },
};
const DotVariants: Variants = {
  initial: {
    y: '-35%',
  },
  animate: {
    y: '35%',
  },
};
const DotTransition: Transition = {
  duration: 0.5,
  repeat: Infinity,
  repeatType: 'reverse',
  ease: 'easeInOut',
};
