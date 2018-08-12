import React from 'react';
import { shallow } from 'enzyme';

import SvgSprite from '../';

describe('<SvgSprite />', () => {
  it('Renders an <svg> tag', () => {
    const renderedComponent = shallow(<SvgSprite />);
    expect(renderedComponent.type()).toEqual('svg');
  });

  it('Has a style attribute', () => {
    const style = {
      position: 'absolute',
      width: 0,
      height: 0,
    };
    const renderedComponent = shallow(<SvgSprite style={style} />);
    expect(renderedComponent.prop('style')).toEqual(style);
  });
});
