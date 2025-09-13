import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("authUser");
      if (!storedUser) {
        setIsReady(true);
        return;
      }

      const parsed = JSON.parse(storedUser);
      const isValid = parsed && typeof parsed === "object" && parsed.username && parsed.token;

      if (isValid) {
        setUser(parsed);
      } else {
        localStorage.removeItem("authUser");
        setUser(null);
      }
    } catch {
      localStorage.removeItem("authUser");
      setUser(null);
    }
    setIsReady(true);
  }, []);

  const login = (username, token) => {
    const userData = { username, token };
    localStorage.setItem("authUser", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("authUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isReady }}>
      {children}
    </AuthContext.Provider>
  );
};
