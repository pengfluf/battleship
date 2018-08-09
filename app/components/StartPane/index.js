/**
 *
 * StartPane
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import style from './style.scss';

function StartPane(props) {
  return (
    <div className={style.startPane}>
      <p className={style.title}>Battleships</p>
      <button className="btn btn--start" onClick={props.onClick}>
        Start
      </button>
    </div>
  );
}

StartPane.propTypes = {
  onClick: PropTypes.func,
};

export default StartPane;
