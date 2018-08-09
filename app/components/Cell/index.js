/**
 *
 * Cell
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import style from './style.scss';

function Cell(props) {
  const { checked, isShip } = props.cell;
  return (
    <button onClick={props.onClick} className={style.cell}>
      {/* eslint-disable no-nested-ternary */}
      {checked && isShip ? (
        <svg className={style.icon}>
          <use xlinkHref="#icon-skull" />
        </svg>
      ) : checked ? (
        <svg className={style.icon}>
          <use xlinkHref="#icon-seaweed" />
        </svg>
      ) : (
        <svg className={style.icon}>
          <use xlinkHref="#icon-sea" />
        </svg>
      )}
      {/* eslint-enable */}
    </button>
  );
}

Cell.propTypes = {
  cell: PropTypes.shape({
    isShip: PropTypes.bool,
  }),
  onClick: PropTypes.func,
};

export default Cell;
