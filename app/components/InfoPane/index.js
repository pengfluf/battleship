/**
 *
 * InfoPane
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import { GH_LINK } from 'components/App/constants';
import DocumentationLink from 'components//DocumentationLink';

import Wrapper from './styled/Wrapper';

function InfoPane(props) {
  return (
    <Wrapper>
      <p>{props.canTurn ? "User's" : "Computer's"} turn</p>
      <p>Scores</p>
      <p>User: {props.scores.user}</p>
      <p>
        Computer (it{"'"}s dummy): {props.scores.computer}
      </p>
      <DocumentationLink
        infoPane
        href={`${GH_LINK}/blob/master/README.md`}
      >
        Documentation
      </DocumentationLink>
    </Wrapper>
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
