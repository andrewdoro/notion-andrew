import { motion } from 'framer-motion';
const LoadingScreen = () => {
  return (
    <motion.div
      className="fixed z-[200] flex h-screen w-screen items-center justify-center bg-zinc-900"
      exit={{ opacity: 0, scale: 2 }}>
      <div className="flex items-center justify-center text-red-500">
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-36 w-36 animate-bounce "
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <motion.path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            initial={{
              opacity: 0,
              rotate: -45,
              pathLength: 0,
            }}
            animate={{
              opacity: 1,
              rotate: 0,
              pathLength: 1,
            }}
            transition={{
              duration: 1,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatType: 'reverse',
            }}
            d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
          />
          <motion.path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            initial={{
              opacity: 0,
              pathLength: 0,
            }}
            animate={{
              opacity: 1,
              pathLength: 1,
            }}
            transition={{
              duration: 1,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatType: 'reverse',
            }}
            d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
          />
        </motion.svg>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
