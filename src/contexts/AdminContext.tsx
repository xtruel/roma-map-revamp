import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AdminUser {
  email: string;
  name: string;
  avatar: string;
}

interface AdminContextType {
  isAuthenticated: boolean;
  user: AdminUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Demo admin credentials
const DEMO_ADMINS = [
  { email: "admin@ovunqueromanisti.it", password: "roma1927", name: "Admin Roma", avatar: "https://ui-avatars.com/api/?name=Admin+Roma&background=8B0000&color=FFD700" },
];

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("admin_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const admin = DEMO_ADMINS.find(a => a.email === email && a.password === password);
    if (admin) {
      const userData = { email: admin.email, name: admin.name, avatar: admin.avatar };
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem("admin_user", JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("admin_user");
  };

  return (
    <AdminContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within AdminProvider");
  }
  return context;
};
