import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const USER_LOGGED = 'isLoggedIn';
const SESSION_KEY = '1';

interface MeetupContextObj {
  isLoggedIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

const AuthContext = React.createContext<MeetupContextObj>({
  isLoggedIn: false,
  onLogin: (): void => {},
  onLogout: (): void => {},
});

export const AuthContextProvider: React.FC = props => {
  const [isLoggedIn, setIsLoggedin] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const getLoggedUser = localStorage.getItem(USER_LOGGED);
    if (getLoggedUser === SESSION_KEY) {
      setIsLoggedin(true);
    }
  }, []);

  const loginHandler = () => {
    //add validation...
    localStorage.setItem(USER_LOGGED, SESSION_KEY);
    setIsLoggedin(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem(USER_LOGGED);
    setIsLoggedin(false);
    router.push('/');
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogin: loginHandler,
        onLogout: logoutHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
