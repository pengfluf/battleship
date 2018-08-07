/*
 *
 * Grid actions
 *
 */

import { CREATE_GRID, CREATE_ID_LIST, PLACE_SHIP } from './constants';

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
