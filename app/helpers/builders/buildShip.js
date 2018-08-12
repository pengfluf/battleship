import calcInitCell from 'helpers/calcs/calcInitCell';

import checkNearCells from 'helpers/checkers/checkNearCells';

import buildBody from 'helpers/builders/buildBody';
import buildTail from 'helpers/builders/buildTail';

/**
 * Builds ship and returns its' coordinates, including the
 * occupied / surrounding ones.
 * @param {Array} layout - Layout with cell coordinates.
 * @param {string} type - Ship type. Can be 'LShaped', 'dotShaped'.
 * If not specified, will be just regular vertical / horizontal.
 * @returns {{shipCoords: Array, occupiedCoords: Array}} - All the coordinates
 * occupied by the ship.
 */
export default function buildShip(layout, type) {
  const shipCoords = [];
  const occupiedCoords = [];
  let trials = 0;

  let initCell = calcInitCell(layout);
  if (!initCell.length) return { shipCoords, occupiedCoords };

  const [y, x] = [initCell[0], initCell[1]];

  if (type === 'dotShaped') {
    shipCoords.push(initCell);
    occupiedCoords.push(checkNearCells(y, x, layout));
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
    const body = buildBody(initCell, bodyLength, layout);

    if (type === 'LShaped') {
      const lastCell = body.coords[body.coords.length - 1];
      const tail = buildTail(lastCell, body.direction, layout);
      if (body.coords.length && tail.coords.length) {
        shipCoords.push(...body.coords, ...tail.coords);
        occupiedCoords.push(...body.occupiedCoords, ...tail.occupiedCoords);
        break;
      }
    } else if (body.coords.length) {
      shipCoords.push(...body.coords);
      occupiedCoords.push(...body.occupiedCoords);
      break;
    }

    trials += 1;
    // Change initial cell
    initCell = calcInitCell(layout);
  }

  return {
    shipCoords,
    occupiedCoords,
  };
}
