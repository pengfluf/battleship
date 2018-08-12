import React from 'react';
import { shallow } from 'enzyme';

import Title from 'components/StartPane/styled/Title';

describe('<Title />', () => {
  it('Renders a <h1> tag', () => {
    const renderedComponent = shallow(<Title />);
    expect(renderedComponent.type()).toEqual('h1');
  });
});
