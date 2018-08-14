/**
 *
 * Button
 *
 */

import styled from 'styled-components';

const Button = styled.button`
  font-size: 24px;

  display: inline-block;

  padding: 10px 55px;

  cursor: pointer;
  transition: all 0.3s;

  border: 5px solid white;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.8);
  outline: none;

  &:hover {
    color: white;
    background-color: rgba(126, 87, 194, 0.7);
  }

  margin-top: ${props => {
    if (props.start) {
      return '25px';
    } else if (props.playAgain) {
      return '10px';
    }
    return '0';
  }};
`;

export default Button;
