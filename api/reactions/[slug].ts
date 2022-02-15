import { doc, getDoc, setDoc } from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';
import { Reaction } from 'types';
import { reactionsCol } from '../../lib/firebase';

type NextApiRequestWithSlug = NextApiRequest & {
  query: {
    slug: string;
    react: string;
    user: string;
  };
};

export const types = [
  {
    name: 'Like',
    emoji: '👍',
    value: 0,
    users: [],
  },
  {
    name: 'love',
    emoji: '❤️',
    value: 0,
    users: [],
  },
  {
    name: 'Clap',
    emoji: '👏',
    value: 0,
    users: [],
  },
  {
    name: 'Party',
    emoji: '🎉',
    value: 0,
    users: [],
  },
];

export default async (req: NextApiRequestWithSlug, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const document = await getDoc(doc(reactionsCol, req.query.slug));
    let reactions;
    reactions = document.data()?.reactions;
    if (reactions === undefined) {
      reactions = types;
      await setDoc(doc(reactionsCol, req.query.slug), {
        reactions: types,
      });
    }
    return res.status(200).json({
      reactions,
    });
  }

  if (req.method === 'POST') {
    const { type, slug, user } = req.query;
    const document = await getDoc(doc(reactionsCol, slug));
    let reactions = document.data()?.reactions as Reaction[];
    if (reactions === undefined) reactions = types;
    reactions.map((react) => {
      if (react.name === type) {
        const isLiked = react.users.find((us) => us === user);
        if (isLiked) {
          react.value--;
          react.users = react.users.filter((us) => us !== user);
        } else {
          react.value++;
          react.users.push(user);
        }
      }
    });

    await setDoc(doc(reactionsCol, slug), { reactions });
    return res.status(200).json({
      reactions: 1,
    });
  }
};
