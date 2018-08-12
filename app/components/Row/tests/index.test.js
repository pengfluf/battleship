import React from 'react';
import { shallow } from 'enzyme';

import Row from '../';

describe('<Row />', () => {
  it('Renders a <div> tag', () => {
    const renderedComponent = shallow(<Row />);
    expect(renderedComponent.type()).toEqual('div');
  });
});
