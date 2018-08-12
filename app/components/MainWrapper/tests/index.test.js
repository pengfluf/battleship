import React from 'react';
import { shallow } from 'enzyme';

import SvgSprite from 'components/SvgSprite';
import Grid from 'containers/Grid';

import MainWrapper from '../';
import Wrapper from '../styled/Wrapper';

describe('<MainWrapper />', () => {
  it('Renders the <Wrapper />', () => {
    const renderedComponent = shallow(<MainWrapper />);
    expect(renderedComponent.find(Wrapper).length).toBe(1);
  });

  it('Renders the <SvgSprite />', () => {
    const renderedComponent = shallow(<MainWrapper />);
    expect(renderedComponent.find(SvgSprite).length).toBe(1);
  });

  it('Renders the <Grid />', () => {
    const renderedComponent = shallow(<MainWrapper />);
    expect(renderedComponent.find(Grid).length).toBe(1);
  });
});
