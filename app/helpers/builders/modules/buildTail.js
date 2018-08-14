import getValidationInit from 'helpers/getters/cell/getValidationInit';
import getTailDirection from 'helpers/getters/getTailDirection';

import validateTail from 'helpers/validators/validateTail';

import construct from './construct';

/**
 * Builds ship's tail and return it's coordinates, including the
 * occupied / surrounding ones.
 * @param {number[]} lastCell - The last cell of the building ship.
 * @param {string} bodyDirection - Ship's body building direction
 * (e.g. from initial cell to the top. This direction).
 * @param {Array} grid - Grid with cell coordinates.
 * @returns {{coords: Array, occupiedCoords: Array}} - All the coordinates
 * occupied by the tail.
 */
export default function buildTail(lastCell, bodyDirection, grid) {
  let tailDirIsCorrect = false;
  const coords = [];
  const occupiedCoords = [];

  const tailDirection = getTailDirection(bodyDirection);

  // Utility
  const [y, x] = [lastCell[0], lastCell[1]];

  while (!tailDirIsCorrect) {
    // TODO: Create separate function for the validation. DRY

    // Calculate the initial shifted cell for further validation
    const validationInit = getValidationInit(
      y,
      x,
      tailDirection,
      'tail',
    );

    // Utility
    const [validationY, validationX] = [
      validationInit[0],
      validationInit[1],
    ];

    if (
      validationY >= 0 &&
      validationX >= 0 &&
      validationY <= grid.length - 1 &&
      validationX <= grid.length - 1
    ) {
      // Getting coords of cells occupied by the ship
      occupiedCoords.push(
        ...validateTail(
          validationY,
          validationX,
          tailDirection,
          grid,
        ),
      );
    }

    // If we didn't get occupied coords at all, it means that
    // the direction is wrong, so we don't actually need it.
    // tailDirIsCorrect variable is needed for better readability.
    tailDirIsCorrect = !!occupiedCoords.length;

    if (!tailDirIsCorrect) break;
  }

  if (tailDirIsCorrect) {
    coords.push(...construct(y, x, tailDirection, 1));
  }

  // Coords means coordinates, but it's too looooong
  return {
    coords,
    occupiedCoords,
  };
}
