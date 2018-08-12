import React from 'react';
import { shallow } from 'enzyme';

import Wrapper from 'components/InfoPane/styled/Wrapper';

import InfoPane from '../';

describe('<InfoPane />', () => {
  it('Renders the <Wrapper />', () => {
    const renderedComponent = shallow(<InfoPane scores={{}} />);
    expect(renderedComponent.find(Wrapper).length).toBe(1);
  });
});
