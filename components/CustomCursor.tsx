import React, { useContext, useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { CursorLookType, CustomCursorContext } from './context/cursor';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { isMobile } from 'react-device-detect';

const CustomCursor = () => {
  const { type } = useContext(CustomCursorContext);
  const router = useRouter();
  const [cursorVariant, setCursorVariant] = useState<CursorLookType>('default');
  const [mousePositon, setMousePosition] = useState({ x: -1, y: -1 });
  const [mobile, setMobile] = useState(true);
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
    setMobile(isMobile);
  }, []);
  useEffect(() => {
    setCursorVariant(type);
  }, [type]);
  useEffect(() => {
    setCursorVariant('default');
  }, [router]);
  const variantsDot: Variants = {
    default: {
      x: mousePositon.x - 8,
      y: mousePositon.y - 8,
    },
    link: {
      zIndex: -1,
      x: mousePositon.x - 8,
      y: mousePositon.y - 8,
      scale: 5,
    },
    none: {
      x: mousePositon.x - 8,
      y: mousePositon.y - 8,
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
        <div className="fixed">
          <motion.div
            className={cn(
              'pointer-events-none absolute z-50  h-4 w-4 rounded-full transition-colors ',
              cursorVariant === 'link' ? 'bg-black dark:bg-white' : 'bg-red-500',
              cursorVariant === 'none' && 'dark:bg-dark bg-white bg-opacity-30'
            )}
            variants={variantsDot}
            animate={cursorVariant}
            transition={{ type: 'spring', stiffness: 500, damping: 28 }}
          />
          <motion.div
            className="pointer-events-none absolute z-[-1]  h-12 w-12 rounded-full bg-red-500 bg-opacity-40 dark:bg-opacity-20"
            variants={variantsRing}
            animate={cursorVariant}
            transition={{ type: 'spring', stiffness: 300, damping: 28, mass: 3 }}
          />
          <motion.div
            className="pointer-events-none absolute z-[-1]  h-12 w-12 rounded-full  bg-blue-500 bg-opacity-30 dark:bg-opacity-10"
            variants={variantsRing}
            animate={cursorVariant}
            transition={{ type: 'spring', stiffness: 500, damping: 20, mass: 3.2 }}
          />
          <motion.div
            className="pointer-events-none absolute z-[-1]  h-12 w-12 rounded-full  bg-yellow-500 bg-opacity-20 dark:bg-opacity-10"
            variants={variantsRing}
            animate={cursorVariant}
            transition={{ type: 'spring', stiffness: 200, damping: 16, mass: 3.4 }}
          />
        </div>
      )}
    </>
  );
};

export default CustomCursor;
