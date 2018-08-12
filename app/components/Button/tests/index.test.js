import React from 'react';
import { shallow } from 'enzyme';

import Button from '../';

describe('<Button />', () => {
  it('Renders a <button> tag', () => {
    const renderedComponent = shallow(<Button />);
    expect(renderedComponent.type()).toEqual('button');
  });
});
