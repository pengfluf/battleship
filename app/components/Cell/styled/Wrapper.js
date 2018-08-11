import styled from 'styled-components';

const Wrapper = styled.button`
  display: block;

  box-sizing: content-box;
  height: 55px;
  width: 55px;
  padding: 5px;

  cursor: pointer;
  transition: all 0.2s;

  border: none;
  outline: none;
  outline: 1px solid rgba(0, 0, 0, 0.2);
  background-color: rgba(66, 165, 245, 0.8);

  &:hover {
    background-color: rgba(171, 71, 188, 0.8);
  }
`;

export default Wrapper;
