import { GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import PostCard from '../components/PostCard';
import { Vibrant } from '../components/Vibrant';

import { getNotionData } from '../lib/getNotionData';
import { PropertyValueFiles, HomePage, Post } from '../types';
import { useContext } from 'react';
import { CustomCursorContext } from 'components/context/cursor';
import { Logo } from 'components/Icons';

const Home: HomePage = ({ posts }) => {
  const { setType } = useContext(CustomCursorContext);
  return (
    <>
      <div className="mt-8 grid grid-cols-1 gap-6 md:mt-0 md:grid-cols-2">
        <div className="flex h-full flex-col items-center justify-center px-8 text-center ">
          <div className="relative h-36 w-36">
            <Image
              src="/images/avatar.jpg"
              layout="fill"
              alt="Avatar Andrew"
              className="rounded-full"
              objectFit="cover"
            />
          </div>
          <div className="mt-4 flex flex-col">
            <h1 className="max-w-xl text-3xl font-bold tracking-tighter text-black dark:text-white lg:text-4xl xl:text-5xl">
              I am{' '}
              <Link href="/about">
                <a
                  onMouseEnter={() => setType('link')}
                  onMouseLeave={() => setType('default')}
                  className="text-red-500 underline">
                  Andrew
                </a>
              </Link>
              , a front-end developer.
            </h1>
          </div>
          <div className="relative flex flex-col">
            <div className="top-0 left-0 mx-auto mt-4 mb-4 h-8 w-8 fill-red-500 opacity-30">
              <Logo />
            </div>

            <p className="relative mx-auto max-w-lg text-lg tracking-widest text-gray-700 dark:text-gray-400 md:text-xl">
              I love to share my knowledge through code. Check out a few of my most recent{' '}
              <Link href="/blog">
                <a
                  className="text-red-500 underline"
                  onMouseEnter={() => setType('link')}
                  onMouseLeave={() => setType('default')}>
                  publishings
                </a>
              </Link>
            </p>
          </div>
        </div>
        <div className="mt-6 grid h-[50vh] w-full grid-cols-2 grid-rows-2 sm:h-[70vh] md:mt-0 md:h-screen ">
          {posts.map((post, index) => (
            <PostCard key={post.id} post={post} last={index === posts.length - 1} />
          ))}
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const database = (await getNotionData(process.env.NOTION_DATABASE_ID as string)) as Post[];
  const posts = database.slice(0, 3);
  const postsWithColors = await Promise.all(
    posts.map(async (post) => {
      const color = await Vibrant(post?.properties.Cover as PropertyValueFiles);
      return {
        ...post,
        color,
      };
    })
  );
  return {
    props: {
      posts: postsWithColors,
    },
  };
};

export default Home;
