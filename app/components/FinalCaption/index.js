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
      <p className={style.message}>You won!</p>
      <button className="btn btn--again" onClick={props.playAgain}>
        Play Again
      </button>
    </div>
  );
}

FinalCaption.propTypes = {
  playAgain: PropTypes.func,
};

export default FinalCaption;
