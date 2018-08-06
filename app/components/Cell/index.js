/**
 *
 * Cell
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import style from './style.scss';

function Cell(props) {
  return <div className={style.cell}>{props.cell.isShip ? '🚢' : 'x'}</div>;
}

Cell.propTypes = {
  cell: PropTypes.shape({
    isShip: PropTypes.bool,
  }),
};

export default Cell;
