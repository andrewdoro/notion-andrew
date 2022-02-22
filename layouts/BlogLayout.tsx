import { PropertyImage } from 'components/ContentBlocks';
import BlogReactions from 'components/BlogReactions';
import BlogViewCounter from 'components/BlogViewCounter';
import { getAbsoluteURL } from 'lib/useOpenGraphImage';
import { NextSeo } from 'next-seo';
import Image from 'next/image';
import { PropsWithChildren } from 'react';
import { Post } from 'types';

export default function BlogLayout({
  children,
  page,
  openGraphImage,
}: PropsWithChildren<{
  page: Post;
  openGraphImage: string;
}>) {
  const {
    properties: { Post, Slug, Description, Cover, Date: date },
  } = page;
  const imageSrc = PropertyImage(Cover);
  return (
    <>
      <NextSeo
        title={Post.title[0].plain_text}
        canonical={`https://${process.env.NEXT_PUBLIC_VERCEL_URL}/blog/${Slug.rich_text[0].plain_text}`}
        description={Description.rich_text[0].plain_text}
        openGraph={{
          title: Post.title[0].plain_text,
          type: 'article',
          url: getAbsoluteURL(`/blog/${Slug.rich_text[0].plain_text}`),
          description: Description.rich_text[0].plain_text,
          images: [
            {
              url: openGraphImage,
              width: 1200,
              height: 630,
              alt: Post.title[0].plain_text,
            },
          ],
        }}
      />
      <article className="mx-auto mt-24 flex max-w-6xl flex-col pb-12 lg:flex-row lg:gap-8 lg:px-4">
        <div className="min-w-0 lg:w-3/4">
          <div className=" flex flex-col items-center">
            <h1 className="text-center text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
              {Post.title[0].plain_text}
            </h1>
            <div className="mb-4 flex items-center gap-5 py-4">
              <span className=" text-gray-700 dark:text-gray-300">
                {new Date(date.date?.start as string).toLocaleString('en-US', {
                  month: 'long',
                  day: '2-digit',
                  year: 'numeric',
                })}
              </span>
              <BlogViewCounter slug={Slug.rich_text[0].plain_text} register={true} />
            </div>

            <div className="relative mb-6  h-[50vh] w-full ">
              <Image
                layout="fill"
                src={imageSrc}
                objectFit="cover"
                className="md:rounded-xl"
                alt={Post.title[0].plain_text}
              />
            </div>
          </div>

          {children}
        </div>
        <BlogReactions />
      </article>
    </>
  );
}
