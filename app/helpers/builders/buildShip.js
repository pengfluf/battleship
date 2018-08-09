import calcInitCell from 'helpers/calcs/calcInitCell';
import calcShiftedInit from 'helpers/calcs/calcShiftedInit';

import checkNearCells from 'helpers/checkers/checkNearCells';

import constructPart from 'helpers/builders/constructPart';
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
  const directions = ['up', 'right', 'down', 'left'];
  let direction = '';
  let dirIndex = null;
  let directionIsCorrect = false;
  const shipCoords = [];
  const occupiedCoords = [];
  let trials = 0;

  const initCell = calcInitCell(layout);
  const [y, x] = [initCell[0], initCell[1]];

  if (type === 'dotShaped') {
    shipCoords.push(initCell);
    occupiedCoords.push(checkNearCells(y, x, layout));
    return {
      shipCoords,
      occupiedCoords,
    };
  }

  // TODO: If bodyLength % 3 === 0, then it has
  // a tail, so we have to check its nearest cells
  // in the end
  let bodyLength = 4;

  if (type === 'LShaped') {
    bodyLength = 3;
  }

  while (!directionIsCorrect) {
    dirIndex = Math.floor(Math.random() * directions.length);
    direction = directions[dirIndex];

    // TODO: Create separate function for the validation. DRY

    // Calculate the initial shifted cell for further checking
    const shiftedInit = calcShiftedInit(y, x, direction, 'ship');

    // Utility
    const [shiftedY, shiftedX] = [shiftedInit[0], shiftedInit[1]];

    // Getting coords of cells occupied by the ship
    occupiedCoords.push(...checkNearCells(shiftedY, shiftedX, layout));

    // If we didn't get occupied coords at all, it means that
    // the direction is wrong, so we don't actually need it.
    // directionIsCorrect variable is needed for better readability.
    directionIsCorrect = !!occupiedCoords.length;

    // If we are still in a loop, that means the direction is wrong.
    directions.splice(dirIndex, 1);

    trials += 1;
    if (trials > layout.length) break;
  }

  if (directionIsCorrect) {
    shipCoords.push(...constructPart(y, x, direction, bodyLength));
  }

  if (type === 'LShaped') {
    const lastCell = shipCoords[shipCoords.length - 1];
    const tail = buildTail(lastCell, direction, layout);

    if (tail.tailCoords.length) {
      shipCoords.push(...tail.tailCoords);
      occupiedCoords.push(...tail.occupiedCoords);
    } else {
      shipCoords.splice(0, shipCoords.length);
      occupiedCoords.splice(0, occupiedCoords.length);
    }
  }

  return {
    shipCoords,
    occupiedCoords,
  };
}
