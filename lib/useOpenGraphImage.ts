import { useRouter } from 'next/router';

export const getAbsoluteURL = (path: string) => {
  const baseURL = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : 'http://localhost:3000';
  return baseURL + path;
};
export default function useOpenGraphImage() {
  const router = useRouter();
  const searchParams = new URLSearchParams();
  // The [slug] from /posts/[slug] and /posts/open-graph/[slug]
  // should be identical.
  searchParams.set('path', router.asPath.replace('/blog/', '/blog/open-graph/'));
  // Open Graph & Twitter images need a full URL including domain
  const fullImageURL = getAbsoluteURL(`/api/og-image?${searchParams}`);
  return { imageURL: fullImageURL };
}
