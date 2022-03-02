import { PropertyImage } from 'components/ContentBlocks';
import BlogReactions from 'components/BlogReactions';
import BlogViewCounter from 'components/BlogViewCounter';
import { getAbsoluteURL } from 'lib/useOpenGraphImage';
import { NextSeo } from 'next-seo';
import Image, { ImageLoaderProps } from 'next/image';
import { PropsWithChildren } from 'react';
import { Post } from 'types';
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton } from 'next-share';
import { SiFacebook, SiLinkedin, SiTwitter } from 'react-icons/si';
const imageKitLoader = ({ src, width, quality }: ImageLoaderProps) => {
  if (src[0] === '/') src = src.slice(1);
  const params = [`w-${width}`];
  if (quality) {
    params.push(`q-${quality}`);
  }
  const paramsString = params.join(',');
  let urlEndpoint = src;
  if (urlEndpoint[urlEndpoint.length - 1] === '/')
    urlEndpoint = urlEndpoint.substring(0, urlEndpoint.length - 1);
  return `${urlEndpoint}/?tr=${paramsString}`;
};
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
      <article className="mx-auto mt-24 flex max-w-5xl flex-col pb-12 lg:flex-row lg:gap-8 lg:px-4">
        <div className="mx-auto w-full min-w-0 max-w-2xl ">
          <div className="flex flex-col items-center px-4 lg:px-0">
            <h1 className="text-center text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
              {Post.title[0].plain_text}
            </h1>
            <div className="mb-4 flex items-center gap-5 py-4 ">
              <span className="text-gray-700 dark:text-gray-300">
                {new Date(date.date?.start as string).toLocaleString('en-US', {
                  month: 'long',
                  day: '2-digit',
                  year: 'numeric',
                })}
              </span>
              <BlogViewCounter slug={Slug.rich_text[0].plain_text} register={true} />
            </div>

            <div className="relative mb-6 h-[40vh] w-full md:h-[50vh] ">
              <Image
                layout="fill"
                src={imageSrc}
                objectFit="cover"
                placeholder="blur"
                priority
                loader={imageKitLoader}
                blurDataURL={imageSrc + '?tr=n-blur_thumbnail'}
                className="rounded-xl"
                alt={Post.title[0].plain_text}
              />
            </div>
          </div>

          {children}
        </div>
        <div className="mx-auto flex w-full max-w-2xl flex-col px-4 lg:-mt-24 lg:w-1/4 lg:px-0">
          <div className="sticky top-0 flex flex-col justify-center lg:h-screen">
            <BlogReactions />
            <div className="mt-12 flex flex-col">
              <h1 className="mb-6 text-center font-medium uppercase tracking-widest">Share Post</h1>

              <div className="flex justify-center gap-6">
                <TwitterShareButton
                  url={`https://${process.env.NEXT_PUBLIC_VERCEL_URL}/blog/${Slug.rich_text[0].plain_text}`}>
                  <SiTwitter className="text-3xl opacity-30 transition-opacity hover:opacity-100" />
                </TwitterShareButton>
                <FacebookShareButton
                  url={`https://${process.env.NEXT_PUBLIC_VERCEL_URL}/blog/${Slug.rich_text[0].plain_text}`}
                  quote={Description.rich_text[0].plain_text}
                  hashtag={'#webdev'}>
                  <SiFacebook className="text-3xl opacity-30 transition-opacity hover:opacity-100" />
                </FacebookShareButton>
                <LinkedinShareButton
                  url={`https://${process.env.NEXT_PUBLIC_VERCEL_URL}/blog/${Slug.rich_text[0].plain_text}`}>
                  <SiLinkedin className="text-3xl opacity-30 transition-opacity hover:opacity-100" />
                </LinkedinShareButton>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
