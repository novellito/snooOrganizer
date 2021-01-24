import React from 'react';
import styled from 'styled-components';
import { SNOO_BLUE } from '../constants/colors';
import { faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons';
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

export const ThemeToggler: React.FC<any> = ({ toggleTheme }) => {
  return (
    <ThemeTogglerWrapper>
      <FontAwesomeIcon
        className="themeToggler"
        onClick={toggleTheme}
        size="7x"
        color={SNOO_BLUE}
        icon={faArrowAltCircleUp}
      />
    </ThemeTogglerWrapper>
  );
};

export default ThemeToggler;
