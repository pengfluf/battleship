import React from 'react';
import { shallow } from 'enzyme';

import Wrapper from 'components/Cell/styled/Wrapper';
import Cell from 'components/Cell';
import SvgIcon from 'components/SvgIcon';

describe('<Cell />', () => {
  it('Renders the <Wrapper />', () => {
    const renderedComponent = shallow(<Cell cell={{}} ship={{}} />);
    expect(renderedComponent.find(Wrapper).length).toBe(1);
  });

  it('Renders the <SvgIcon />', () => {
    const renderedComponent = shallow(<Cell cell={{}} ship={{}} />);
    expect(renderedComponent.find(SvgIcon).length).toBe(1);
  });
});
