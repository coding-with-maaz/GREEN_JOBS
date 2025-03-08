import { useState, useEffect } from 'react';
import { 
  User,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
import { toast } from 'sonner';

export function useFirebaseAuth() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      toast.success('Successfully signed in with Google');
      return result.user;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to sign in with Google';
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const result = await signInWithEmailAndPassword(auth, email, password);
      toast.success('Successfully logged in');
      return result.user;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to login';
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string) => {
    try {
      setLoading(true);
      const result = await createUserWithEmailAndPassword(auth, email, password);
      toast.success('Registration successful');
      return result.user;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to register';
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      toast.success('Successfully logged out');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to logout';
      toast.error(errorMessage);
      throw error;
    }
  };

  return {
    currentUser,
    loading,
    signInWithGoogle,
    login,
    register,
    logout
  };
}
