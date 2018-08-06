/*
 *
 * Grid actions
 *
 */

import { CREATE_GRID } from './constants';

export function createGrid(layout) {
  return {
    type: CREATE_GRID,
    layout,
  };
}
