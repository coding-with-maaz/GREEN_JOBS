import React, { createContext, useContext, useState, useEffect } from "react";
import { 
  User, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { toast } from "sonner";

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
      await signInWithPopup(auth, googleProvider);
      toast.success("Successfully signed in with Google");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to sign in with Google";
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Successfully logged in");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to login";
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string) => {
    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Registration successful");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to register";
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      toast.success("Successfully logged out");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to logout";
      toast.error(errorMessage);
      throw error;
    }
  };

  const value = {
    currentUser,
    loading,
    signInWithGoogle,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
