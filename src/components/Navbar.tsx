import styled from 'styled-components';
import { PRIMARY, SECONDARY, SUCCESS, DANGER } from '../constants/colors';

const NavbarWrapper = styled.nav`
  height: 50px;
  width: 100%;
  background-color: #4d4d4d;
  position: relative;

  .nav-header {
    display: inline;

    > .nav-title {
      display: inline-block;
      font-size: 22px;
      color: #fff;
      padding: 10px 10px 10px 10px;
    }
  }

  .nav-btn {
    display: none;
  }

  .nav-links {
    display: inline;
    float: right;
    font-size: 18px;
  }

  .nav-links > a {
    display: inline-block;
    padding: 13px 10px 13px 10px;
    text-decoration: none;
    color: #efefef;
  }

  .nav-links > a:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 600px) {
    .nav-btn {
      display: inline-block;
      position: absolute;
      right: 0px;
      top: 0px;
    }
    .nav-btn > label {
      display: inline-block;
      width: 50px;
      height: 50px;
      padding: 13px;
    }
    .nav-btn > label:hover,
    .nav-btn > label > span {
      display: block;
      width: 25px;
      height: 10px;
      border-top: 2px solid #eee;
    }
    .nav-links {
      position: absolute;
      display: block;
      width: 100%;
      background-color: #333;
      height: 0px;
      transition: all 0.3s ease-in;
      overflow-y: hidden;
      top: 50px;
      left: 0px;
    }
    .nav-links > a {
      display: block;
      width: 100%;
    }
  }
`;

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = (props) => {
  return (
    <NavbarWrapper className="nav">
      <div className="nav-header">
        <div className="nav-title">SnooOrganizer</div>
      </div>
      <div className="nav-btn">
        <label htmlFor="nav-check">
          <span></span>
          <span></span>
          <span></span>
        </label>
      </div>

      <div className="nav-links">
        <a href="re" target="_blank">
          Sign In
        </a>
      </div>
    </NavbarWrapper>
  );
};

export default Navbar;
