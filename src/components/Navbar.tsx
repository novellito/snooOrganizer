import styled from 'styled-components';
import { PRIMARY, SECONDARY, SUCCESS, DANGER } from '../constants/colors';
import Link from 'next/link';

const NavbarWrapper = styled.nav`
  height: 50px;
  background-color: #4d4d4d;
  position: relative;
  display: flex;
  align-items: center;

  .nav-title {
    font-size: 1.4em;
    color: #fff;
    padding: 10px;
    &:hover {
      cursor: pointer;
    }
  }

  .nav-links {
    margin-left: auto;
    font-size: 1.2em;
  }

  .nav-links > span {
    padding: 12px 10px;
    color: #efefef;
    &:hover {
      cursor: pointer;
      background-color: rgba(0, 0, 0, 0.3);
    }
  }
`;

interface NavbarProps {
  login: () => void;
}

export const Navbar: React.FC<NavbarProps> = (props) => {
  return (
    <NavbarWrapper>
      <Link href="/">
        <span className="nav-title">SnooOrganizer</span>
      </Link>

      <div className="nav-links">
        <span onClick={() => props.login()}>Sign In</span>
      </div>
    </NavbarWrapper>
  );
};

export default Navbar;
