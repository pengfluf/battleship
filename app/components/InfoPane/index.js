/**
 *
 * InfoPane
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import style from './style.scss';

function InfoPane(props) {
  return (
    <div className={style.infoPane}>
      <p>{props.canTurn ? "User's" : "Computer's"} turn</p>
      <p>Scores</p>
      <p>User: {props.scores.user}</p>
      <p>
        Computer (it{"'"}s dummy): {props.scores.computer}
      </p>
    </div>
  );
}

InfoPane.propTypes = {
  canTurn: PropTypes.bool,
  scores: PropTypes.shape({
    user: PropTypes.number,
    computer: PropTypes.number,
  }),
};

export default InfoPane;
