import { fromJS } from 'immutable';
import { selectGridDomain } from '../selectors';

describe('selectGridDomain', () => {
  it('Selects correctly', () => {
    const actualState = fromJS({
      grid: {},
    });
    const mockedState = fromJS({
      grid: actualState,
    });
    expect(selectGridDomain(mockedState)).toEqual(actualState);
  });
});
