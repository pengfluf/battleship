import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the grid state domain
 */

const selectGridDomain = state =>
  state.get('gridContainer', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Grid
 */

const makeSelectGridContainer = () =>
  createSelector(selectGridDomain, substate => substate.toJS());

export default makeSelectGridContainer;
export { selectGridDomain };
