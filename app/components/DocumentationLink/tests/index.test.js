import React from 'react';
import { shallow } from 'enzyme';

import DocumentationLink from '../';

describe('<DocumentationLink />', () => {
  it('Renders an <a> tag', () => {
    const renderedComponent = shallow(<DocumentationLink />);
    expect(renderedComponent.type()).toEqual('a');
  });
});
