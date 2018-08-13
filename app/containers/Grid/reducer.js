/*
 *
 * Grid reducer
 *
 */

import { fromJS } from 'immutable';
import {
  START_GAME,
  ALLOW_TURN,
  FORBID_TURN,
  CREATE_GRID,
  CREATE_ID_LIST,
  PLACE_SHIP,
  CHECK_CELLS,
  DAMAGE_SHIP,
  USER_SCORED,
  COMPUTER_SCORED,
  RESET_STATS,
} from './constants';

export const initialState = fromJS({
  gameStarted: false,
  canTurn: true,
  size: 10,
  grid: [],
  idList: [],
  totalRemaining: 0,
  ships: {},
  scores: {
    user: 0,
    computer: 0,
  },
});

function gridReducer(state = initialState, action) {
  switch (action.type) {
    case START_GAME:
      return state.set('gameStarted', true);
    case ALLOW_TURN:
      return state.set('canTurn', true);
    case FORBID_TURN:
      return state.set('canTurn', false);
    case CREATE_GRID:
      return state.set('grid', fromJS(action.grid));
    case CREATE_ID_LIST:
      return state.set('idList', fromJS(action.idList));
    case PLACE_SHIP:
      return state.withMutations(st => {
        action.shipCoords.forEach(pair => {
          st.updateIn(
            ['grid', pair[0], pair[1], 'isShip'],
            () => true,
          )
            .setIn(
              ['grid', pair[0], pair[1], 'shipName'],
              action.shipName,
            )
            .setIn(
              ['ships', action.shipName, 'remaining'],
              action.shipLength,
            )
            .setIn(
              ['ships', action.shipName, 'color'],
              action.shipColor,
            );
        });
        action.occupiedCoords.forEach(pair => {
          st.updateIn(
            ['grid', pair[0], pair[1], 'occupied'],
            () => true,
          );
        });
        st.update('totalRemaining', val => val + action.shipLength);
      });
    case CHECK_CELLS:
      return state.withMutations(st => {
        action.coords.forEach(pair => {
          st.updateIn(
            ['grid', pair[0], pair[1], 'checked'],
            () => true,
          );
        });
      });
    case DAMAGE_SHIP:
      return state
        .update('totalRemaining', val => val - 1)
        .updateIn(
          ['ships', action.name, 'remaining'],
          val => val - 1,
        );
    case USER_SCORED:
      return state.updateIn(['scores', 'user'], val => val + 1);
    case COMPUTER_SCORED:
      return state.updateIn(['scores', 'computer'], val => val + 1);
    case RESET_STATS:
      return state.withMutations(st => {
        Object(st.get('scores')).forEach((item, index) => {
          st.updateIn(['scores', index], () => 0);
        });
      });
    default:
      return state;
  }
}

export default gridReducer;
