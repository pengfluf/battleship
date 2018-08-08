/*
 *
 * Grid actions
 *
 */

import {
  CREATE_GRID,
  CREATE_ID_LIST,
  PLACE_SHIP,
  CHECK_CELLS,
} from './constants';

export function createGrid(layout) {
  return {
    type: CREATE_GRID,
    layout,
  };
}

export function createIDList(idList) {
  return {
    type: CREATE_ID_LIST,
    idList,
  };
}

export function placeShip(shipCoords, occupiedCoords) {
  return {
    type: PLACE_SHIP,
    shipCoords,
    occupiedCoords,
  };
}

export function checkCells(coords) {
  return {
    type: CHECK_CELLS,
    coords,
  };
}
