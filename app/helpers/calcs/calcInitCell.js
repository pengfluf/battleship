import checkNearCells from 'helpers/checkers/checkNearCells';

/**
 * Calculates the initial cell coordinates for building a ship.
 * @param {Array} layout - Layout with cell coordinates.
 * @returns {number[]} - Initial cell coordinates.
 */
export default function calcInitCell(layout) {
  const coords = [];
  let x = null;
  let y = null;
  let coordsAreCorrect = false;
  let trials = 0;

  while (!coordsAreCorrect) {
    // Clear array if it's not empty
    if (coords.length) coords.splice(0, coords.length);

    // Randomly choose the coordinates
    for (let i = 0; i < 2; i += 1) {
      coords.push(Math.floor(Math.random() * layout.length));
    }

    // For utility
    [y, x] = [coords[0], coords[1]];

    // Check the nearest cells for ships
    coordsAreCorrect = !!checkNearCells(y, x, layout).length;

    // Limit the number of attempts to find a valid cell
    trials += 1;
    if (trials > layout.length * 2) break;
  }

  // Clean up the array if coordinates are incorrect
  if (!coordsAreCorrect) coords.splice(0, coords.length);

  // Returns the [y, x] coordinates of the cell
  // if valid cell is found. Otherwise returns [];
  return coords;
}
