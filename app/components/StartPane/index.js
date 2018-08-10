/**
 *
 * StartPane
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import Button from 'components/Button';

import Wrapper from './styled/Wrapper';
import Title from './styled/Title';

function StartPane(props) {
  return (
    <Wrapper>
      <Title>Battleship</Title>
      <Button start="true" onClick={props.onClick}>
        Play
      </Button>
    </Wrapper>
  );
}

StartPane.propTypes = {
  onClick: PropTypes.func,
};

export default StartPane;
