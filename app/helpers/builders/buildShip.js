import getInit from 'helpers/getters/cell/getInit';

import validateCells from 'helpers/validators/validateCells';

import buildBody from './modules/buildBody';
import buildTail from './modules/buildTail';

/**
 * Builds ship and returns its' coordinates, including the
 * occupied / surrounding ones.
 * @param {Array} grid - Grid with cell coordinates.
 * @param {string} type - Ship type. Can be 'LShaped', 'dotShaped'.
 * If not specified, will be just regular vertical / horizontal.
 * @returns {{shipCoords: Array, occupiedCoords: Array}} - Ship coordinates
 * and all the coordinates occupied by the ship.
 */
export default function buildShip(grid, type) {
  const shipCoords = [];
  const occupiedCoords = [];
  let trials = 0;

  let initCell = getInit(grid);
  if (!initCell.length) return { shipCoords, occupiedCoords };

  const [y, x] = [initCell[0], initCell[1]];

  if (type === 'dotShaped') {
    shipCoords.push(initCell);
    occupiedCoords.push(validateCells(y, x, grid));
    return {
      shipCoords,
      occupiedCoords,
    };
  }

  let bodyLength = 4;

  if (type === 'LShaped') {
    bodyLength = 3;
  }

  while (trials < 20) {
    const body = buildBody(initCell, bodyLength, grid);

    if (type === 'LShaped') {
      const lastCell = body.coords[body.coords.length - 1];
      const tail = buildTail(lastCell, body.direction, grid);
      if (body.coords.length && tail.coords.length) {
        shipCoords.push(...body.coords, ...tail.coords);
        occupiedCoords.push(
          ...body.occupiedCoords,
          ...tail.occupiedCoords,
        );
        break;
      }
    } else if (body.coords.length) {
      shipCoords.push(...body.coords);
      occupiedCoords.push(...body.occupiedCoords);
      break;
    }

    trials += 1;
    // Change initial cell
    initCell = getInit(grid);
  }

  // Coords means coordinates, but it's too looooong
  return {
    shipCoords,
    occupiedCoords,
  };
}
