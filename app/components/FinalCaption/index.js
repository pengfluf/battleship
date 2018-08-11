/**
 *
 * FinalCaption
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Button from 'components/Button';

import Wrapper from './styled/Wrapper';
import Message from './styled/Message';

// General condition is neeeded for avoiding text
// blinking
function FinalCaption(props) {
  return (
    <Wrapper>
      {props.scores.user !== 0 || props.scores.computer !== 0 ? (
        <Fragment>
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
        </Fragment>
      ) : null}
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
