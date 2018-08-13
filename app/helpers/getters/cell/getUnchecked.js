/**
 * Returns coordinates of a random unchecked cell.
 * @param {Array} grid - Grid with cell coordinates.
 * @returns {number[]} - Coordinates of a random unchecked
 * cell.
 */
export default function getUnchecked(grid) {
  const coords = [];
  let y = null;
  let x = null;
  let trials = 0;

  while (trials < grid.length * 20) {
    // Clear array if it's not empty
    if (coords.length) coords.splice(0, coords.length);

    // Randomly choose the coordinates
    for (let i = 0; i < 2; i += 1) {
      coords.push(Math.floor(Math.random() * grid.length));
    }

    // For utility
    [y, x] = [coords[0], coords[1]];

    // If unchecked cell is found return its' coordinates.
    if (!grid[y][x].checked) {
      return coords;
    }

    // Limit the number of attempts to find a valid cell
    trials += 1;
  }

  // Clean up the array of the non-valid data.
  coords.splice(0, coords.length);

  // Return an empty array, because the unchecked cell
  // wasn't found.
  return coords;
}
