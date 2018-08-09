/**
 *
 * MainWrapper
 *
 */

import React from 'react';
import Grid from 'containers/Grid';
import SvgSprite from 'components/SvgSprite';
import style from './style.scss';

function MainWrapper() {
  return (
    <div className={style.mainWrapper}>
      <SvgSprite />
      <Grid />
    </div>
  );
}

export default MainWrapper;
