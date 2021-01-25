import React from 'react';
import styled from 'styled-components';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const ThemeTogglerWrapper = styled.div`
  .themeToggler {
    position: fixed;
    left: 0;
    bottom: 5%;
    height: 50px;
    z-index: 1000;
    cursor: pointer;
    animation: fadeIn 0.3s;
    transition: opacity 0.4s;
    opacity: 0.5;
    outline: none;
  }

  .themeToggler:hover {
    opacity: 1;
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 0.5;
    }
  }
`;

export const ThemeToggler: React.FC<any> = ({ toggleTheme, theme }) => {
  return (
    <ThemeTogglerWrapper>
      <FontAwesomeIcon
        className="themeToggler"
        onClick={toggleTheme}
        size="7x"
        color={theme === 'light' ? 'black' : 'white'}
        icon={theme === 'light' ? faMoon : faSun}
      />
    </ThemeTogglerWrapper>
  );
};

export default ThemeToggler;
