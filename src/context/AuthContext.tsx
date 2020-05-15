import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface AuthState {
  token: string;
  user: object;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: object;
  signIn(credentials: SignInCredentials): Promise<void>;
}


const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {

  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@GoBarbe:token');
    const user = localStorage.getItem('@GoBarbe:user');

    if (token && user) {
      return {
        token,
        user: JSON.parse(user),
      }
    } else {
      return {} as AuthState;
    }
  });

  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem('@GoBarbe:token', token);
    localStorage.setItem('@GoBarbe:user', JSON.stringify(user));

    setData({ token, user });

  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('This component is not an AuthProvider children, so, it can not use useAuth hook.');
  } else {
    return context;
  }
}

export { AuthProvider, useAuth }
