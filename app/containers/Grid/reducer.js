/*
 *
 * Grid reducer
 *
 */

import { fromJS } from 'immutable';
import { CREATE_GRID, CREATE_ID_LIST } from './constants';

export const initialState = fromJS({
  size: 10,
  layout: [],
  idList: [],
});

function gridReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_GRID:
      return state.set('layout', action.layout);
    case CREATE_ID_LIST:
      return state.set('idList', action.idList);
    default:
      return state;
  }
}

export default gridReducer;
