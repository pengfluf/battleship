import { fromJS } from 'immutable';
import makeSelectGridContainer, {
  selectGridDomain,
} from '../selectors';

describe('selectGridDomain', () => {
  it('Selects grid container domain correctly', () => {
    const actualState = fromJS({
      gridContainer: {},
    });
    const mockedState = fromJS({
      gridContainer: actualState,
    });
    expect(selectGridDomain(mockedState)).toEqual(actualState);
  });
});

describe('makeSelectGridContainer', () => {
  const gridContainerSelector = makeSelectGridContainer();
  it('Selects grid container correctly', () => {
    const actualState = {
      gridContainer: {},
    };
    const mockedState = fromJS({
      gridContainer: actualState,
    });
    expect(gridContainerSelector(mockedState)).toEqual(actualState);
  });
});
