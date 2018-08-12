import React from 'react';
import { shallow } from 'enzyme';

import Message from 'components/FinalCaption/styled/Message';

describe('<Message />', () => {
  it('Renders a <p> tag', () => {
    const renderedComponent = shallow(<Message />);
    expect(renderedComponent.type()).toEqual('p');
  });
});
