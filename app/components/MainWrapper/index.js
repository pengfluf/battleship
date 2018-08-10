/**
 *
 * MainWrapper
 *
 */

import React from 'react';
import Grid from 'containers/Grid';
import SvgSprite from 'components/SvgSprite';

import Wrapper from './styled/Wrapper';

function MainWrapper() {
  return (
    <Wrapper>
      <SvgSprite />
      <Grid />
    </Wrapper>
  );
}

export default MainWrapper;
