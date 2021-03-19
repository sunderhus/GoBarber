import React, { ButtonHTMLAttributes } from 'react';
import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, ...htmlProps }) => (
  <Container type="button" {...htmlProps}>
    {children}
  </Container>
);

export default Button;
