import React from 'react';
import { shallow } from 'enzyme';

import Wrapper from 'components/MainWrapper/styled/Wrapper';

describe('<Wrapper />', () => {
  it('Renders a <div> tag', () => {
    const renderedComponent = shallow(<Wrapper />);
    expect(renderedComponent.type()).toEqual('div');
  });
});
