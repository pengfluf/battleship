import React from 'react';
import { shallow } from 'enzyme';

import MainWrapper from 'components/MainWrapper';

import App from '../';

describe('<App />', () => {
  it('Renders the <MainWrapper />', () => {
    const renderedComponent = shallow(<App />);
    expect(renderedComponent.find(MainWrapper).length).toBe(1);
  });
});
