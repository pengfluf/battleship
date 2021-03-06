/*
 *
 * Grid actions
 *
 */

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

export function allowTurn() {
  return {
    type: ALLOW_TURN,
  };
}

export function forbidTurn() {
  return {
    type: FORBID_TURN,
  };
}

export function startGame() {
  return {
    type: START_GAME,
  };
}

export function createGrid(grid) {
  return {
    type: CREATE_GRID,
    grid,
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

export function userScored() {
  return {
    type: USER_SCORED,
  };
}

export function computerScored() {
  return {
    type: COMPUTER_SCORED,
  };
}

export function resetStats() {
  return {
    type: RESET_STATS,
  };
}
