/*
 *
 * Grid actions
 *
 */

import { CREATE_GRID, CREATE_ID_LIST } from './constants';

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
