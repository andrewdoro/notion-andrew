import { getAuth, onAuthStateChanged, signInAnonymously, User } from 'firebase/auth';
import { FC, createContext, useContext, useState, useEffect } from 'react';
import app from '../../lib/firebase';

interface IAuth {
  user: User | null;
  login: () => void;
}
const auth = getAuth(app);

const AuthContext = createContext<IAuth>({ user: null, login: () => undefined });

const AuthProvider: FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
    return unsubscribe;
  }, []);
  const login = async () => {
    try {
      await signInAnonymously(auth);
    } catch (e) {
      console.error(e);
    }
  };

  return <AuthContext.Provider value={{ user, login }}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);
export { AuthProvider, useAuth };
