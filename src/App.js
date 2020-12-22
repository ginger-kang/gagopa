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

const App = () => {
  const [theme, toggleTheme] = useDarkMode();
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    try {
      Auth.currentUserInfo().then((user) => {
        if (user) {
          console.log(user);
          setUserObj(user);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <React.Fragment>
        <GlobalStyle theme={theme === lightTheme ? lightTheme : darkTheme} />
        <Router userObj={userObj} />
      </React.Fragment>
    </ThemeContext.Provider>
  );
};

export default App;
