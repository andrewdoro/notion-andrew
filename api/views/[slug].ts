import { doc, getDoc, setDoc } from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';
import { viewsCol } from '../../lib/firebase';

type NextApiRequestWithSlug = NextApiRequest & {
  query: {
    slug: string;
  };
};

export default async (req: NextApiRequestWithSlug, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const document = await getDoc(doc(viewsCol, req.query.slug));
    let views = document.data()?.views;
    if (views === undefined) views = 1;
    await setDoc(doc(viewsCol, req.query.slug), { views: views + 1 });
    return res.status(200).json({
      total: views,
    });
  }
  if (req.method === 'GET') {
    const document = await getDoc(doc(viewsCol, req.query.slug));

    let views = document.data()?.views;
    if (!document.exists()) {
      views = 1;
      await setDoc(doc(viewsCol, req.query.slug), { views: 1 });
    }

    return res.status(200).json({
      total: views,
    });
  }
};
