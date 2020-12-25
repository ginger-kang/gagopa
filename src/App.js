import React, { createContext, useState, useEffect } from 'react';
import { GlobalStyle } from './global-styles';
import Router from './Router';
import { useDarkMode } from './hooks/useDarkMode';
import { lightTheme, darkTheme } from './theme';
import { Auth } from 'aws-amplify';

export const ThemeContext = createContext({
  theme: darkTheme,
  setTheme: () => {},
});

export const UserContext = createContext();

const App = () => {
  const [theme, toggleTheme] = useDarkMode();
  const [userObj, setUserObj] = useState(null);
  const [init, setInit] = useState(false);

  useEffect(() => {
    try {
      Auth.currentUserInfo().then((user) => {
        if (user) {
          setUserObj(user);
        }
        setInit(true);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const refreshUser = async (sign) => {
    if (sign) {
      const user = await Auth.currentAuthenticatedUser();
      setUserObj(user);
    } else {
      setUserObj(null);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <UserContext.Provider value={{ userObj, refreshUser }}>
        <React.Fragment>
          <GlobalStyle theme={theme === lightTheme ? lightTheme : darkTheme} />
          {init && <Router />}
        </React.Fragment>
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
};

export default App;
