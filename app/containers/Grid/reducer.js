/*
 *
 * Grid reducer
 *
 */

import { fromJS } from 'immutable';
import { CREATE_GRID } from './constants';

export const initialState = fromJS({
  layout: [],
});

function gridReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_GRID:
      return state.set('layout', action.layout);
    default:
      return state;
  }
}

export default gridReducer;
