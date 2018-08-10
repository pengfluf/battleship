/**
 *
 * FinalCaption
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import style from './style.scss';

function FinalCaption(props) {
  return (
    <div className={style.finalCaption}>
      <p className={style.message}>
        {/* eslint-disable no-nested-ternary */}
        {props.scores.user > props.scores.computer
          ? 'You won!'
          : props.scores.user === props.scores.computer
            ? 'Draw!'
            : 'You lost : ('}
        {/* eslint-enable */}
      </p>
      <button className="btn btn--again" onClick={props.playAgain}>
        Play Again
      </button>
    </div>
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
