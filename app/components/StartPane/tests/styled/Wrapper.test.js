import React from 'react';
import { shallow } from 'enzyme';

import Wrapper from 'components/StartPane/styled/Wrapper';

describe('<Wrapper />', () => {
  it('Renders a <div> tag', () => {
    const renderedComponent = shallow(<Wrapper />);
    expect(renderedComponent.type()).toEqual('div');
  });
});
