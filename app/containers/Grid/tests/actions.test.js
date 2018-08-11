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
} from '../constants';

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

describe('Grid actions', () => {
  describe('startGame action', () => {
    it('Returns the correct type and passed arguments', () => {
      const expected = {
        type: START_GAME,
      };
      expect(startGame()).toEqual(expected);
    });
  });

  describe('allowTurn action', () => {
    it('Returns the correct type and passed arguments', () => {
      const expected = {
        type: ALLOW_TURN,
      };
      expect(allowTurn()).toEqual(expected);
    });
  });

  describe('forbidTurn action', () => {
    it('Returns the correct type and passed arguments', () => {
      const expected = {
        type: FORBID_TURN,
      };
      expect(forbidTurn()).toEqual(expected);
    });
  });

  describe('createGrid action', () => {
    it('Returns the correct type and passed arguments', () => {
      const layout = [[{ id: 1 }], [{ id: 2 }]];
      const expected = {
        type: CREATE_GRID,
        layout,
      };
      expect(createGrid(layout)).toEqual(expected);
    });
  });

  describe('createIDList action', () => {
    it('Returns the correct type and passed arguments', () => {
      const idList = ['id1r', 'id2t'];
      const expected = {
        type: CREATE_ID_LIST,
        idList,
      };
      expect(createIDList(idList)).toEqual(expected);
    });
  });

  describe('placeShip action', () => {
    it('Returns the correct type and passed arguments', () => {
      const shipCoords = [[1, 2], [3, 4]];
      const occupiedCoords = [[5, 6], [7, 8]];
      const shipLength = 4;
      const shipName = 'somename';
      const shipColor = 'rgba(126, 87, 194, 0.5)';
      const expected = {
        type: PLACE_SHIP,
        shipCoords,
        occupiedCoords,
        shipLength,
        shipName,
        shipColor,
      };
      expect(
        placeShip(shipCoords, occupiedCoords, shipLength, shipName, shipColor),
      ).toEqual(expected);
    });
  });

  describe('checkCells action', () => {
    it('Returns the correct type and passed arguments', () => {
      const coords = [[1, 2], [3, 4]];
      const expected = {
        type: CHECK_CELLS,
        coords,
      };
      expect(checkCells(coords)).toEqual(expected);
    });
  });

  describe('damageShip action', () => {
    it('Returns the correct type and passed arguments', () => {
      const name = 'somename';
      const expected = {
        type: DAMAGE_SHIP,
        name,
      };
      expect(damageShip(name)).toEqual(expected);
    });
  });

  describe('userScored action', () => {
    it('Returns the correct type and passed arguments', () => {
      const expected = {
        type: USER_SCORED,
      };
      expect(userScored()).toEqual(expected);
    });
  });

  describe('computerScored action', () => {
    it('Returns the correct type and passed arguments', () => {
      const expected = {
        type: COMPUTER_SCORED,
      };
      expect(computerScored()).toEqual(expected);
    });
  });

  describe('resetStats action', () => {
    it('Returns the correct type and passed arguments', () => {
      const expected = {
        type: RESET_STATS,
      };
      expect(resetStats()).toEqual(expected);
    });
  });
});
