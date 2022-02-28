import type { NextApiRequest, NextApiResponse } from 'next';
import { unfurl } from 'unfurl.js';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Awaited<ReturnType<typeof unfurl>>>
) {
  const { url } = req.query;
  const linkPreview = await unfurl(url as string, {
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36',
  });

  res.status(200).json(linkPreview);
}
