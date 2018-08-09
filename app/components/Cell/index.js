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
  const { ship } = props;
  return (
    <button
      style={
        ship && ship.remaining === 0 ? { backgroundColor: ship.color } : null
      }
      onClick={props.onClick}
      className={style.cell}
    >
      {/* eslint-disable no-nested-ternary */}
      {ship && ship.remaining === 0 ? (
        <svg className={style.icon}>
          <use xlinkHref="#icon-skull" />
        </svg>
      ) : checked && isShip ? (
        <svg className={style.icon}>
          <use xlinkHref="#icon-explosion" />
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
  ship: PropTypes.object,
  onClick: PropTypes.func,
};

export default Cell;
