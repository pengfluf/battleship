import React from 'react';
import { shallow } from 'enzyme';

import Wrapper from 'components/Cell/styled/Wrapper';

describe('<Wrapper />', () => {
  it('Renders a <button> tag', () => {
    const renderedComponent = shallow(<Wrapper />);
    expect(renderedComponent.type()).toEqual('button');
  });
});
