import styled, { css } from 'styled-components';
import wrongPageGif from '../../assets/wrong_page.gif';

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  border-left: 0;
  border-right: 0;
  position: relative;
  overflow: hidden;
  background: url(${wrongPageGif});
  filter: grayscale(0.7);
  img {
    display: flex;
    position: absolute;
    z-index: -1;
    height: inherit;
  }
  h2 {
    font-size: 50vw;
    color: #fff;
    ${window.innerWidth > 700 &&
    css`
      font-size: 500px;
    `}
  }
`;
