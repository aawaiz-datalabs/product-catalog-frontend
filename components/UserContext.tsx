"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { User as SupabaseUser } from "@supabase/supabase-js";

// Supabase client initialization
const supabase = createClientComponentClient();

interface User {
  id: string;
  email: string;
  user_name: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  city?: string;
  state?: string;
  country?: string;
  userType?: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
}

// Create UserContext
const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch the user from Supabase when the component mounts
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) {
          throw sessionError;
        }

        if (session) {
          const { user: supabaseUser } = session;
          await updateUserState(supabaseUser);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          await updateUserState(session.user);
        } else {
          setUser(null);
        }
        setLoading(false);
      },
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const updateUserState = async (supabaseUser: SupabaseUser) => {
    try {
      const { data, error: userDataError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", supabaseUser.id)
        .single();

      if (userDataError) {
        throw userDataError;
      }

      if (data) {
        setUser({
          id: supabaseUser.id,
          email: supabaseUser.email!,
          ...data,
        });
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      setUser(null);
    }
  };

  const contextValue: UserContextType = {
    user,
    setUser,
    loading,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
