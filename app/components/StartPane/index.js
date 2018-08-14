/**
 *
 * StartPane
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import { GH_LINK } from 'components/App/constants';
import Button from 'components/Button';
import DocumentationLink from 'components//DocumentationLink';

import Wrapper from './styled/Wrapper';
import Title from './styled/Title';

function StartPane(props) {
  return (
    <Wrapper>
      <DocumentationLink
        startPane
        href={`${GH_LINK}/blob/master/README.md`}
      >
        Documentation
      </DocumentationLink>
      <Title>Battleship</Title>
      <Button start="true" onClick={props.onClick}>
        Play
      </Button>
    </Wrapper>
  );
}

StartPane.propTypes = {
  onClick: PropTypes.func,
};

export default StartPane;
