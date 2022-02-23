import { getNotionData } from 'lib/getNotionData';

import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';

import { Vibrant } from 'components/Vibrant';

import { Post, ProjectsPage, PropertyValueFiles } from 'types';
import { AnimatePresence, motion } from 'framer-motion';
import cn from 'classnames';
import { useContext, useEffect, useState } from 'react';
import { CustomCursorContext } from 'components/context/cursor';
import BlogPostCard from 'components/BlogPostCard';
const Button = ({
  name,
  color,
  isSelected,
  setState,
}: {
  name: string;
  color: string;
  isSelected: boolean;
  setState: (active: string) => void;
}) => {
  const { setType } = useContext(CustomCursorContext);
  return (
    <button
      className={cn('relative bg-opacity-30 p-4 ')}
      onClick={() => {
        setState(name);
        sessionStorage.setItem('projects_filter', name);
      }}
      onMouseEnter={() => setType('none')}
      onMouseLeave={() => setType('default')}>
      <p
        className={cn(
          'relative z-20 font-semibold tracking-widest transition-colors',
          !isSelected ? 'text-black dark:text-white' : 'text-white '
        )}>
        {name}
      </p>
      {isSelected && (
        <motion.div
          className={cn('absolute top-0 left-0 z-10 h-full w-full bg-opacity-80', color)}
          layoutId="outline"></motion.div>
      )}
    </button>
  );
};

const Projects: ProjectsPage = ({ posts }) => {
  const [selected, setSelected] = useState('All');
  const [filtered, setFiltered] = useState(posts);
  useEffect(() => {
    const option = sessionStorage.getItem('projects_filter') as string;
    option !== null && setSelected(option);
  }, []);
  useEffect(() => {
    if (selected === 'All') setFiltered(posts);
    else setFiltered(posts.filter((post) => post.properties.Type.select?.name === selected));
  }, [selected, posts]);
  return (
    <>
      <NextSeo
        title="Blog - Andrew Dorobantu"
        description="Thoughts on the software industry, programming, tech, politics, society, and my personal life."
        canonical={`https://${process.env.NEXT_PUBLIC_VERCEL_URL}/blog`}
      />

      <div className="mx-auto mt-24 flex w-full max-w-6xl flex-col px-4 pb-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <h1 className="text-3xl font-bold tracking-tighter text-black dark:text-white md:text-5xl">
            Blog
          </h1>
          <div
            className="mr-auto flex overflow-hidden rounded-full bg-zinc-200
           bg-opacity-40 backdrop-blur-lg dark:bg-zinc-900 dark:bg-opacity-40 sm:mr-0 sm:ml-auto">
            <Button
              name="All"
              color="bg-indigo-500"
              isSelected={selected === 'All'}
              setState={setSelected}
            />
            <Button
              name="Project"
              color="bg-blue-500"
              isSelected={selected === 'Project'}
              setState={setSelected}
            />
            <Button
              name="Article"
              color="bg-red-500"
              setState={setSelected}
              isSelected={selected === 'Article'}
            />
          </div>
        </div>
        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          <AnimatePresence>
            {filtered.map((post) => (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}>
                <BlogPostCard post={post} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const database = (await getNotionData(process.env.NOTION_DATABASE_ID as string)) as Post[];
  const postsWithColors = await Promise.all(
    database.map(async (post) => {
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

export default Projects;
