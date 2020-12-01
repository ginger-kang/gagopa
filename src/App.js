import React, { createContext } from 'react';
import { GlobalStyle } from './global-styles';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import Router from './Router';
import { useDarkMode } from './hooks/useDarkMode';
import { lightTheme, darkTheme } from './theme';
import Navigation from './components/Navigation';

Amplify.configure(awsconfig);

export const ThemeContext = createContext({
  theme: darkTheme,
  setTheme: () => {},
});

const App = () => {
  const [theme, toggleTheme] = useDarkMode();

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <React.Fragment>
        <GlobalStyle theme={theme === lightTheme ? lightTheme : darkTheme} />
        <Navigation />
        <Router />
      </React.Fragment>
    </ThemeContext.Provider>
  );
};

export default App;
