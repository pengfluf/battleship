/**
 *
 * FinalCaption
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import Button from 'components/Button';

import Wrapper from './styled/Wrapper';
import Message from './styled/Message';

function FinalCaption(props) {
  return (
    <Wrapper>
      <Message>
        {/* eslint-disable no-nested-ternary */}
        {props.scores.user > props.scores.computer
          ? 'You won!'
          : props.scores.user === props.scores.computer
            ? 'Draw!'
            : 'You lost : ('}
        {/* eslint-enable */}
      </Message>
      <Button playAgain="true" onClick={props.playAgain}>
        Play Again
      </Button>
    </Wrapper>
  );
}

FinalCaption.propTypes = {
  playAgain: PropTypes.func,
  scores: PropTypes.shape({
    user: PropTypes.number,
    computer: PropTypes.number,
  }),
};

export default FinalCaption;
