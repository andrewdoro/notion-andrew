import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
const LoadingScreen = () => {
  const controls = useAnimation();

  useEffect(() => {
    async function sequence() {
      await controls.start({ pathLength: 1 });
      await controls.start({ fillOpacity: 1 });
    }
    sequence();
  }, [controls]);
  return (
    <motion.div
      className="fixed z-[200] flex h-screen w-screen items-center justify-center bg-zinc-900"
      exit={{ y: '-100vh' }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}>
      <div className="flex items-center justify-center text-red-500">
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-36 w-36 fill-red-500"
          fill="none"
          viewBox="0 0 512 512"
          stroke="currentColor">
          <motion.path
            animate={controls}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, fillOpacity: 0 }}
            strokeWidth={4}
            transition={{
              duration: 1,
              ease: 'easeInOut',
            }}
            d="M444.646,171.88a243.863,243.863,0,0,0-17.189-51.462,209.441,209.441,0,0,0-28.23-44.89,190.212,190.212,0,0,0-38.43-35.52,181.953,181.953,0,0,0-47.655-23.494A179.594,179.594,0,0,0,257.1,7.984q-44.165,0-80.076,15.8a181.956,181.956,0,0,0-61.489,43.631Q89.964,95.251,75.989,133T62.014,214.672V419.4H172.975v-97.89H293.438V275.363H172.975V197.331q0-14.539.978-30.9a237.446,237.446,0,0,1,4.192-32.444,178.9,178.9,0,0,1,8.944-30.625,87.075,87.075,0,0,1,15.373-25.591,71.469,71.469,0,0,1,23.477-17.62q13.836-6.568,33.121-6.573,21.8,0,36.474,8.95A73.305,73.305,0,0,1,319.571,86.3,115.485,115.485,0,0,1,333.685,120a278.21,278.21,0,0,1,6.848,38.737q2.1,19.861,2.236,39.016t0.14,34.261q0,19.3-1.537,40.694T336.76,316.2q-3.079,22.1-7.686,44.47T318.034,404.3q-6.433,21.258-14.395,40.694a274.728,274.728,0,0,1-17.748,35.94l41.645,24.053a262.568,262.568,0,0,0,32.981-34.821,399.086,399.086,0,0,0,29.208-42.232,424.625,424.625,0,0,0,24.456-47.127,460.846,460.846,0,0,0,18.726-49.784,396.359,396.359,0,0,0,12.158-50.344,334.291,334.291,0,0,0,4.891-48.665V226.7A235.949,235.949,0,0,0,444.646,171.88Z"
          />
        </motion.svg>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
