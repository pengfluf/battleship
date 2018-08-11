import { fromJS } from 'immutable';
import gridReducer from '../reducer';

import {
  startGame,
  allowTurn,
  forbidTurn,
  createGrid,
  createIDList,
  placeShip,
  checkCells,
  damageShip,
  userScored,
  computerScored,
  resetStats,
} from '../actions';

describe('gridReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      gameStarted: false,
      canTurn: true,
      size: 10,
      layout: [],
      idList: [],
      totalRemaining: 0,
      ships: {},
      scores: {
        user: 0,
        computer: 0,
      },
    });
  });

  it('Returns the initial state', () => {
    const expected = state;
    expect(gridReducer(undefined, {})).toEqual(expected);
  });

  it('Handles the startGame action correctly', () => {
    const expected = state.set('gameStarted', true);
    expect(gridReducer(state, startGame())).toEqual(expected);
  });

  it('Handles the allowTurn action correctly', () => {
    const expected = state.set('canTurn', true);
    expect(gridReducer(state, allowTurn())).toEqual(expected);
  });

  it('Handles the forbidTurn action correctly', () => {
    const expected = state.set('canTurn', false);
    expect(gridReducer(state, forbidTurn())).toEqual(expected);
  });

  it('Handles the createGrid action correctly', () => {
    const layout = [[{ id: 1 }], [{ id: 2 }]];
    const expected = state.set('layout', fromJS(layout));
    expect(gridReducer(state, createGrid(layout))).toEqual(expected);
  });

  it('Handles the createIDList action correctly', () => {
    const idList = ['id1r', 'id2t'];
    const expected = state.set('idList', fromJS(idList));
    expect(gridReducer(state, createIDList(idList))).toEqual(expected);
  });

  it('Handles the placeShip action correctly', () => {
    const shipCoords = [[1, 2], [3, 4]];
    const occupiedCoords = [[5, 6], [7, 8]];
    const shipLength = 4;
    const shipName = 'somename';
    const shipColor = 'rgba(126, 87, 194, 0.5)';
    const expected = state.withMutations(st => {
      shipCoords.forEach(pair => {
        st.updateIn(['layout', pair[0], pair[1], 'isShip'], () => true)
          .setIn(['layout', pair[0], pair[1], 'shipName'], shipName)
          .setIn(['ships', shipName, 'remaining'], shipLength)
          .setIn(['ships', shipName, 'color'], shipColor);
      });
      occupiedCoords.forEach(pair => {
        st.updateIn(['layout', pair[0], pair[1], 'occupied'], () => true);
      });
      st.update('totalRemaining', val => val + shipLength);
    });
    expect(
      gridReducer(
        state,
        placeShip(shipCoords, occupiedCoords, shipLength, shipName, shipColor),
      ),
    ).toEqual(expected);
  });

  it('Handles the checkCells action correctly', () => {
    const coords = [[1, 2], [3, 4]];
    const expected = state.withMutations(st => {
      coords.forEach(pair => {
        st.updateIn(['layout', pair[0], pair[1], 'checked'], () => true);
      });
    });
    expect(gridReducer(state, checkCells(coords))).toEqual(expected);
  });

  it('Handles the damageShip action correctly', () => {
    const name = 'somename';
    const expected = state
      .update('totalRemaining', val => val - 1)
      .updateIn(['ships', name, 'remaining'], val => val - 1);
    expect(gridReducer(state, damageShip(name))).toEqual(expected);
  });

  it('Handles the userScored action correctly', () => {
    const expected = state.updateIn(['scores', 'user'], val => val + 1);
    expect(gridReducer(state, userScored())).toEqual(expected);
  });

  it('Handles the computerScored action correctly', () => {
    const expected = state.updateIn(['scores', 'computer'], val => val + 1);
    expect(gridReducer(state, computerScored())).toEqual(expected);
  });

  it('Handles the resetStats action correctly', () => {
    const expected = state.withMutations(st => {
      Object(st.get('scores')).forEach((item, index) => {
        st.updateIn(['scores', index], () => 0);
      });
    });
    expect(gridReducer(state, resetStats())).toEqual(expected);
  });
});
