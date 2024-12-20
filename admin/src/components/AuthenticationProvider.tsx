import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  ReactNode,
} from "react";

interface User {
  name: string;
  email: string;
  image: string;
}

interface Session {
  user: User | null;
}

interface AuthContextType {
  session: Session | null;
  logIn: () => void;
  signOut: (p: { redirect: boolean }) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthenticationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [session, setSession] = useState<Session | null>(null);

  const logIn = () => {
    setSession({
      user: {
        name: "Jay Rathod",
        email: "jayrathod@raimptech.com",
        image:
          "https://www.technofino.in/community/data/avatars/m/18/18232.jpg?1722456634",
      },
    });
  };

  const signOut = () => {
    setSession(null);
  };

  const value = useMemo(() => ({ session, logIn, signOut }), [session]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthentication = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuthentication must be used within an AuthenticationProvider",
    );
  }
  return context;
};
