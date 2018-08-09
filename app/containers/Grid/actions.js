/*
 *
 * Grid actions
 *
 */

import {
  START_GAME,
  CREATE_GRID,
  CREATE_ID_LIST,
  PLACE_SHIP,
  CHECK_CELLS,
  DAMAGE_SHIP,
} from './constants';

export function startGame() {
  return {
    type: START_GAME,
  };
}

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

export function placeShip(
  shipCoords,
  occupiedCoords,
  shipLength,
  shipName,
  shipColor,
) {
  return {
    type: PLACE_SHIP,
    shipCoords,
    occupiedCoords,
    shipLength,
    shipName,
    shipColor,
  };
}

export function checkCells(coords) {
  return {
    type: CHECK_CELLS,
    coords,
  };
}

export function damageShip(name) {
  return {
    type: DAMAGE_SHIP,
    name,
  };
}
