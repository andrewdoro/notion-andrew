import Link from 'next/link';
import Image from 'next/image';
import { Post } from '../types';
import cn from 'classnames';
import { PropertyImage } from './ContentBlocks';
import { motion, Variants } from 'framer-motion';
import { useMediaQuery } from './hooks/hooks';

const imageVariant: Variants = {
  hover: { scale: 1.1, transition: { ease: 'easeInOut' } },
};
const textVariant: Variants = {
  default: { transition: { ease: 'easeInOut' }, opacity: 0, y: 50 },
  hover: { transition: { ease: 'easeInOut' }, opacity: 1, y: 0 },
};

const PostCard = ({ post, last }: { post: Post; last: boolean }) => {
  const {
    properties: { Slug, Post, Cover, Date: date },
    color,
  } = post;
  const imageSrc = PropertyImage(Cover);
  const isLarge = useMediaQuery('(max-width: 1024px)');

  return (
    <Link key={post.id} href={`/blog/${Slug.rich_text[0].plain_text}`} passHref>
      <motion.a
        whileHover="hover"
        initial="default"
        animate="default"
        className={cn('relative h-full w-full overflow-hidden', last && 'col-span-2 ')}>
        <motion.div
          className="relative h-full w-full "
          variants={imageVariant}
          transition={{ ease: 'easeInOut' }}>
          <motion.div
            className="absolute z-10 h-full w-full opacity-0 "
            style={{ background: `rgba(${color.join(', ')},0.3)` }}
            whileHover={{ opacity: 1 }}
            animate={isLarge ? { opacity: 1 } : { opacity: 0 }}
            transition={{ ease: 'easeInOut' }}
          />
          <Image
            src={imageSrc}
            alt={Post.title[0].plain_text}
            layout="fill"
            priority
            sizes={last ? '100vw' : '50vw'}
            objectFit="cover"
          />
        </motion.div>

        <div
          className=" pointer-events-none absolute bottom-0 left-0 z-10
          flex h-full w-full flex-col justify-end p-4"
          style={{
            background: `linear-gradient(to top right,
               rgba(${color.join(', ')},0.5), rgba(0,0,0,0))`,
          }}>
          <motion.h2
            variants={textVariant}
            animate={isLarge ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            className="w-full text-base font-medium tracking-wide text-gray-100 md:text-xl ">
            {Post.title[0].plain_text}
          </motion.h2>
          <motion.p
            variants={textVariant}
            animate={isLarge ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            className="mt-2 text-sm tracking-tight text-gray-200">
            {new Date(date.date?.start as string).toLocaleString('en-US', {
              month: 'long',
              day: '2-digit',
              year: 'numeric',
            })}
          </motion.p>
        </div>
      </motion.a>
    </Link>
  );
};

export default PostCard;
