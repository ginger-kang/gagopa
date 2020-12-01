import React, { useState, useContext, useEffect } from 'react';
import Switch from 'react-switch';
import { ThemeContext } from '../App';
import { lightTheme } from '../theme';

const DarkModeToggle = () => {
  const [checked, setChecked] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    theme === lightTheme ? setChecked(false) : setChecked(true);
  }, [theme]);

  return (
    <Switch
      checked={checked}
      onChange={toggleTheme}
      onColor="#464646"
      offColor="#2388de"
      uncheckedIcon={
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            paddingLeft: '8px',
            fontSize: 16,
          }}
        >
          <span role="img" aria-label="lightSun">
            🌞
          </span>
        </div>
      }
      checkedIcon={
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            fontSize: 16,
          }}
        >
          <span role="img" aria-label="darkMoon">
            🌚
          </span>
        </div>
      }
    />
  );
};

export default DarkModeToggle;
