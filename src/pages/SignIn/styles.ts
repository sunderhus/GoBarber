import styled, { keyframes } from 'styled-components';
import background from '../../assets/sign-in-background.png';
import { shade } from 'polished';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`;

const appearFromLeft = keyframes`
  from{
    opacity:0;
    transform: translateX(-50px);
  }
  to{
    transform: translateX(0px);
    opacity:1
  }
 `;

export const Content = styled.div`
  width: 100%;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  place-content: center;
  animation: ${appearFromLeft} 1s;

  form {
    margin-top: 80px;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2;
      &:hover {
        color: ${shade(0.2, '#f3ede8')};
      }
    }
  }

  > a {
    color: #ff9000;
    display: flex;
    align-items: center;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2;
    &:hover {
      color: ${shade(0.2, '#ff9000')};
    }
    svg {
      margin-right: 16px;
      color: inherit;
    }
  }
`;
export const Background = styled.div`
  flex: 1;
  background: url(${background}) no-repeat center;
  background-size: cover;
`;
