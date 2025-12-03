import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
  phone?: string;
  city?: string;
}

interface UserContextType {
  isAuthenticated: boolean;
  user: User | null;
  loginWithGoogle: () => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Simulated Google accounts for demo
const GOOGLE_ACCOUNTS = [
  { id: "1", email: "mario.rossi@gmail.com", name: "Mario Rossi" },
  { id: "2", email: "luca.bianchi@gmail.com", name: "Luca Bianchi" },
  { id: "3", email: "giulia.verdi@gmail.com", name: "Giulia Verdi" },
];

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("roma_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const loginWithGoogle = async (): Promise<boolean> => {
    // Simulate Google OAuth - pick random account
    const account = GOOGLE_ACCOUNTS[Math.floor(Math.random() * GOOGLE_ACCOUNTS.length)];
    
    const userData: User = {
      id: account.id,
      email: account.email,
      name: account.name,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(account.name)}&background=8B0000&color=FFD700&size=200`,
    };
    
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("roma_user", JSON.stringify(userData));
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("roma_user");
  };

  const updateProfile = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem("roma_user", JSON.stringify(updatedUser));
    }
  };

  return (
    <UserContext.Provider value={{ isAuthenticated, user, loginWithGoogle, logout, updateProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
};
