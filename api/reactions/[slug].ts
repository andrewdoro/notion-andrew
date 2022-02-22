import { doc, getDoc, setDoc } from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';
import { Reaction } from 'types';
import { reactionsCol } from '../../lib/firebase';

type NextApiRequestWithSlug = NextApiRequest & {
  query: {
    slug: string;
    type: string;
    user: string;
  };
};

export const types = [
  {
    name: 'Sparkles',
    emoji: '✨',
    value: 0,
  },
  {
    name: 'Love',
    emoji: '❤️',
    value: 0,
  },
  {
    name: 'Like',
    emoji: '👍',
    value: 0,
  },
  {
    name: 'Dislike',
    emoji: '👎',
    value: 0,
  },
];

export default async (req: NextApiRequestWithSlug, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const document = await getDoc(doc(reactionsCol, req.query.slug));
    let reactions, users;
    reactions = document.data()?.reactions;
    users = document.data()?.users;
    if (reactions === undefined) {
      reactions = types;
      await setDoc(doc(reactionsCol, req.query.slug), {
        reactions: types,
        users: [],
      });
    }
    return res.status(200).json({
      reactions,
      users,
    });
  }

  if (req.method === 'POST') {
    const { type, slug, user } = req.query;
    if (user === undefined) return res.status(500).json({ error: 'user undefined' });
    const document = await getDoc(doc(reactionsCol, slug));
    let reactions = document.data()?.reactions as Reaction[];
    let users = document.data()?.users || [];

    if (reactions === undefined) reactions = types;
    const check = users.find((u) => u.id === user);

    if (check === undefined) {
      users.push({ id: user, reaction: type });
      const r = reactions.find((r) => r.name === type) as Reaction;
      r.value++;
    } else {
      const r = reactions.find((r) => r.name === check.reaction) as Reaction;
      r.value--;
      users = users.filter((u) => u.id !== user);
      if (check.reaction !== type) {
        users.push({ id: user, reaction: type });
        const r = reactions.find((r) => r.name === type) as Reaction;
        r.value++;
      }
    }

    await setDoc(doc(reactionsCol, slug), { reactions, users });
    return res.status(200).json({
      reactions: 1,
    });
  }
};
