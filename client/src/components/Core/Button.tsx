import * as React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StyledButton = styled.button`
  border: none;
  display: ${({ link }: { link?: boolean }) => (link ? 'inline-flex' : 'flex')};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 40px;
  padding: 0 20px;
  margin: 30px 0;
  background-color: #f35454;
  border-radius: 7px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 2px 6px #f3545426;
  align-self: center;

  * {
    margin: 0 10px;
  }

  .left {
    justify-self: flex-start;
    margin-left: 0;
  }

  .right {
    justify-self: flex-end;
    margin-right: 0;
  }
`;

export interface ButtonProps {
  link?: boolean;
  onClick?: () => void;
  icon?: {
    left?: any;
    right?: any;
  };
}

const Button: React.FC<ButtonProps> = ({
  icon,
  link,
  onClick,
  children,
}) => {
  return (
    <StyledButton link={link} as={link ? 'a' : 'button'} onClick={onClick}>
      {icon && icon.left && (
        <FontAwesomeIcon icon={icon.left} className="left" />
      )}
      {children}
      {icon && icon.right && (
        <FontAwesomeIcon icon={icon.right} className="right" />
      )}
    </StyledButton>
  );
};

export default Button;
