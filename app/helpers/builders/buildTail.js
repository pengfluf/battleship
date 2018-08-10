import calcShiftedInit from 'helpers/calcs/calcShiftedInit';
import calcTailDirection from 'helpers/calcs/calcTailDirection';

import checkNearToTail from 'helpers/checkers/checkNearToTail';

import constructPart from 'helpers/builders/constructPart';

/**
 * Builds ships' tail and return its' coordinates, including the
 * occupied / surrounding ones.
 * @param {number[]} lastCell - The last cell of the building ship.
 * @param {string} direction - Ships' building direction (e.g. from initial
 * cell to the top. This direction).
 * @param {Array} layout - Layout with cell coordinates.
 * @returns {{tailCoords: Array, occupiedCoords: Array}} - All the coordinates
 * occupied by the tail.
 */
export default function buildTail(lastCell, direction, layout) {
  let tailDirection = null;
  let tailDirIsCorrect = false;
  const tailCoords = [];
  const occupiedCoords = [];

  // Utility
  const [y, x] = [lastCell[0], lastCell[1]];

  while (!tailDirIsCorrect) {
    tailDirection = calcTailDirection(direction);

    // TODO: Create separate function for the validation. DRY

    // Calculate the initial shifted cell for further checking
    const shiftedInit = calcShiftedInit(y, x, tailDirection, 'tail');

    // Utility
    const [shiftedY, shiftedX] = [shiftedInit[0], shiftedInit[1]];

    if (
      shiftedY >= 0 &&
      shiftedX >= 0 &&
      shiftedY <= layout.length - 1 &&
      shiftedX <= layout.length - 1
    ) {
      // Getting coords of cells occupied by the ship
      occupiedCoords.push(
        ...checkNearToTail(shiftedY, shiftedX, tailDirection, layout),
      );
    }

    // If we didn't get occupied coords at all, it means that
    // the direction is wrong, so we don't actually need it.
    // tailDirIsCorrect variable is needed for better readability.
    tailDirIsCorrect = !!occupiedCoords.length;

    if (!tailDirIsCorrect) break;
  }

  if (tailDirIsCorrect) {
    tailCoords.push(...constructPart(y, x, tailDirection, 1));
  }

  return {
    tailCoords,
    occupiedCoords,
  };
}
