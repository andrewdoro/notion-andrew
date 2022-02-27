import React from 'react';
import useSWR from 'swr';
const previewFetcher = (url: string) =>
  fetch(`/api/bookmark/${encodeURIComponent(url)}`).then((res) => res.json());
const BookmarkBlock = ({ url }: { url: string }) => {
  const { data, error } = useSWR(url, previewFetcher);

  return <div></div>;
};

export default BookmarkBlock;
