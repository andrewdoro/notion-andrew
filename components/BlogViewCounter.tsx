import { useEffect } from 'react';
import useSWR from 'swr';

async function fetcher(arg: any, ...args: any) {
  const res = await fetch(arg, ...args);
  return res.json();
}

export default function BlogViewCounter({
  slug,
  register = false,
}: {
  slug: string;
  register: boolean;
}) {
  const { data } = useSWR(`/api/views/${slug}`, fetcher);
  const views = new Number(data?.total);
  useEffect(() => {
    const registerView = () => {
      fetch(`/api/views/${slug}`, {
        method: 'POST',
      });
    };
    if (register) registerView();
  }, [slug, register]);
  return (
    <div className="relative flex items-center gap-2">
      <svg
        className="h-6 w-6"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
        <path
          fillRule="evenodd"
          d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
          clipRule="evenodd"
        />
      </svg>
      {views > 0 ? (
        <p className="tracking-wide">{views.toLocaleString()} views</p>
      ) : (
        <>
          <div className="absolute left-0 h-6 w-6 animate-ping rounded-full bg-red-500" />
          <div className=" h-4 w-16 animate-pulse rounded-full bg-red-500 bg-opacity-30"></div>
        </>
      )}
    </div>
  );
}
