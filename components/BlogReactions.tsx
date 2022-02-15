import { useRouter } from 'next/router';
import useSWR, { useSWRConfig } from 'swr';
import { Reaction } from 'types';
import { useAuth } from 'components/context/auth';
import cn from 'classnames';
import { types } from 'api/reactions/[slug]';

async function fetcher(arg: any, ...args: any) {
  const res = await fetch(arg, ...args);
  return res.json();
}

const Reaction = ({ reaction, slug }: { reaction: Reaction; slug: string }) => {
  const { mutate } = useSWRConfig();
  const { user, login } = useAuth();
  const isLiked = reaction.users.find((us) => us === user?.uid);
  const handleAction = async () => {
    if (user === null) await login();
    if (user === undefined) return;
    await fetch(`/api/reactions/${slug}?type=${reaction.name}&user=${user?.uid}`, {
      method: 'POST',
    });
    mutate(`/api/reactions/${slug}`);
  };
  return (
    <button
      onClick={handleAction}
      className={cn(
        'flex h-32 w-full flex-col items-center justify-center rounded-lg ',
        isLiked
          ? 'bg-zinc-100 outline outline-yellow-500 dark:bg-zinc-700 dark:outline-yellow-200'
          : '  bg-zinc-100 dark:bg-zinc-900'
      )}>
      <div className="text-4xl">{reaction.emoji}</div>
      <p className="text-lg font-bold">{reaction.value}</p>
      <p className="uppercase">{reaction.name}</p>
    </button>
  );
};

export default function BlogReactions() {
  const router = useRouter();

  const { data } = useSWR(`/api/reactions/${router.query.slug}`, fetcher);
  let reactions = data?.reactions as Reaction[];
  if (reactions === undefined) reactions = types;
  return (
    <div className="px-4 lg:w-1/4">
      <div className="sticky top-12 flex flex-col gap-4 ">
        <p className="text-center text-xl font-semibold tracking-tight text-black dark:text-white md:text-2xl">
          Article Reactions
        </p>
        <div className=" grid grid-cols-4 gap-3 lg:grid-cols-2 lg:grid-rows-2">
          {reactions?.map((react) => (
            <Reaction reaction={react} key={react.name} slug={router.query.slug as string} />
          ))}
        </div>
      </div>
    </div>
  );
}
