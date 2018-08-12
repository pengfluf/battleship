import React from 'react';
import { shallow } from 'enzyme';

import Overlay from '../';

describe('<Overlay />', () => {
  it('Renders a <div> tag', () => {
    const renderedComponent = shallow(<Overlay />);
    expect(renderedComponent.type()).toEqual('div');
  });
});
