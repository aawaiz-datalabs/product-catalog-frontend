// UserContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  email: string;
  username: string;
  firstname?: string;
  lastname?: string;
  number?: string;
  city?: string;
  state?: string;
  country?: string;
  userType?: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
