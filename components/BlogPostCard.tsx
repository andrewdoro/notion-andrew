import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Post } from 'types';
import BlogViewCounter from './BlogViewCounter';
import { PropertyImage } from './ContentBlocks';
import cn from 'classnames';

const BlogPostCard = ({ post }: { post: Post }) => {
  const {
    properties: { Post, Description, Slug, Cover, Type },
    color,
  } = post;
  return (
    <Link href={`/blog/${Slug.rich_text[0].plain_text}`} passHref>
      <a
        className="relative flex flex-col-reverse overflow-hidden rounded-lg outline 
          outline-2 lg:flex-row"
        style={{ outlineColor: `rgb(${color.join(', ')})` }}>
        <motion.div
          className="absolute z-20 h-full w-full bg-red-500"
          style={{ backgroundColor: `rgb(${color.join(', ')})` }}
          initial={{ opacity: 0 }}
          whileHover={{
            opacity: 0.3,
          }}
        />
        <div className="flex flex-col gap-2 bg-zinc-50 p-4 dark:bg-zinc-900 sm:h-52  lg:h-60 lg:w-1/2  ">
          <h3 className="text-xl font-semibold ">{Post.title[0].plain_text}</h3>
          <p className="text-sm text-gray-700 line-clamp-4 dark:text-gray-300">
            {Description.rich_text[0].plain_text}
          </p>
          <div className="mt-auto flex items-center pt-4">
            <div className="text-md md:text-base">
              <BlogViewCounter slug={Slug.rich_text[0].plain_text} register={false} />
            </div>
            <p
              className={cn(
                Type.select?.name === 'Project'
                  ? 'bg-blue-200 dark:bg-blue-900'
                  : 'bg-red-200 dark:bg-red-900',
                'absolute right-0 z-10 mr-3 rounded-full bg-opacity-50 px-6 py-2  tracking-widest backdrop-blur-lg  dark:bg-opacity-30'
              )}>
              {Type.select?.name}
            </p>
          </div>
        </div>

        <div className="relative h-64 lg:h-60 lg:w-1/2 ">
          <Image layout="fill" src={PropertyImage(Cover)} alt="Project cover" objectFit="cover" />
        </div>
      </a>
    </Link>
  );
};

export default BlogPostCard;
