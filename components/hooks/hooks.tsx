import { useEffect, useState } from 'react';
import { Reaction, User } from 'types';

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => {
      setMatches(media.matches);
    };
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
}
export async function AddReaction(
  data: { reactions: Reaction[]; users: User[] },
  user: string,
  name: string
) {
  if (data === undefined) return;
  const reactions = data?.reactions;
  let users = data?.users;
  const check = users.find((u) => u.id === user);

  if (check !== undefined) {
    users = users.filter((u) => u.id !== user);
    const r = reactions.find((re) => re.name === check.reaction) as Reaction;
    r.value -= 1;
    if (check.reaction !== name) {
      users.push({ id: user, reaction: name });
      const r = reactions.find((re) => re.name === name) as Reaction;
      r.value += 1;
    }
  } else {
    users.push({ id: user, reaction: name });
    const r = reactions.find((re) => re.name === name) as Reaction;
    r.value += 1;
  }
  return { reactions, users: [...users] };
}
