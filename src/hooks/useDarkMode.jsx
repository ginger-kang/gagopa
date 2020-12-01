import { useEffect, useState } from 'react';
import { lightTheme, darkTheme } from '../theme';

export const useDarkMode = () => {
  const [theme, setTheme] = useState(lightTheme);

  const setMode = (mode) => {
    mode === lightTheme
      ? window.localStorage.setItem('theme', 'light')
      : window.localStorage.setItem('theme', 'dark');
    setTheme(mode);
  };

  const toggleTheme = () => {
    theme === lightTheme ? setMode(darkTheme) : setMode(lightTheme);
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    //console.log(localTheme);
    if (localTheme !== null) {
      if (localTheme === 'dark') {
        setTheme(darkTheme);
      } else {
        setTheme(lightTheme);
      }
    }
  }, []);

  return [theme, toggleTheme];
};
