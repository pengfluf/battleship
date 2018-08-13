import { fromJS } from 'immutable';
import makeSelectGridContainer, {
  selectGridDomain,
} from '../selectors';

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

describe('makeSelectGridContainer', () => {
  const gridContainerSelector = makeSelectGridContainer();
  it('Selects grid container correctly', () => {
    const actualState = {
      grid: {},
    };
    const mockedState = fromJS({
      grid: actualState,
    });
    expect(gridContainerSelector(mockedState)).toEqual(actualState);
  });
});
