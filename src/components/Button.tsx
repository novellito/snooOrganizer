import styled from 'styled-components';
import { PRIMARY, SECONDARY, SUCCESS, DANGER } from '../constants/colors';

const bgColorMap: any = {
  primary: PRIMARY,
  secondary: SECONDARY,
  success: SUCCESS,
  danger: DANGER
};
const ButtonWrapper = styled.button`
  background-color: ${(props: ButtonProps) => bgColorMap[props.bgColor]};
  color: white;
  font-size: 1.2em;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  position: relative;
  display: inline-block;
  border: none;
  border-radius: 4px;
  padding: 0 16px;
  height: 36px;
  outline: none;
  cursor: pointer;

  /* ripple */
  &::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    border-radius: 50%;
    padding: 50%;
    background-color: rgb(255, 255, 255);
    opacity: 0;
    transform: translate(-50%, -50%) scale(1);
    transition: opacity 1s, transform 0.5s;
  }

  &:active::after {
    opacity: 0.32;
    transform: translate(-50%, -50%) scale(0);
    transition: transform 0s;
  }

  &:hover {
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2),
      0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12);
    transition: opacity 0.3s, transform;
  }

  /*
  leaving this for future reference that you can 
  pass styles like this and use tempalte literals
   ${({ bgColor }) =>
     bgColor &&
     `
    color: ${bgColorMap[bgColor]}
  `} */
  &.inverse {
    background-color: inherit;
    color: ${(props: ButtonProps) => bgColorMap[props.bgColor]};
    box-shadow: none;
  }

  &[disabled] {
    color: grey;
    cursor: not-allowed;
  }
  ${(props) => ({ ...props.style })}
`;

interface ButtonProps {
  bgColor: string;
  text: string;
  style?: object;
  customClass?: string;
  click: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
}

export const Button = (props: ButtonProps) => {
  return (
    <ButtonWrapper
      onClick={props.click}
      {...props}
      className={props.customClass}
      disabled={props.disabled}
    >
      {props.text}
    </ButtonWrapper>
  );
};

export default Button;
