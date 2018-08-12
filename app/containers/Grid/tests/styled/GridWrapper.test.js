import React from 'react';
import { shallow } from 'enzyme';

import GridWrapper from 'containers/Grid/styled/GridWrapper';

describe('<GridWrapper />', () => {
  it('Renders a <div> tag', () => {
    const renderedComponent = shallow(<GridWrapper />);
    expect(renderedComponent.type()).toEqual('div');
  });
});
