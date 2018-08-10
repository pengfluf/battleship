/**
 *
 * SvgIcon
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import Wrapper from './styled/Wrapper';

function SvgIcon(props) {
  return (
    <Wrapper size="55px">
      <use xlinkHref={`#icon-${props.name}`} />
    </Wrapper>
  );
}

SvgIcon.propTypes = {
  name: PropTypes.string,
};

export default SvgIcon;
