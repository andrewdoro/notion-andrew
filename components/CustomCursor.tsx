import React, { useContext, useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { CursorLookType, CustomCursorContext } from './context/cursor';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { useMediaQuery } from './hooks/hooks';

const CustomCursor = () => {
  const { type } = useContext(CustomCursorContext);
  const router = useRouter();
  const [cursorVariant, setCursorVariant] = useState<CursorLookType>('default');
  const [mousePositon, setMousePosition] = useState({ x: -100, y: -100 });
  const mobile = useMediaQuery('(max-width: 1024px)');

  useEffect(() => {
    const mouseMoveHandler = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      setMousePosition({ x: clientX, y: clientY });
    };
    document.addEventListener('mousemove', mouseMoveHandler);

    return () => {
      document.removeEventListener('mousemove', mouseMoveHandler);
    };
  });

  useEffect(() => {
    setCursorVariant(type);
  }, [type]);

  useEffect(() => {
    setCursorVariant('default');
  }, [router]);

  const variantsDot: Variants = {
    default: {
      opacity: 0,
      x: mousePositon.x - 8,
      y: mousePositon.y - 8,
      scale: 0,
    },
    link: {
      zIndex: -1,
      opacity: 1,
      x: mousePositon.x - 8,
      y: mousePositon.y - 8,
      scale: 5,
    },
    none: {
      x: mousePositon.x - 8,
      y: mousePositon.y - 8,
      opacity: 1,
      scale: 1,
    },
  };
  const variantsRing = {
    default: {
      x: mousePositon.x - 24,
      y: mousePositon.y - 24,
    },
    link: {
      x: mousePositon.x - 8,
      y: mousePositon.y - 8,
      opacity: 0,
      scale: 3,
    },
    none: {
      x: mousePositon.x - 8,
      y: mousePositon.y - 8,
    },
  };
  return (
    <>
      {!mobile && (
        <>
          <div className="fixed top-0 left-0 z-[-5]">
            <motion.div
              className="pointer-events-none absolute h-12 w-12 rounded-full bg-red-500 bg-opacity-40 dark:bg-opacity-20"
              variants={variantsRing}
              animate={cursorVariant}
              transition={{ type: 'spring', stiffness: 300, damping: 28, mass: 3 }}
            />
            <motion.div
              className="pointer-events-none absolute h-12 w-12 rounded-full  bg-blue-500 bg-opacity-30 dark:bg-opacity-10"
              variants={variantsRing}
              animate={cursorVariant}
              transition={{ type: 'spring', stiffness: 500, damping: 20, mass: 3.2 }}
            />
            <motion.div
              className="pointer-events-none absolute  h-12 w-12 rounded-full  bg-yellow-500 bg-opacity-20 dark:bg-opacity-10"
              variants={variantsRing}
              animate={cursorVariant}
              transition={{ type: 'spring', stiffness: 200, damping: 16, mass: 3.4 }}
            />
          </div>
          <motion.div
            className={cn(
              'pointer-events-none fixed z-[102] h-4 w-4 rounded-full bg-black transition-colors dark:bg-white',
              cursorVariant === 'none' && 'dark:bg-dark bg-opacity-10  dark:bg-opacity-10'
            )}
            variants={variantsDot}
            animate={cursorVariant}
            transition={{ type: 'spring', stiffness: 500, damping: 28 }}
          />
        </>
      )}
    </>
  );
};

export default CustomCursor;
