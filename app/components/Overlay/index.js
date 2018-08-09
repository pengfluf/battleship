/**
 *
 * Overlay
 *
 */

import styled from 'styled-components';

const Overlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  animation-name: animation;
  animation-duration: 2s;

  color: #fff;
  background-color: #000;

  animation-fill-mode: forwards;

  @keyframes animation {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 0.85;
    }
  }
`;

export default Overlay;
