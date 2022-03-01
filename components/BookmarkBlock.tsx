import React from 'react';
import useSWR from 'swr';
import { Metadata } from 'unfurl.js/dist/types';
const previewFetcher = (url: string) =>
  fetch(`/api/bookmark/${encodeURIComponent(url)}`).then((res) => res.json());

const BookmarkBlock = ({ url }: { url: string }) => {
  const { data, error } = useSWR<Metadata>(url, previewFetcher);
  return (
    <div className="mb-4">
      {error ? (
        <div className="flex h-16 w-full flex-col items-center justify-center rounded-lg bg-red-500 bg-opacity-30 p-2">
          <p className="font-semibold tracking-wide">Error loading bookmark.</p>
          <p className="w-full text-center text-sm line-clamp-1">{url}</p>
        </div>
      ) : (
        <a
          className="group flex h-32 w-full overflow-hidden rounded-lg border-2 border-zinc-900 border-opacity-10 dark:border-zinc-50 dark:border-opacity-10"
          href={url}>
          <div className="w-full flex-1 bg-zinc-50 p-4  transition-all group-hover:bg-zinc-200 dark:bg-zinc-900 dark:group-hover:bg-zinc-800  ">
            {data === undefined ? (
              <div className="h-6 w-full animate-pulse bg-zinc-200 dark:bg-zinc-700"></div>
            ) : (
              <p className="text-md font-semibold line-clamp-1">{data?.title}</p>
            )}
            {data === undefined ? (
              <div className="mt-1 h-8 w-full animate-pulse bg-zinc-200 dark:bg-zinc-700"></div>
            ) : (
              <p className="mt-1 text-sm font-thin text-gray-600 line-clamp-2 dark:text-gray-300">
                {data?.description}
              </p>
            )}

            <div className="relative mt-2 flex items-center gap-2 ">
              {data === undefined ? (
                <div className="h-4 w-4 animate-pulse bg-zinc-200 dark:bg-zinc-700"></div>
              ) : (
                <img src={data?.favicon} className="h-4 w-4" alt="Bookmark Favicon" />
              )}
              <p className="flex-1 text-sm text-black line-clamp-1 dark:text-white">{url}</p>
            </div>
          </div>
          <div className="relative hidden h-full w-1/3 md:block">
            {data?.open_graph.images !== undefined ? (
              <img
                className="h-full w-full rounded-r-lg object-cover"
                src={data?.open_graph?.images[0]?.url}
                alt="Bookmark Image"
              />
            ) : (
              <div className="hidden h-32 w-full animate-pulse rounded-r-lg bg-zinc-700 bg-opacity-10 dark:bg-zinc-200  dark:bg-opacity-10 md:block"></div>
            )}
          </div>
        </a>
      )}
    </div>
  );
};

export default BookmarkBlock;
