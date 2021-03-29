import { shade } from 'polished';
import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  justify-content: center;
  display: flex;
  flex-flow: column;
  align-items: stretch;

  header {
    background-color: #28262e;
    position: absolute;
    top: 0px;
    right: 0px;
    left: 0px;
    height: 144px;
    display: flex;
    justify-content: center;
    align-items: center;
    > div {
      width: 1120px;
    }
    svg {
      color: #999591;
      font-size: 24px;
      transition: color 0.2s linear;
      :hover {
        color: #ff9000;
      }
    }
  }
`;

const appearFromRight = keyframes`
  from{
    opacity:0;
    transform: translateX(-50px);
  }
  to{
    opacity:1;
    transform: translateX(0px);
  }
`;

export const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  place-content: center;
  animation: ${appearFromRight} 1s;
  form {
    width: 340px;
    text-align: center;
    display: flex;
    flex-direction: column;

    h1 {
      margin-bottom: 24px;
      font-size: 20px;
      text-align: left;

      + div {
        margin-bottom: 24px;
      }
    }
  }
`;

export const AvatarInput = styled.div`
  margin-bottom: 32px;
  position: relative;
  width: fit-content;
  align-self: center;

  img {
    width: 186px;
    height: 186px;
    border-radius: 50%;
  }

  label {
    position: absolute;
    width: 48px;
    height: 48px;
    background: #ff9000;
    border-radius: 50%;
    right: 0;
    bottom: 0;
    border: 0;
    transition: background-color 0.2s linear;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover {
      background: ${shade(0.2, '#ff9000')};
    }

    input {
      display: none;
    }

    svg {
      width: 20px;
      height: 20px;
      color: #312e38;
    }
  }
`;
