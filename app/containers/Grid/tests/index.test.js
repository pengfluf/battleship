// import React from 'react';
// import { shallow } from 'enzyme';

import { mapDispatchToProps } from '../index';

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

describe('<Grid />', () => {
  describe('mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const result = mapDispatchToProps(dispatch);

    describe('startGame', () => {
      it('Should be injected', () => {
        expect(result.startGame).toBeDefined();
      });

      it('Dispatches startGame', () => {
        result.startGame();
        expect(dispatch).toHaveBeenCalledWith(startGame());
      });
    });

    describe('allowTurn', () => {
      it('Should be injected', () => {
        expect(result.allowTurn).toBeDefined();
      });

      it('Dispatches allowTurn', () => {
        result.allowTurn();
        expect(dispatch).toHaveBeenCalledWith(allowTurn());
      });
    });

    describe('forbidTurn', () => {
      it('Should be injected', () => {
        expect(result.forbidTurn).toBeDefined();
      });

      it('Dispatches forbidTurn', () => {
        result.forbidTurn();
        expect(dispatch).toHaveBeenCalledWith(forbidTurn());
      });
    });

    describe('createGrid', () => {
      it('Should be injected', () => {
        expect(result.createGrid).toBeDefined();
      });

      it('Dispatches createGrid', () => {
        const grid = [[{ id: 1 }], [{ id: 2 }]];
        result.createGrid(grid);
        expect(dispatch).toHaveBeenCalledWith(createGrid(grid));
      });
    });

    describe('createIDList', () => {
      it('Should be injected', () => {
        expect(result.createIDList).toBeDefined();
      });

      it('Dispatches createIDList', () => {
        const idList = ['id1r', 'id2t'];
        result.createIDList(idList);
        expect(dispatch).toHaveBeenCalledWith(createIDList(idList));
      });
    });

    describe('placeShip', () => {
      it('Should be injected', () => {
        expect(result.placeShip).toBeDefined();
      });

      it('Dispatches placeShip', () => {
        const shipCoords = [[1, 2], [3, 4]];
        const occupiedCoords = [[5, 6], [7, 8]];
        const shipLength = 4;
        const shipName = 'somename';
        const shipColor = 'rgba(126, 87, 194, 0.5)';
        result.placeShip(
          shipCoords,
          occupiedCoords,
          shipLength,
          shipName,
          shipColor,
        );
        expect(dispatch).toHaveBeenCalledWith(
          placeShip(
            shipCoords,
            occupiedCoords,
            shipLength,
            shipName,
            shipColor,
          ),
        );
      });
    });

    describe('checkCells', () => {
      it('Should be injected', () => {
        expect(result.checkCells).toBeDefined();
      });

      it('Dispatches checkCells', () => {
        const coords = [[1, 2], [3, 4]];
        result.checkCells(coords);
        expect(dispatch).toHaveBeenCalledWith(checkCells(coords));
      });
    });

    describe('damageShip', () => {
      it('Should be injected', () => {
        expect(result.damageShip).toBeDefined();
      });

      it('Dispatches damageShip', () => {
        const name = 'somename';
        result.damageShip(name);
        expect(dispatch).toHaveBeenCalledWith(damageShip(name));
      });
    });

    describe('userScored', () => {
      it('Should be injected', () => {
        expect(result.userScored).toBeDefined();
      });

      it('Dispatches userScored', () => {
        result.userScored();
        expect(dispatch).toHaveBeenCalledWith(userScored());
      });
    });

    describe('computerScored', () => {
      it('Should be injected', () => {
        expect(result.computerScored).toBeDefined();
      });

      it('Dispatches computerScored', () => {
        result.computerScored();
        expect(dispatch).toHaveBeenCalledWith(computerScored());
      });
    });

    describe('resetStats', () => {
      it('Should be injected', () => {
        expect(result.resetStats).toBeDefined();
      });

      it('Dispatches resetStats', () => {
        result.resetStats();
        expect(dispatch).toHaveBeenCalledWith(resetStats());
      });
    });
  });
});
