import { fromJS } from 'immutable';
import makeSelectGrid, { selectGridDomain } from '../selectors';

describe('selectGridDomain', () => {
  it('Selects grid domain correctly', () => {
    const actualState = fromJS({
      grid: {},
    });
    const mockedState = fromJS({
      grid: actualState,
    });
    expect(selectGridDomain(mockedState)).toEqual(actualState);
  });
});

describe('makeSelectGrid', () => {
  const gridSelector = makeSelectGrid();
  it('Selects grid correctly', () => {
    const actualState = {
      grid: {},
    };
    const mockedState = fromJS({
      grid: actualState,
    });
    expect(gridSelector(mockedState)).toEqual(actualState);
  });
});
