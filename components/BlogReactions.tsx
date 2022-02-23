import { useRouter } from 'next/router';
import useSWR, { useSWRConfig } from 'swr';
import { Reaction, User } from 'types';
import { useAuth } from 'components/context/auth';
import cn from 'classnames';
import { types } from 'api/reactions/[slug]';
import { useEffect, useState } from 'react';
import { AddReaction } from './hooks/hooks';
import { AnimatePresence, motion } from 'framer-motion';

async function fetcher(arg: any, ...args: any) {
  const res = await fetch(arg, ...args);
  return res.json();
}

const Reaction = ({
  reaction,
  slug,
  users,
  loading,
}: {
  reaction: Reaction;
  slug: string;
  users: User[];
  loading: boolean;
}) => {
  const { user, login } = useAuth();
  const [liked, setLiked] = useState(false);
  const { mutate } = useSWRConfig();

  const handleAction = async () => {
    if (user === null || user === undefined) return login();
    if (loading) return;
    mutate(
      `/api/reactions/${slug}`,
      async (data: { reactions: Reaction[]; users: User[] }) =>
        AddReaction(data, user.uid, reaction.name),
      false
    );
    await fetch(`/api/reactions/${slug}?type=${reaction.name}&user=${user?.uid}`, {
      method: 'POST',
    });
    mutate(`/api/reactions/${slug}`);
  };
  useEffect(() => {
    const u = users?.find((u) => u.id === user?.uid);
    setLiked(u?.reaction === reaction.name);
  }, [users, reaction.name, user]);

  return (
    <button
      onClick={handleAction}
      className="group relative flex h-16 w-full items-center gap-2 rounded-full
      bg-zinc-100 bg-opacity-30 p-2 dark:bg-zinc-900 dark:bg-opacity-70 ">
      <div
        className={cn(
          liked ? 'grayscale-0' : 'grayscale',
          'z-20 text-2xl group-hover:grayscale-0 md:text-4xl'
        )}>
        {reaction.emoji}
      </div>
      <AnimatePresence exitBeforeEnter>
        {liked && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={cn(
              'absolute left-0 z-10 h-full w-full rounded-full border-4  border-opacity-50',
              reaction.name === 'Love' && 'border-red-500 bg-red-500 bg-opacity-30',
              reaction.name === 'Sparkles' && 'border-yellow-500 bg-yellow-500 bg-opacity-30',
              reaction.name === 'Like' && 'border-green-500 bg-green-500 bg-opacity-30',
              reaction.name === 'Dislike' && 'border-indigo-500 bg-indigo-500 bg-opacity-30'
            )}
            layoutId="outline-reactions"
          />
        )}
      </AnimatePresence>

      <AnimatePresence exitBeforeEnter>
        {loading ? (
          <motion.div
            exit={{ scale: 4, opacity: 0 }}
            className="h-4 w-4 animate-ping rounded-full bg-white bg-opacity-30"
          />
        ) : (
          <motion.p
            exit={{ opacity: 0, y: -30 }}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ease: 'easeInOut' }}
            className="z-20 text-lg font-semibold"
            key={reaction.value}>
            {reaction.value}
          </motion.p>
        )}
      </AnimatePresence>
    </button>
  );
};

export default function BlogReactions() {
  const router = useRouter();

  const { data } = useSWR(`/api/reactions/${router.query.slug}`, fetcher);
  let reactions = data?.reactions as Reaction[];
  const users = data?.users as User[];
  if (reactions === undefined) reactions = types;
  return (
    <div className="flex flex-col">
      <h1 className="mb-6 text-center font-medium uppercase tracking-widest">Reactions</h1>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-2 ">
        {reactions?.map((react) => (
          <Reaction
            reaction={react}
            users={users}
            key={react.name}
            loading={data === undefined}
            slug={router.query.slug as string}
          />
        ))}
      </div>
    </div>
  );
}
