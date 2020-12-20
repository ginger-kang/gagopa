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
      handleDiameter={22}
      width={50}
      height={24}
      uncheckedIcon={
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            fontSize: 15,
            paddingLeft: '2px',
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
            paddingLeft: '6px',
            fontSize: 15,
          }}
        >
          <span role="img" aria-label="darkMoon">
            🌝
          </span>
        </div>
      }
    />
  );
};

export default DarkModeToggle;
