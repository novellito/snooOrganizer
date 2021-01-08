import styled from 'styled-components';
import { TEXT_PRIMARY, SNOO_MINT } from '../constants/colors';

const inputWidth = '100%';

const InputFieldWrapper = styled.div`
  margin: 10px 0 20px 5px;
  position: relative;
  input {
    background: none;
    color: ${TEXT_PRIMARY};
    font-size: 1.2em;
    padding: 5px 10px 8px 5px;
    width: ${inputWidth};
    border: none;
    border-bottom: 1px solid ${TEXT_PRIMARY};
    &:focus {
      outline: none;
    }
    &:focus ~ label,
    &:valid ~ label {
      top: -14px;
      font-size: 0.8em;
      color: ${SNOO_MINT};
    }
    &:focus ~ .bar:before {
      width: ${inputWidth};
    }
  }

  label {
    color: ${TEXT_PRIMARY};
    font-size: 1em;
    position: absolute;
    pointer-events: none;
    left: 5px;
    top: 10px;
    transition: 300ms ease all;
  }

  .bar {
    position: relative;
    display: block;
    width: ${inputWidth};
    &:before {
      content: '';
      height: 2px;
      width: 0;
      bottom: 0;
      position: absolute;
      background: ${SNOO_MINT};
      transition: 300ms ease all;
    }
  }
`;

interface InputFieldProps {
  customClass?: string;
  filterList: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputField: React.FC<InputFieldProps> = (props) => {
  return (
    <InputFieldWrapper className={props.customClass}>
      <input type="text" onChange={(e) => props.filterList(e)} required />
      <span className="highlight"></span>
      <span className="bar"></span>
      <label>Search</label>
    </InputFieldWrapper>
  );
};

export default InputField;
