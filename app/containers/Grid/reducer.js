/*
 *
 * Grid reducer
 *
 */

import { fromJS } from 'immutable';
import { CREATE_GRID, CREATE_ID_LIST, PLACE_SHIP } from './constants';

export const initialState = fromJS({
  size: 10,
  layout: [],
  idList: [],
});

function gridReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_GRID:
      return state.set('layout', fromJS(action.layout));
    case CREATE_ID_LIST:
      return state.set('idList', fromJS(action.idList));
    case PLACE_SHIP:
      return state.withMutations(st => {
        action.shipCoords.forEach(pair => {
          st.updateIn(['layout', pair[0], pair[1], 'isShip'], () => true);
        });
        console.log('occupiedCoords');
        console.log(action.occupiedCoords);
        action.occupiedCoords.forEach(pair => {
          st.updateIn(['layout', pair[0], pair[1], 'occupied'], () => true);
        });
      });
    default:
      return state;
  }
}

export default gridReducer;
