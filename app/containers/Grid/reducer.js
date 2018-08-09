/*
 *
 * Grid reducer
 *
 */

import { fromJS } from 'immutable';
import {
  START_GAME,
  CREATE_GRID,
  CREATE_ID_LIST,
  PLACE_SHIP,
  CHECK_CELLS,
  DAMAGE_SHIP,
} from './constants';

export const initialState = fromJS({
  gameStarted: false,
  size: 10,
  layout: [],
  idList: [],
  remainingShipNum: 0,
  ships: {},
});

function gridReducer(state = initialState, action) {
  switch (action.type) {
    case START_GAME:
      return state.set('gameStarted', true);
    case CREATE_GRID:
      return state.set('layout', fromJS(action.layout));
    case CREATE_ID_LIST:
      return state.set('idList', fromJS(action.idList));
    case PLACE_SHIP:
      return state.withMutations(st => {
        action.shipCoords.forEach(pair => {
          st.updateIn(
            ['layout', pair[0], pair[1], 'isShip'],
            () => true,
          ).updateIn(
            ['layout', pair[0], pair[1], 'shipName'],
            () => action.shipName,
          );
        });
        action.occupiedCoords.forEach(pair => {
          st.updateIn(['layout', pair[0], pair[1], 'occupied'], () => true);
        });
        st.update('remainingShipNum', val => val + action.shipLength);
      });
    case CHECK_CELLS:
      return state.withMutations(st => {
        action.coords.forEach(pair => {
          st.updateIn(['layout', pair[0], pair[1], 'checked'], () => true);
        });
      });
    case DAMAGE_SHIP:
      return state.update('remainingShipNum', val => val - 1);
    default:
      return state;
  }
}

export default gridReducer;
