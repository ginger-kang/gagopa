import React, { createContext, useState, useEffect } from 'react';
import { GlobalStyle } from './global-styles';
import Router from './Router';
import { useDarkMode } from './hooks/useDarkMode';
import { lightTheme, darkTheme } from './theme';
import { Auth } from 'aws-amplify';
import { getCurrentUserInfo } from './components/CreateUser';
import { getUserById } from './components/UserQueries';

export const ThemeContext = createContext({
  theme: darkTheme,
  setTheme: () => {},
});

export const UserContext = createContext();
export const CognitoContext = createContext();

const App = () => {
  const [theme, setLightTheme, setDarkTheme] = useDarkMode();
  const [userObj, setUserObj] = useState(null);
  const [init, setInit] = useState(false);
  const [cognitoUser, setCognitoUser] = useState(null);

  useEffect(() => {
    try {
      Auth.currentUserInfo().then(async (user) => {
        if (user) {
          setUserObj(user);
          getCurrentUserInfo();
          const data = await getUserById(user.attributes.sub);
          setCognitoUser(data);
          if (!data) {
            window.location.reload();
          }
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
    <ThemeContext.Provider value={{ theme, setLightTheme, setDarkTheme }}>
      <UserContext.Provider value={{ userObj, refreshUser }}>
        <CognitoContext.Provider value={{ cognitoUser }}>
          <React.Fragment>
            <GlobalStyle
              theme={theme === lightTheme ? lightTheme : darkTheme}
            />
            {init && <Router />}
          </React.Fragment>
        </CognitoContext.Provider>
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
};

export default App;
