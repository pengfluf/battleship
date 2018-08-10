import styled from 'styled-components';
import bigImg from 'images/bgs/bg-big.jpg';
import largeImg from 'images/bgs/bg.jpg';

const Wrapper = styled.div`
  display: flex;

  min-height: 100vh;
  padding-top: 5vh;
  padding-right: 20px;
  padding-left: 20px;

  background-position: -5px -6px;

  justify-content: center;

  @media (max-width: 575px) {
    background-image: url(${bigImg});
  }
  @media (min-width: 576px) {
    background-image: url(${largeImg});
  }
`;

export default Wrapper;
