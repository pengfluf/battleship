import React from 'react';
import { shallow } from 'enzyme';

import Wrapper from 'components/SvgIcon/styled/Wrapper';

describe('<Wrapper />', () => {
  it('Renders a <svg> tag', () => {
    const renderedComponent = shallow(<Wrapper />);
    expect(renderedComponent.type()).toEqual('svg');
  });
});
