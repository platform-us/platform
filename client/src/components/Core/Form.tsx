import * as React from 'react';
import styled from 'styled-components';

const Container = styled.form`
  display: flex;
  flex-direction: column;
  align-items: stretch;

  .error {
    margin: 0 0 5px;
    color: #f35454;
  }

  label {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    margin: 3px 0;

    input[type='text'],
    input[type='password'],
    input[type='email'],
    textarea {
      margin: 3px 0 5px;
      height: 35px;
      padding: 0 5px;
      font-size: 14px;
      border: 1px solid #ccc;
      border-radius: 3px;
      transition: border 0.2s ease;

      &:focus {
        border-color: #666;
      }
    }

    textarea {
      height: 70px;
      padding: 5px;
      font-family: inherit;
    }
  }

  input[type='button'],
  input[type='submit'] {
    background-color: #f35454;
    border: none;
    color: white;
    border-radius: 3px;
    align-self: flex-end;
    font-size: 14px;
    padding: 6px 25px;
    margin: 5px 0;
    cursor: pointer;
  }
`;

export interface FormProps {
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
}

const Form: React.FC<FormProps> = ({ onSubmit, children }) => {
  return <Container onSubmit={onSubmit}>{children}</Container>;
};

export default Form;
