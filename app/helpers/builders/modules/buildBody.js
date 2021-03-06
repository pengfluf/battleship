import getValidationInit from 'helpers/getters/cell/getValidationInit';

import validateCells from 'helpers/validators/validateCells';

import construct from './construct';

/**
 * @typedef {Object} ShipBody
 * @property {string} direction - Ship building direction
 * @property {Array} coords - Ship coordinates
 * @property {Array} occupiedCoords - Coordinates occupied by
 * the ship
 */

/**
 * Builds the body of the ship. If there's no tail, then
 * in fact we build the ship entirely.
 * @param {number[]} initCell - Initial cell
 * @param {number} bodyLength - Body length
 * @param {Array} grid - Grid with cell coordinates.
 * @returns {ShipBody} - Info about ship body.
 */
export default function buildBody(initCell, bodyLength, grid) {
  const coords = [];
  const occupiedCoords = [];

  const directions = ['up', 'right', 'down', 'left'];
  let direction = '';
  let directionIndex = null;
  // directionIsCorrect variable is needed for better readability.
  let directionIsCorrect = false;

  let trials = 0;

  const [y, x] = [initCell[0], initCell[1]];

  while (!directionIsCorrect) {
    directionIndex = Math.floor(Math.random() * directions.length);
    direction = directions[directionIndex];

    // TODO: Create separate function for the validation. DRY

    // Calculate the initial shifted cell for further validation
    const validationInit = getValidationInit(y, x, direction, 'ship');

    // Utility
    const [validationY, validationX] = [
      validationInit[0],
      validationInit[1],
    ];

    // Getting coords of cells occupied by the ship
    occupiedCoords.push(
      ...validateCells(validationY, validationX, grid),
    );

    // If we didn't get occupied coords at all, it means that
    // the direction is wrong, so we don't actually need it.
    directionIsCorrect = !!occupiedCoords.length;

    // If we are still in a loop, that means the direction is wrong.
    directions.splice(directionIndex, 1);

    trials += 1;
    if (trials > grid.length * 2) break;
  }

  if (directionIsCorrect) {
    coords.push(...construct(y, x, direction, bodyLength));
  }

  // Coords means coordinates, but it's too looooong
  return {
    direction,
    coords,
    occupiedCoords,
  };
}
