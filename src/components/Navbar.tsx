import styled from 'styled-components';
import { PRIMARY, SECONDARY, SUCCESS, DANGER } from '../constants/colors';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { setUserLoggedOut } from '../store/actions';
import Router from 'next/router';
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
  ul {
    display: flex;
    margin-left: auto;
    list-style: none;
    height: 100%;

    li.nav-item {
      padding: 12px 10px;
      font-size: 1.2em;
      color: #efefef;
      &:hover {
        cursor: pointer;
        background-color: rgba(0, 0, 0, 0.3);
      }
    }
  }
`;

interface NavbarProps {
  login?: () => void;
  logout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = (props) => {
  const isLoggedIn = useSelector(({ login }: any) => login.isLoggedIn);
  const dispatch = useDispatch();

  const handleLogout = () => {
    Router.push('/');
    dispatch(setUserLoggedOut());
  };

  return (
    <NavbarWrapper>
      <Link href="/">
        <span className="nav-title">SnooOrganizer</span>
      </Link>
      <ul>
        <li
          className="nav-item"
          onClick={() => (isLoggedIn ? handleLogout() : props.login())}
        >
          {isLoggedIn ? 'Sign Out' : 'Sign In'}
        </li>
      </ul>
    </NavbarWrapper>
  );
};

export default Navbar;
