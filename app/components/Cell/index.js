/**
 *
 * Cell
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import SvgIcon from 'components/SvgIcon';

import Wrapper from './styled/Wrapper';

function Cell(props) {
  const { checked, isShip } = props.cell;
  const { ship } = props;
  return (
    <Wrapper
      // Style for blinking avoiding, prob. temp.
      style={
        ship && ship.remaining === 0
          ? { backgroundColor: ship.color }
          : null
      }
      onClick={props.onClick}
    >
      {/* eslint-disable no-nested-ternary */}
      {ship && ship.remaining === 0 ? (
        <SvgIcon name="skull" />
      ) : checked && isShip ? (
        <SvgIcon name="explosion" />
      ) : checked ? (
        <SvgIcon name="seaweed" />
      ) : (
        <SvgIcon name="sea" />
      )}
      {/* eslint-enable */}
    </Wrapper>
  );
}

Cell.propTypes = {
  cell: PropTypes.shape({
    isShip: PropTypes.bool,
    checked: PropTypes.bool,
  }),
  ship: PropTypes.shape({
    remaining: PropTypes.number,
  }),
  onClick: PropTypes.func,
};

export default Cell;
