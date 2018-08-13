import validateCells from 'helpers/validators/validateCells';

/**
 * Get the initial cell coordinates for building a ship.
 * @param {Array} grid - Grid with cell coordinates.
 * @returns {number[]} - Initial cell coordinates.
 */
export default function getInit(grid) {
  const coords = [];
  let y = null;
  let x = null;
  let coordsAreCorrect = false;
  let trials = 0;

  while (!coordsAreCorrect) {
    // Clear array if it's not empty
    if (coords.length) coords.splice(0, coords.length);

    // Randomly choose the coordinates
    for (let i = 0; i < 2; i += 1) {
      coords.push(Math.floor(Math.random() * grid.length));
    }

    // For utility
    [y, x] = [coords[0], coords[1]];

    // Check the nearest cells for ships
    coordsAreCorrect = !!validateCells(y, x, grid).length;

    // Limit the number of attempts to find a valid cell
    trials += 1;
    if (trials > grid.length * 2) break;
  }

  // Clean up the array if coordinates are incorrect
  if (!coordsAreCorrect) coords.splice(0, coords.length);

  // Returns the [y, x] coordinates of the cell
  // if valid cell is found. Otherwise returns [];
  return coords;
}
