import styled from 'styled-components';

const AuthenticateWrapper = styled.button`
  color: teal;
  font-size: 2em;
`;

interface AuthenticateProps {
  text: string;
  click: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const Authenticate = (props: AuthenticateProps) => {
  return (
    <AuthenticateWrapper onClick={props.click}>
      {props.text}
    </AuthenticateWrapper>
  );
};

export default Authenticate;
